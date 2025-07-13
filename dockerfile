FROM node

WORKDIR /job-portal-frontend/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD [ "npm" , "run" , "preview" , "--" , "--host" ]

