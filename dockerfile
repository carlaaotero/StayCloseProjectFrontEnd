# Usa una imagen base de Node.js
FROM node:18 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación Angular para producción
RUN npm run build:ssr


# Usa una imagen base de Nginx para servir la aplicación
FROM node:18

WORKDIR /app

# Copia los archivos compilados desde la etapa de build
COPY --from=build /app/dist/stay-close-front-end /app/dist
COPY package*.json ./

RUN npm install 

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["node", "/app/dist/stay-close-front-end/server/server.mjs"]
#CMD ["ls", "-la /dist/server"]
