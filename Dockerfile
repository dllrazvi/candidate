# 1. Imagine de bază cu Node
FROM node:20

# 2. Setează directorul de lucru
WORKDIR /app

# 3. Copiază package.json și package-lock.json mai întâi (bun pentru cache)
COPY package*.json ./

# 4. Instalează toate dependențele, inclusiv typescript
RUN npm install

# 5. Apoi copiază tot proiectul
COPY . .

# 6. Compilează proiectul
RUN npx tsc

# 7. Expune portul
EXPOSE 3000

# 8. Rulează aplicația
CMD ["node", "dist/index.js"]
