const express = require('express');
const router = express.Router();

const Livro = require('../database/models/livro');
const Emprestimo = require('../database/models/emprestimo');
const Leitor = require('../database/models/leitor');    

router.get("/", async(req, res) => {
    const livros = await Livro.all();
    res.render("index", { livros });
});


router.get("/leitores", async(req, res) => {
    const leitores = await Leitor.all();
    res.render("leitores", { leitores });
});

router.get("/emprestimos", async(req, res) => {
  const emprestimos = await Emprestimo.all();
  const leitores = await Leitor.all();
  const livros = await Livro.all();

  res.render("emprestimos", { emprestimos, leitores, livros });
});


module.exports = router;