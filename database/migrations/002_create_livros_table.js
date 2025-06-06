const db = require("../db");

async function criarTabelaLivros() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS livros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        ano INT CHECK (ano >= 0),
        genero VARCHAR(100),
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    await db.query(sql);
    console.log("Tabela 'livros' criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    db.end();
  }
}

criarTabelaLivros();
