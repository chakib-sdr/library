import express from 'express';
import cors from 'cors';
import { route } from './routes.js';

const server = express();

server.use(cors()); 
server.use(express.json()); 

server.use("/", route); 

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
