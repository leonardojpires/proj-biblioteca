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
});

// Função para apagar livro
async function apagarLivro(id) {
  if (confirm("Tens a certeza que queres apagar este livro?")) {
    try {
      const response = await fetch(`/api/livros/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
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
}


async function apagarLeitor(id) {
  if (confirm("Tens a certeza que queres apagar este leitor?")) {
    try {
      const response = await fetch(`/api/leitores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
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
}
