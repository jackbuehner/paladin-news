<script lang="ts">
  import { browser } from '$app/env';
  import { beforeNavigate } from '$app/navigation';
  import {
    ArticleCaption,
    ArticleCategories,
    ArticleHeading,
    ArticleMeta,
    ArticlePhoto,
    ArticlePhotoCredit,
    ArticleSubtitle,
  } from '$lib/components/article/jackbuehner2020';
  import { hasProperty } from '$lib/utils';
  import { onMount } from 'svelte';

  let fields: Record<string, any> = {};

  // tell the parent component that we are ready for data
  if (browser) {
    parent.postMessage('connected', 'https://cristata.app/');
  }

  // send a copy of this page's content to the parent of the frame
  // whenever the fields variable changes
  $: {
    if (browser && fields) {
      const contentTag = document.querySelector('.content')?.outerHTML;
      const styleString = Array.from(document.styleSheets)
        .map((elem) =>
          Array.from(elem.cssRules)
            .map((rule) => rule.cssText)
            .join('\n')
        )
        .join('\n');
      parent.postMessage(JSON.stringify({ contentTag, styleString }), 'https://cristata.app/');
    }
  }

  // add a listener that recieves data
  onMount(() => {
    interface FieldsUpdate {
      type: 'field';
      fields: any;
    }

    function isFieldsUpdate(toCheck: any): toCheck is FieldsUpdate {
      return (
        toCheck &&
        typeof toCheck === 'object' &&
        !Array.isArray(toCheck) &&
        hasProperty(toCheck, 'type') &&
        toCheck.type === 'fields' &&
        hasProperty(toCheck, 'fields')
      );
    }

    function handleMessage(message: string | Record<string, any>) {
      message = message.replace('[iFrameSizer]message:', '');

      try {
        if (typeof message === 'string') {
          const parsed = JSON.parse(message);
          message = parsed;
        }
      } catch (error) {}

      console.log(message);

      if (isFieldsUpdate(message)) {
        fields = message.fields;
      }
    }

    const reportMessages = (e: MessageEvent) => {
      handleMessage(e.data);
    };
    window.addEventListener('message', reportMessages, false);
    return () => {
      window.removeEventListener('message', reportMessages);
    };
  });

  // add iframe resizer script
  onMount(() => {
    if (browser) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.contentWindow.min.js';
      document.body.appendChild(script);
    }
  });

  // prevent navigation so iframe does not excape to a different url
  beforeNavigate(({ cancel }) => {
    cancel();
  });

  let video_embed_path: string | null = null;
  if (fields && fields.video_path) {
    const videoParams = new URLSearchParams(fields.video_path.split('?')[1]);
    const videoType: 'youtube' | 'vimeo' | null = fields.video_path.indexOf('youtube.com')
      ? 'youtube'
      : fields.video_path.indexOf('vimeo.com')
      ? 'vimeo'
      : null;
    const videoId: string | null =
      videoType === 'youtube'
        ? videoParams.get('v')
        : videoType === 'vimeo'
        ? new URL('https://vimeo.com/309904631').pathname.replace('/', '')
        : null;
    video_embed_path =
      videoId === null
        ? null
        : videoType === 'youtube'
        ? `https://www.youtube.com/embed/${videoId}?color=white&rel=0`
        : videoType === 'vimeo'
        ? `https://player.vimeo.com/video/${videoId}?color=ffffff&byline=0&portrait=0`
        : null;
  }

  $: categories = fields.categories;
  $: heading = fields.name;
  $: slug = fields.slug;
  $: deck = fields.description;
  $: videoReplacesPhoto = fields.video_replaces_photo;
  $: photoPath = fields.photo_path;
  $: photoCaption = fields.photo_caption;
  $: photoCredit = fields.photo_credit;
  $: date =
    fields.timestamps?.published_at ||
    fields.timestamps?.target_publish_at ||
    fields.timestamps?.modified_at;
  $: authors =
    fields.people?.authors?.map((author: { _id: string; name?: string; label?: string }) => ({
      _id: author._id,
      name: author.label || author.name || '',
    })) || [];
</script>

{#if browser}
  <style>
    html,
    body,
    #svelte {
      height: unset;
    }
  </style>
{/if}

<div class="content">
  <div class="tiptap-top-article-jackbuehner2020" id={'preview'}>
    {#if fields}
      <!-- categories -->
      {#if categories}
        <ArticleCategories {categories} />
      {/if}

      <!-- heading -->
      {#if heading}
        <ArticleHeading>{heading}</ArticleHeading>
      {/if}

      <!-- subtitle -->
      {#if deck}
        <ArticleSubtitle>{deck}</ArticleSubtitle>
      {/if}

      <!-- video/photo -->
      {#if video_embed_path && videoReplacesPhoto}
        <div style={'padding: 56.25% 0 0 0; position: relative;'}>
          <iframe
            title={'related video'}
            src={video_embed_path}
            style={'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'}
            frameborder={'0'}
          />
        </div>
      {:else if photoPath}
        <ArticlePhoto src={photoPath} />
        {#if photoCaption}
          <ArticleCaption>{photoCaption}</ArticleCaption>
        {/if}
        {#if photoCredit}
          <ArticlePhotoCredit>{photoCredit}</ArticlePhotoCredit>
        {/if}
      {/if}

      <!-- meta info -->
      {#if date && authors}
        <ArticleMeta {date} {authors} />
      {/if}
    {/if}
  </div>
  <div class="tiptap-top-article-jackbuehner2020" id={'emailPreview'}>
    {#if fields}
      <!-- categories -->
      {#if categories}
        <ArticleCategories {categories} />
      {/if}

      <!-- heading -->
      {#if heading}
        <ArticleHeading>{heading}</ArticleHeading>
      {/if}

      <!-- subtitle -->
      {#if deck}
        <ArticleSubtitle>{deck}</ArticleSubtitle>
      {/if}

      <!-- video/photo -->
      {#if photoPath}
        <ArticlePhoto src={photoPath} />
        {#if photoCaption}
          <ArticleCaption>{photoCaption}</ArticleCaption>
        {/if}
        {#if photoCredit}
          <ArticlePhotoCredit>{photoCredit}</ArticlePhotoCredit>
        {/if}
      {/if}

      <!-- meta info -->
      {#if date && authors}
        <ArticleMeta {date} {authors} />
      {/if}
    {/if}
  </div>
</div>

<style>
  #preview {
    max-width: 768px;
    width: calc(100% - 40px);
    margin: 20px auto 0 auto;
    background: white;
    padding: 68px 88px 0;
    border: 1px solid rgb(171, 171, 171);
    border-bottom: none;
  }

  @media (max-width: 650px) {
    #preview {
      max-width: unset;
      width: 100%;
      margin: 0 auto;
      padding: 24px 20px 0 20px;
    }
  }

  #emailPreview {
    display: none;
  }

  :global(div.tiptap-top-article-jackbuehner2020 > div:first-of-type) {
    margin-top: 0;
  }
</style>
