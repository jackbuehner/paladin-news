const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: String!, $date: Date) {
    articleBySlugPublic(slug: $slug, date: $date) {
      _id
      name
      slug
      timestamps {
        published_at
      },
      people {
        authors {
          github_id
          name
          slug
          photo
        }
        editors {
          primary {
            name
            slug
          }
          copy {
            name
            slug
          }
        }
      }
      categories
      tags
      description
      photo_path
      photo_caption
      photo_credit
      body
      legacy_html
      video_path
      video_replaces_photo
      show_comments
      template
      layout
    }
  }
`;

export { GET_ARTICLE_BY_SLUG };
