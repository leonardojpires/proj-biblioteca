const db = require("../db");

async function criarTabelaEmprestimos() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS emprestimos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        livro_id INT NOT NULL,
        leitor_id INT NOT NULL,
        data_emprestimo DATE NOT NULL,
        data_devolucao DATE,
        devolvido BOOLEAN DEFAULT FALSE,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_livro FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
        CONSTRAINT fk_leitor FOREIGN KEY (leitor_id) REFERENCES leitores(id) ON DELETE CASCADE
      );
    `;

    await db.query(sql);
    console.log("Tabela 'emprestitmos' criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    db.end();
  }
}

criarTabelaEmprestimos();
