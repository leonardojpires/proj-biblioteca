const Livro = require('../database/models/livro');

module.exports = {
  async getAll(req, res) {
    try {
      const livros = await Livro.all();
      res.json(livros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const livro = await Livro.findById(req.params.id);
      if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
      res.json(livro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { titulo, autor, genero } = req.body;
      const novoLivro = await Livro.create({ titulo, autor, genero });
      res.status(201).json(novoLivro);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { titulo, autor, genero } = req.body;
      await Livro.update(req.params.id, { titulo, autor, genero });
      res.json({ message: 'Livro atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Livro.delete(req.params.id);
      res.json({ message: 'Livro apagado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
