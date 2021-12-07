const GET_ARTICLES = `
  query GetArticles(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
  ) {
    articlesPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        name,
        slug,
        timestamps {
          published_at,
        },
        people {
          authors {
            github_id
            name
            slug
          }
        }
        categories,
        tags,
        description,
        photo_path,
        photo_caption,
        photo_credit,
        body,
        legacy_html,
        video_path,
        video_replaces_photo,
        show_comments,
        template,
        layout,
      }
      totalDocs,
      limit,
      page,
      totalPages,
      nextPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
    }
  }
`;

export { GET_ARTICLES };
