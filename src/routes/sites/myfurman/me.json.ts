import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput> {
  // create the headers
  var headers = new Headers();
  headers.append('Authorization', `Bearer ${request.headers.token}`);

  // get the details of the current account
  const res = await fetch('https://graph.microsoft.com/v1.0/me', { headers });

  if (res.ok) {
    // return some details
    const { displayName, mail, userPrincipalName } = await res.json();
    return {
      status: 200,
      body: { displayName, mail, username: userPrincipalName },
    };
  }

  // return authentication error if there was a failure (me is always available if authenticated)
  return {
    status: 401,
  };
}

export { get };
