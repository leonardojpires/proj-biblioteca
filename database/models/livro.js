const db = require('../db');

class Livro {
  static async all() {
    const [rows] = await db.query('SELECT * FROM livros');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM livros WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ titulo, autor, ano, genero }) {
    const [result] = await db.query(
      'INSERT INTO livros (titulo, autor, ano, genero) VALUES (?, ?, ?, ?)',
      [titulo, autor, ano, genero]
    );
    return { id: result.insertId, titulo, autor, ano, genero };
  }

  static async update(id, { titulo, autor, ano, genero }) {
    await db.query(
      'UPDATE livros SET titulo = ?, autor = ?, ano = ?, genero = ? WHERE id = ?',
      [titulo, autor, ano, genero, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM livros WHERE id = ?', [id]);
  }
}

module.exports = Livro;
