const Leitor = require('../database/models/leitor');

module.exports = {
  async getAll(req, res) {
    try {
      const leitores = await Leitor.all();
      res.json(leitores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const leitor = await Leitor.findById(req.params.id);
      if (!leitor) return res.status(404).json({ error: 'Leitor não encontrado' });
      res.json(leitor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { nome, email } = req.body;
      const novoLeitor = await Leitor.create({ nome, email });
      res.status(201).json(novoLeitor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { nome, email } = req.body;
      await Leitor.update(req.params.id, { nome, email });
      res.json({ message: 'Leitor atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Leitor.delete(req.params.id);
      res.json({ message: 'Leitor apagado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
