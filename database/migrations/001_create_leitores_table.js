const db = require('../db');

async function criarTabelaLeitores() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS leitores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.query(sql);
    console.log("Tabela 'leitores' criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    db.end();
  }
}

criarTabelaLeitores();