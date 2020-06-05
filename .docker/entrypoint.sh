#!/bin/bash

npm config set cache /workspace/backend/.npm-cache --global

cd /workspace/backend

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run typeorm migration:run
npm run start:dev
