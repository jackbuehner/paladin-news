<script lang="ts">
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { notEmpty } from '$lib/utils';
  import { copy } from 'copy-anything';
  import Comments from './Comments.svelte';

  export let comments: GET_ARTICLE_BY_SLUG__DOC_TYPE['legacy_comments'];
  export let name: GET_ARTICLE_BY_SLUG__DOC_TYPE['name'];

  const filteredComments = (comments || [])
    .filter(notEmpty)
    .filter((comment) => comment?.comment_approved === '1');

  function getParentComment(comments: ParsedComment[], commentId: string) {
    let found: typeof comments[number] | undefined = undefined;

    comments.some((comment) => {
      if (comment.comment_id === commentId) {
        found = comment;
        return true;
      }
      if (Array.isArray(comment.children)) {
        const maybeFound = getParentComment(comment.children, commentId);
        if (maybeFound) {
          found = maybeFound;
          return true;
        }
      }
      return false;
    });

    return found as typeof comments[number] | undefined;
  }

  type ParsedComment = NonNullable<
    NonNullable<GET_ARTICLE_BY_SLUG__DOC_TYPE['legacy_comments']>[number]
  > & { children?: ParsedComment[] };

  const parsedComments = filteredComments.reduce<ParsedComment[]>((_comments, comment) => {
    const comments = copy(_comments);

    if (comment.comment_parent !== '0' && comment.comment_parent) {
      const parentComment = getParentComment(comments, comment.comment_parent);
      if (Array.isArray(parentComment?.children)) {
        parentComment.children.push(comment);
      } else if (parentComment) {
        parentComment.children = [comment];
      }
      return comments;
    }

    comments.push(comment);
    return comments;
  }, []);
</script>

{#if filteredComments.length > 0}
  <div class="comments-title-container clear-fix" id="comments">
    <h3 class="comments-title">
      {#if filteredComments.length === 1}
        One thought
      {:else}
        {filteredComments.length} thoughts
      {/if}
      on “<span>{name}</span>”
    </h3>
  </div>

  <div class="comments">
    <ol class="comments-list">
      <Comments {parsedComments} />
    </ol>
  </div>
{/if}

<style>
  .comments-title-container {
    border-top: 4px solid #ddd;
    border-bottom: 2px dotted #ddd;
    margin-bottom: 40px;
    padding: 22px 10px;
    font-family: var(--legacy-font-body);
    color: var(--color-neutral-dark);
  }
  @media (max-width: 500px) {
    .comments-title-container {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .clear-fix:before,
  .clear-fix:after {
    content: ' ';
    display: table;
  }

  .comments-title {
    font-size: 1.4em;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 0;
    font-family: inherit;
    font-style: normal;
    line-height: 1;
    margin: 0;
    padding: 0;
    text-align: left;
  }
  @media (max-width: 500px) {
    .comments-title {
      font-size: 17px;
    }
  }

  .comments {
    margin-left: 95px;
    font-family: var(--legacy-font-body);
    font-size: 17px;
    color: var(--color-neutral-dark);
  }
  @media (max-width: 950px) {
    .comments {
      margin-left: 0;
    }
  }

  .comments-list {
    list-style: none;
    padding: 0;
  }
</style>
