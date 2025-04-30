
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 5000
const app = express();

// Diretório atual do módulo (usado com ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilita CORS para o frontend
app.use(cors());

// Rota que serve o JSON
app.get('/api/courses', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'frontend_data_gps.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler o arquivo' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});