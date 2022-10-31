console.log('[server.js] Iniciando a configuração do servidor');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT || 3000;
require('../startup/prod')(app);

app.listen(port, () => {
    console.log('Servidor rodando na porta: ', port);
})

module.exports = app;
