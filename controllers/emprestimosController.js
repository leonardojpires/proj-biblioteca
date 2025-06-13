const Emprestimo = require('../database/models/emprestimo');

module.exports = {
  async getAll(req, res) {
    try {
      const emprestimos = await Emprestimo.all();
      res.json(emprestimos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const emprestimo = await Emprestimo.findById(req.params.id);
      if (!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });
      res.json(emprestimo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

    async create(req, res) {
    try {
      const { leitor_id, livro_id, data_emprestimo, data_devolucao } = req.body;

      const novo = await Emprestimo.create({
        leitor_id,
        livro_id,
        data_emprestimo,
        data_devolucao
      });

      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
  try {
    const { livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido } = req.body;
    const id = req.params.id;
    await Emprestimo.update(id, { livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido });
    res.json({ message: 'Empréstimo atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  },

  async delete(req, res) {
  try {
    const success = await Emprestimo.delete(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    res.json({ message: 'Empréstimo apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


};
