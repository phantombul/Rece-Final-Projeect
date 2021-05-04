import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import express from "express";

import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';


const DB_CONNECTION_URL = 'mongodb+srv://raf2:FinalProject2021@cluster0.wxa8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();
const PORT = 6000;

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/update', dataRoutes);

mongoose.connect(
    DB_CONNECTION_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
).then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));


