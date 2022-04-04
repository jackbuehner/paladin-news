/**
 * Constructs the path of the article relative to the site root.
 *
 * @param slug the slug for the article
 * @param date the date object for article, containing a year, month, and day
 * @returns a path relative to the site root
 */
function constructArticlePath(
  slug: string,
  date?: { year: string; month: string; day: string }
): string {
  if (date) {
    return `/articles/${date.year}/${date.month}/${date.day}/${slug}`;
  }
  return `/articles/${slug}`;
}

export { constructArticlePath };
