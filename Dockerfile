# docker run \
#   -p 3000:3000 \
#   -it --rm \
#   --name wombat \
#   -v "$(pwd)"/example:/usr/src/site \
#   wombat

FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
# RUN ln -s /usr/src/site/content /usr/src/app/src/pages/content
RUN ln -s /usr/src/app/example/content /usr/src/app/src/pages/content
RUN ln -s /usr/src/app/example/index.js /usr/src/app/src/pages/index.js
RUN ln -s /usr/src/app/example/site.js /usr/src/app/site.js
# RUN ln -s /usr/src/site/site.js /usr/src/app/site.js
# RUN ln -s /usr/src/site/index.js /usr/src/app/src/pages/index.js
CMD "npm" "run" "dev"