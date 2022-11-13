function share(
  to: 'facebook' | 'twitter' | 'email' | 'linkedin',
  docName: string,
  desc: string,
  loc: string
): void {
  const name = encodeURIComponent(docName);
  const description = encodeURIComponent(desc);
  if (to === 'facebook') {
    const location = encodeURIComponent(
      `${loc}?utm_source=facebook&utm_medium=social&utm_campaign=${name}`
    );
    window.open(`http://www.facebook.com/sharer/sharer.php?quote=${name}&u=${location}`, '_blank');
  }
  if (to === 'twitter') {
    const location = encodeURIComponent(
      `${loc}?utm_source=twitter&utm_medium=social&utm_campaign=${name}`
    );
    window.open(`http://twitter.com/intent/tweet?text=${name}&url=${location}`, '_blank');
  }
  if (to === 'email') {
    const location = encodeURIComponent(
      `${loc}?utm_source=email&utm_medium=email&utm_campaign=${name}`
    );
    window.open(
      `mailto:?subject=${name}&body=From%20The%20Echo%3A%0A%0A${name}%0A%0A${description}%0A%0A${location}%0A%0A`
    );
  }
  if (to === 'linkedin') {
    const location = encodeURIComponent(
      `${loc}?utm_source=linkedin&utm_medium=social&utm_campaign=${name}`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${location}`, '_blank');
  }
}

export { share };
