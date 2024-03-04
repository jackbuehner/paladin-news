<script lang="ts">
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { formatISODate } from '$lib/utils';
  import * as cryptoRaw from 'crypto-js';

  // @ts-expect-error we have to do weird stuff since it is only a commonjs module
  const crypto = cryptoRaw.default ?? cryptoRaw;
  const SHA256 = crypto.SHA256;

  type Comment = NonNullable<
    NonNullable<GET_ARTICLE_BY_SLUG__DOC_TYPE['legacy_comments']>[number]
  > & { children?: Comment[] };

  export let parsedComments: Comment[];
</script>

{#each parsedComments as comment}
  {@const [name = '', email = ''] = (comment.author_name || '').replace('>', '').split('<')}
  <li class="comment">
    <article class="comment-body">
      <footer class="comment-meta">
        <div class="comment-author vcard">
          <img
            alt=""
            src="https://1.gravatar.com/avatar/{SHA256(email)}?s=32&amp;d=identicon&amp;r=G"
            srcset="https://1.gravatar.com/avatar/{SHA256(
              email
            )}?s=32&amp;d=identicon&amp;r=G 1x, https://1.gravatar.com/avatar/{SHA256(
              email
            )}?s=48&amp;d=identicon&amp;r=G 1.5x, https://1.gravatar.com/avatar/{SHA256(
              email
            )}?s=64&amp;d=identicon&amp;r=G 2x, https://1.gravatar.com/avatar/{SHA256(
              email
            )}?s=96&amp;d=identicon&amp;r=G 3x, https://1.gravatar.com/avatar/{SHA256(
              email
            )}?s=128&amp;d=identicon&amp;r=G 4x"
            class="avatar avatar-32 wp-hovercard-attachment grav-hashed grav-hijack"
            height="32"
            width="32"
            loading="lazy"
            decoding="async"
          />
          <b>
            <a href="mailto:{email}">{name}</a>
          </b>
        </div>
        {#if comment.commented_at}
          <div class="comment-metadata">
            <time datetime={comment.commented_at}>
              {formatISODate(comment.commented_at, false, false, true, true)}
            </time>
          </div>
        {/if}
      </footer>
      <div class="comment-content">
        <p>{comment.content}</p>
      </div>
    </article>
    {#if comment.children && comment.children.length > 0}
      <ol class="children">
        <svelte:self parsedComments={comment.children} />
      </ol>
    {/if}
  </li>
{/each}

<style>
  .children {
    margin-left: 25px;
    padding: 0;
    list-style: none;
  }

  .comment-body {
    background: #f1f1f1;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    margin-left: 80px;
    margin-bottom: 23px;
    padding: 25px;
    position: relative;
  }

  .comment .comment-body::before,
  .comment .comment-body::after {
    border: 10px solid transparent;
    border-right-color: #f1f1f1;
    content: '';
    display: block;
    left: -20px;
    position: absolute;
    top: 23px;
  }

  .comment .comment-body:before {
    border-right-color: #d7d7d7;
    border-width: 11px;
    left: -22px;
    top: 22px;
  }

  .comment-meta {
    color: #777;
    font-size: 0.7em;
    font-weight: 900;
    margin-bottom: 15px;
  }

  .comment-meta .vcard {
    font-size: 1.15rem;
    font-weight: 700;
  }

  .comment .comment-body .avatar {
    height: auto;
    width: 60px;
    border-radius: 99px;
    display: block;
    left: -84px;
    position: absolute;
    text-align: center;
    top: -4px;
    z-index: 5;
    background: rgb(var(--legacy-primary));
    color: #fff;
  }

  .comment-content p {
    border: 0;
    font-family: inherit;
    font-size: 100%;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    margin: 0;
    padding: 0;
    text-align: left;
    line-height: 160%;
    margin-bottom: 0;
    white-space: pre-wrap;
  }

  a {
    color: rgb(var(--legacy-primary));
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    background-color: rgba(var(--legacy-primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--legacy-primary));
  }
  a:active {
    background-color: rgba(var(--legacy-primary), 0.16);
  }
</style>
