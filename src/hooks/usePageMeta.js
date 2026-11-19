import { useEffect } from 'react';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageMeta({ title, description, url, ogTitle, ogDescription, ogImage }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    if (url) setMetaTag('property', 'og:url', url);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('property', 'twitter:image', ogImage);
    }
    setMetaTag('property', 'twitter:title', ogTitle || title);
    setMetaTag('property', 'twitter:description', ogDescription || description);
    if (url) setMetaTag('property', 'twitter:url', url);
  }, [title, description, url, ogTitle, ogDescription, ogImage]);
}
