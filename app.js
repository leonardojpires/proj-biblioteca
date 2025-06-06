const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'Projeto_Final/views'));

const pagesRoutes = require('./routes/pagesRoutes')
app.use('/', pagesRoutes);


app.use('/api/leitores', require('./routes/leitoresRoutes'));
app.use('/api/livros', require('./routes/livrosRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});