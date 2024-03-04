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

{#if parsedComments.length > 0}
  <div class="comments">
    <h3 class="comments-title">
      {#if parsedComments.length === 1}
        One thought
      {:else}
        {parsedComments.length} thoughts
      {/if}
      on “<span>{name}</span>”
    </h3>
    <ol class="comments-list">
      <Comments {parsedComments} />
    </ol>
  </div>
{/if}

<style>
  .comments-title {
    font-family: var(--legacy2-font);
    color: var(--color-neutral-dark);
    border-top: 4px solid #1a1a1a;
    padding-top: 1.217391304em;
    margin-bottom: 1.217391304em;
    font-size: 16.1px;
    font-style: normal;
    font-weight: 700;
  }

  .comments {
    font-family: var(--legacy2-font);
    font-size: 17px;
    color: var(--color-neutral-dark);
  }

  .comments-list {
    list-style: none;
    padding: 0;
  }
</style>
