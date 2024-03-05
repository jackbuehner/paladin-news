function toIK(src: string, transform?: string, forceProxy = false) {
  let srcStr = `${src}`;

  const ik = 'https://ik.imagekit.io/paladin/';
  const ikp = 'https://ik.imagekit.io/paladin/proxy/';

  // this image was migrated incorrectly, so we fix it here
  if (srcStr === 'https://paladin-photo-library.s3.us-east-1.amazonaws.com/FU.jpeg.jpg') {
    srcStr =
      'https://assets-global.website-files.com/5f37fcdc1b6edd6760ad912f/6021cf72be5faeca77b316e5_FU.jpeg';
  }

  // imagekit does not work with this image
  if (srcStr.endsWith('/2016/10/davis1.jpg')) {
    return 'https://paladin-photo-library.s3.amazonaws.com/2016/10/davis1.jpg';
  }
  if (srcStr.endsWith('/2016/10/davis2.jpg')) {
    return 'https://paladin-photo-library.s3.amazonaws.com/2016/10/davis2.jpg';
  }

  if (srcStr.startsWith(ik)) return srcStr;

  if (
    (srcStr.indexOf('https://paladin-photo-library') === 0 ||
      srcStr.includes('/paladin-photo-library/')) &&
    !forceProxy
  ) {
    srcStr = srcStr
      .replace('https://paladin-photo-library.s3.amazonaws.com/', ik)
      .replace('https://paladin-photo-library.s3.us-east-1.amazonaws.com/', ik)
      .replace('https://s3.us-east-1.amazonaws.com/paladin-photo-library/', ik);
    if (transform) srcStr = srcStr.replace(ik, `${ik}${transform}/`);
  } else {
    srcStr = ikp + srcStr;
    if (transform) srcStr = srcStr.replace(ikp, `${ikp}${transform}/`);
  }

  return srcStr;
}

export { toIK };
