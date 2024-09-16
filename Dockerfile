FROM node:18

WORKDIR /usr/src/app

# Copia los archivos de tu aplicación
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Define el comando para ejecutar tu aplicación
CMD [ "npm", "start" ]