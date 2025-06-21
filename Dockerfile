{
    "name": "candidate-app-backend",
    "version": "1.0.0",
    "description": "Backend pentru aplicația de candidați politici",
    "main": "dist/index.js",
    "scripts": {
      "start": "node dist/index.js",
      "dev": "nodemon src/index.ts",
      "build": "tsc",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": ["candidates", "politics", "api"],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "@faker-js/faker": "^8.4.1",
      "socket.io": "^4.7.4",
      "typescript": "^5.3.3",
      "@types/express": "^4.17.21",
      "@types/cors": "^2.8.17",
      "@types/node": "^20.10.5"
    },
    "devDependencies": {
      "nodemon": "^3.0.2",
      "ts-node": "^10.9.2"
    }
  }