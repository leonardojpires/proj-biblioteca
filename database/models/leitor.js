const db = require('../db');

class Leitor {
  static async all() {
    const [rows] = await db.query('SELECT * FROM leitores');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM leitores WHERE id = ?', [id]);
    return rows[0];
  }

  static async create({ nome, email }) {
    const [result] = await db.query(
      'INSERT INTO leitores (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return { id: result.insertId, nome, email };
  }

  static async update(id, { nome, email }) {
    await db.query(
      'UPDATE leitores SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM leitores WHERE id = ?', [id]);
  }
}

module.exports = Leitor;
