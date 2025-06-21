# Imagine de bază
FROM node:20

# Setează directorul de lucru
WORKDIR /app

# Copiază fișierele
COPY . .

# Instalează dependențele
RUN npm install

# Compilează TypeScript
RUN npx tsc

# Expune portul
EXPOSE 3000

# Rulează aplicația
CMD ["node", "dist/index.js"]
