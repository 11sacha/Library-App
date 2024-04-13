import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';

const app = express();

//Middleware
app.use(express.json())
app.use(cors());

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



