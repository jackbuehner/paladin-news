type InputType<T = Record<string, unknown>> = T & {
  timestamps: {
    published_at: string; // ISO date
  };
};

type ReturnType<T = Record<string, unknown>> = T & {
  date: {
    day: string;
    month: string;
    year: string;
  };
};

/**
 * Inserts an object with the day, month, and week from `timestamps.published_at`.
 * Access it with `date`.
 * 
 * If `timestamps.published_at` is undefined, the date object will be:
 * ```
 * {
 *   day: `00`,
     month: `00`,
     year: `0000`,
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function insertDate<T>(docs: InputType<T>[]) {
  return docs.map((doc) => {
    // initialize a date object
    let date = {
      day: `00`,
      month: `00`,
      year: `0000`,
    };

    // get month, date, and year from document publish timestamp
    if (doc.timestamps && doc.timestamps.published_at) {
      const pubTimestamp = new Date(doc.timestamps.published_at);
      // update the date object
      date = {
        day: pubTimestamp.getUTCDate().toString().padStart(2, '0'),
        month: `${pubTimestamp.getUTCMonth() + 1}`.padStart(2, '0'), // +1 because January === 0
        year: pubTimestamp.getUTCFullYear().toString(),
      };
    }

    // return the document with the date object
    return { ...doc, date } as ReturnType<T>;
  });
}

export { insertDate };
export type { ReturnType as PublishedDocWithDate };
