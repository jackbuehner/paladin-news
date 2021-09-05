import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import type { Member } from 'src/utils/Memberstack';
import hmacsha256 from 'crypto-js/hmac-sha256.js';
import Hex from 'crypto-js/enc-hex.js';
import { variables } from '../../variables';

interface IOutput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IOutput>> {
  // get the required params from the url query
  const memberId = request.query.get('member'); // id of member
  const incomingToken = request.query.get('token');
  const incomingHmac = request.query.get('hmac');

  // if a require param is missing, return an error
  if (!memberId) return { status: 400, body: { reason: 'No member id was provided' } };
  if (!incomingToken) return { status: 400, body: { reason: 'No token was provided' } };
  if (!incomingHmac) return { status: 400, body: { reason: 'No hmac was provided' } };

  // decode commento secret and incoming token from 64-length hex to 32 decoded bytes
  const parsedSecret = Hex.parse(variables.COMMENTO_SECRET);
  const parsedToken = Hex.parse(incomingToken);

  // verify that the incoming hmac matches the hmac-sha256 of the token
  const expectedHmac = Hex.stringify(hmacsha256(parsedToken, parsedSecret));
  const hmacMatches = incomingHmac === expectedHmac;

  // if the hmac does not match, return an error
  if (!hmacMatches) return { status: 403, body: { reason: 'hmac error' } };

  // get the member by id
  const res = await fetch(`https://api.memberstack.com/v1/members/${memberId}`, {
    headers: {
      'X-API-KEY': 'bb6dc50ab996589cadac818a3ebde314',
    },
  });
  const { member }: { member: Member } = await res.json();

  // use first and last name, or fall back on email without domain
  const memberName =
    member.customFields['first-name'] && member.customFields['last-name']
      ? member.customFields['first-name'] + ' ' + member.customFields['last-name']
      : member.email.split('@')[0];

  // build the payload
  const payload = {
    token: incomingToken,
    email: member.email,
    name: memberName,
  };

  // create an hmac signiature for the payload
  const payloadHmac = Hex.stringify(hmacsha256(JSON.stringify(payload), parsedSecret));

  // convert the payload from JSON to HEX
  const payloadHex = Buffer.from(JSON.stringify(payload), 'utf8').toString('hex');

  return {
    status: 301,
    headers: {
      location:
        'https://commento.io/api/oauth/sso/callback?payload=' + payloadHex + '&hmac=' + payloadHmac,
    },
    body: {},
  };
}

export { get };
