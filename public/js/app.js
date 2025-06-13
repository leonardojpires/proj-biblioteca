document.addEventListener('DOMContentLoaded', () => {
  // --- FORMULÁRIO DE LIVROS ---
  const formLivro = document.getElementById('formNovoLivro');
  const modalLivro = document.getElementById('modalNovoLivro');

  if (modalLivro) {
    modalLivro.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const id = button.getAttribute('data-id');
      const titulo = button.getAttribute('data-titulo');
      const autor = button.getAttribute('data-autor');
      const genero = button.getAttribute('data-genero');

      if (formLivro) {
        formLivro.dataset.livroId = id || '';
        formLivro.titulo.value = titulo || '';
        formLivro.autor.value = autor || '';
        formLivro.genero.value = genero || '';
      }
    });
  }

  if (formLivro) {
    formLivro.addEventListener('submit', async (e) => {
      e.preventDefault();

      const livroId = formLivro.dataset.livroId;
      const titulo = formLivro.titulo.value.trim();
      const autor = formLivro.autor.value.trim();
      const genero = formLivro.genero.value.trim();

      if (!titulo || !autor || !genero) {
        alert("Preenche todos os campos.");
        return;
      }

      try {
        let response;
        if (livroId) {
          response = await fetch(`/api/livros/${livroId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, genero }),
          });
        } else {
          response = await fetch('/api/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, genero }),
          });
        }

        if (response.ok) {
          alert(livroId ? "Livro atualizado com sucesso." : "Livro adicionado com sucesso.");
          const modal = bootstrap.Modal.getInstance(modalLivro);
          modal.hide();
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao salvar livro: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    });
  }

  // --- FORMULÁRIO DE LEITORES ---
  const formLeitor = document.getElementById('formNovoLeitor');
  const modalLeitor = document.getElementById('modalNovoLeitor');

  if (modalLeitor) {
    modalLeitor.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const id = button.getAttribute('data-id');
      const nome = button.getAttribute('data-nome');
      const email = button.getAttribute('data-email');

      if (formLeitor) {
        formLeitor.dataset.leitorId = id || '';
        formLeitor.nome.value = nome || '';
        formLeitor.email.value = email || '';
      }
    });
  }

  if (formLeitor) {
    formLeitor.addEventListener('submit', async (e) => {
      e.preventDefault();

      const leitorId = formLeitor.dataset.leitorId;
      const nome = formLeitor.nome.value.trim();
      const email = formLeitor.email.value.trim();

      if (!nome || !email) {
        alert("Preenche todos os campos.");
        return;
      }

      try {
        let response;
        if (leitorId) {
          response = await fetch(`/api/leitores/${leitorId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email }),
          });
        } else {
          response = await fetch('/api/leitores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email }),
          });
        }

        if (response.ok) {
          alert(leitorId ? "Leitor atualizado com sucesso." : "Leitor adicionado com sucesso.");
          const modal = bootstrap.Modal.getInstance(modalLeitor);
          modal.hide();
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao salvar leitor: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    });
  }

  // --- FORMULÁRIO DE EMPRÉSTIMOS ---
  const formEmprestimo = document.getElementById('formNovoEmprestimo');
  const modalEmprestimo = document.getElementById('modalNovoEmprestimo');

  if (modalEmprestimo) {
    modalEmprestimo.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const id = button.getAttribute('data-id');
      const id_leitor = button.getAttribute('data-id_leitor');
      const id_livro = button.getAttribute('data-id_livro');
      const data_emprestimo = button.getAttribute('data-data_emprestimo');
      const data_devolucao = button.getAttribute('data-data_devolucao');

      if (formEmprestimo) {
        formEmprestimo.dataset.emprestimoId = id || '';
        formEmprestimo.leitor_id.value = id_leitor || '';
        formEmprestimo.livro_id.value = id_livro || '';

        const inputDataEmprestimo = formEmprestimo.querySelector('[name="data_emprestimo"]');
        if (inputDataEmprestimo) {
          inputDataEmprestimo.value = data_emprestimo ? new Date(data_emprestimo).toISOString().slice(0, 10) : '';
        }

        const inputDataDevolucao = formEmprestimo.querySelector('[name="data_devolucao"]');
        if (inputDataDevolucao) {
          inputDataDevolucao.value = data_devolucao ? new Date(data_devolucao).toISOString().slice(0, 10) : '';
        }
      }
    });
  }

  if (formEmprestimo) {
    formEmprestimo.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emprestimoId = formEmprestimo.dataset.emprestimoId;
      const id_leitor = formEmprestimo.elements['leitor_id'].value;
      const id_livro = formEmprestimo.elements['livro_id'].value;
      const data_emprestimo = formEmprestimo.elements['data_emprestimo'].value;
      const data_devolucao = formEmprestimo.elements['data_devolucao'].value;

      if (!id_leitor || !id_livro) {
        alert("Por favor, selecione um leitor e um livro.");
        return;
      }

      if (!data_emprestimo) {
        alert("Por favor, informe a data do empréstimo.");
        return;
      }

      try {
        let response;
        const payload = {
          leitor_id: id_leitor,
          livro_id: id_livro,
          data_emprestimo,
          data_devolucao: data_devolucao || null,
          devolvido: false
        };

        if (emprestimoId) {
          response = await fetch(`/api/emprestimos/${emprestimoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } else {
          response = await fetch('/api/emprestimos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        }

        if (response.ok) {
          alert(emprestimoId ? "Empréstimo atualizado com sucesso." : "Empréstimo adicionado com sucesso.");
          const modal = bootstrap.Modal.getInstance(modalEmprestimo);
          modal.hide();
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao salvar empréstimo: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    });
  }

  // Função para apagar livro
  window.apagarLivro = async function(id) {
    if (confirm("Tens a certeza que queres apagar este livro?")) {
      try {
        const response = await fetch(`/api/livros/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          alert("Livro apagado com sucesso.");
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao apagar o livro: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    }
  };

  // Função para apagar leitor
  window.apagarLeitor = async function(id) {
    if (confirm("Tens a certeza que queres apagar este leitor?")) {
      try {
        const response = await fetch(`/api/leitores/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          alert("Leitor apagado com sucesso.");
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao apagar o leitor: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    }
  };

  // Função para apagar empréstimo
  window.apagarEmprestimo = async function(id) {
    if (confirm("Tens a certeza que queres apagar este empréstimo?")) {
      try {
        const response = await fetch(`/api/emprestimos/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          alert("Empréstimo apagado com sucesso.");
          location.reload();
        } else {
          const erro = await response.json();
          alert("Erro ao apagar o empréstimo: " + (erro.error || response.statusText));
        }
      } catch (err) {
        alert("Erro ao comunicar com o servidor.");
        console.error(err);
      }
    }
  };
});
