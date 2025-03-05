# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la app escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]