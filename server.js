//const express = require('express');
import express from 'express';
const app = express();
import morgan from 'morgan';

const port = 3000;

app.use(morgan('tiny'))

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));