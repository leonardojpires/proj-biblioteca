const db = require('../db');

class Emprestimo {
  static async all() {
    const [rows] = await db.query(`
      SELECT e.*, l.titulo AS livro_titulo, le.nome AS leitor_nome
      FROM emprestimos e
      JOIN livros l ON e.livro_id = l.id
      JOIN leitores le ON e.leitor_id = le.id
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM emprestimos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido }) {
    const [result] = await db.query(
      `INSERT INTO emprestimos 
      (livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido)
      VALUES (?, ?, ?, ?, ?)`,
      [livro_id, leitor_id, data_emprestimo, data_devolucao || null, devolvido || false]
    );
    return { id: result.insertId, livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido };
  }

  static async update(id, { livro_id, leitor_id, data_emprestimo, data_devolucao, devolvido }) {
    await db.query(
      `UPDATE emprestimos SET livro_id = ?, leitor_id = ?, data_emprestimo = ?, data_devolucao = ?, devolvido = ?
       WHERE id = ?`,
      [livro_id, leitor_id, data_emprestimo, data_devolucao || null, devolvido || false, id]
    );
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM emprestimos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Emprestimo;
