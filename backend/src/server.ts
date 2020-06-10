import express from 'express';

const app = express();

app.use('/', (req, res) => res.json({ message: 'Hello World' }));

app.listen(3333);
