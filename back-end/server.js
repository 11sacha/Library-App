import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//Middleware
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, '../front-end/dist')))

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my library')
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL).then(
    () => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    });

    app.get('*', (req, res) => {
        res.send(path.join(__dirname, '../front-end/dist/index.html'))
    })


