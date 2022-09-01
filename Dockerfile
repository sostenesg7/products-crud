ARG NODE_VERSION=14.17.6

#
# ---- Base Node ----
FROM node:$NODE_VERSION-alpine AS base
# set working directory
WORKDIR /home/app

# copy project file
COPY yarn.lock ./

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN yarn
RUN yarn global add ts-node-dev
RUN yarn global add ts-node
RUN yarn global add typescript

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
