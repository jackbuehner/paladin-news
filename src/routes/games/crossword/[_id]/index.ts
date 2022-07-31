import { createCrossword } from '$lib/components/crossword';
import {
  GET_CROSSWORD,
  type GET_CROSSWORD__TYPE,
  type MUTATE_CROSSWORD_LAYOUT__TYPE,
} from '$lib/queries';
import { MUTATE_CROSSWORD_LAYOUT } from '$lib/queries/MUTATE_CROSSWORD_LAYOUT';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import type { RequestHandler } from '@sveltejs/kit';
import { DateTime } from 'luxon';

export const GET: RequestHandler<{ _id: string }> = async (request) => {
  // query the crossword puzzle from the api
  const { data, error } = await api.query<GET_CROSSWORD__TYPE>(GET_CROSSWORD, {
    variables: { _id: request.params._id },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (!data?.crosswordPublic?.words) return { status: 400 };
  else if (
    // check that the layout is available
    data?.crosswordPublic?.layout
  ) {
    const answers = data.crosswordPublic.words.map((item) => item.word);
    const clues = data.crosswordPublic.words.map((item) => item.clue);

    // check that the layout is updated with the most recent words and clues
    if (
      data.crosswordPublic.layout.every(
        (val) => answers.includes(val.answer) && clues.includes(val.clue)
      ) &&
      data.crosswordPublic.layout.length === data.crosswordPublic.words.length
    ) {
      return { body: { data: JSON.stringify(data.crosswordPublic) } };
    }
  }

  // the exact crossword layout was not available or was out-of-date, so create a
  // new layout from the words and add it to the database
  const crosswordLayout = createCrossword({
    words: data.crosswordPublic.words,
    date: DateTime.fromISO(data.crosswordPublic.timestamps.published_at),
  });

  const { data: mData, error: mError } = await api.mutate<MUTATE_CROSSWORD_LAYOUT__TYPE>(
    MUTATE_CROSSWORD_LAYOUT,
    {
      variables: { _id: data.crosswordPublic._id, layout: crosswordLayout },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    }
  );

  if (mError.errors) return { status: 400, body: { errors: JSON.stringify(mError.errors) } };
  else if (mData?.crosswordModify?.layout)
    return {
      body: {
        data: JSON.stringify({
          ...data.crosswordPublic,
          layout: mData.crosswordModify.layout,
        }),
      },
    };
  return { status: mError.status };
};
