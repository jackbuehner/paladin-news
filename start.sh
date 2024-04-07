mkdir -p thepaladin.news

wget https://paladin-news.vercel.app \
  --directory-prefix=thepaladin.news \
  --recursive \
  --level=2000 \
  --page-requisites \
  --convert-links \
  --adjust-extension \
  -e robots=off \
  --restrict-file-names=windows \
  --span-hosts \
  --trust-server-names \
  --content-on-error \
  --content-disposition \
  --domains=paladin-news.vercel.app,ik.imagekit.io,uploads-ssl.webflow.com,server.cristata.app,s3.us-east-1.amazonaws.com,s3.amazonaws.com,googlevideo.com,furmanmediacom.files.wordpress.com,furmanpaladin.files.wordpress.com \
  2>&1 | tee -a thepaladin.news/wget_log.txt
