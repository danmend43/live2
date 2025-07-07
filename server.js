const express = require('express');
const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta atual
app.use(express.static(__dirname));

// Redireciona a página inicial para /live.html
app.get('/', (req, res) => {
  res.redirect('/live.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 