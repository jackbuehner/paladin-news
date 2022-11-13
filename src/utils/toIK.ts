function toIK(src: string, transform?: string) {
  let srcStr = `${src}`;

  const ik = 'https://ik.imagekit.io/paladin/';
  const ikp = 'https://ik.imagekit.io/paladin/proxy/';

  if (srcStr.indexOf('https://paladin-photo-library') === 0 && srcStr.indexOf('%') === -1) {
    srcStr = srcStr
      .replace('https://paladin-photo-library.s3.amazonaws.com/', ik)
      .replace('https://paladin-photo-library.s3.us-east-1.amazonaws.com/', ik);
    if (transform) srcStr = srcStr.replace(ik, `${ik}${transform}/`);
  } else {
    srcStr = ikp + srcStr;
    if (transform) srcStr = srcStr.replace(ikp, `${ikp}${transform}/`);
  }

  return srcStr;
}

export { toIK };
