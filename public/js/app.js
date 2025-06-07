document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formNovoLivro');
  const modalElement = document.getElementById('modalNovoLivro');

  // Evento para abrir o modal e preencher campos se for edição
  modalElement.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; // botão que acionou o modal
    const id = button.getAttribute('data-id');
    const titulo = button.getAttribute('data-titulo');
    const autor = button.getAttribute('data-autor');
    const genero = button.getAttribute('data-genero');

    if (form) {
      form.dataset.livroId = id || ''; // armazena o id no form (vazio se novo)

      form.titulo.value = titulo || '';
      form.autor.value = autor || '';
      form.genero.value = genero || '';
    }
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const livroId = form.dataset.livroId;
      const titulo = form.titulo.value.trim();
      const autor = form.autor.value.trim();
      const genero = form.genero.value.trim();

      if (!titulo || !autor || !genero) {
        alert("Preenche todos os campos.");
        return;
      }

      try {
        let response;
        if (livroId) {
          // Editar livro (PUT)
          response = await fetch(`/api/livros/${livroId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, genero }),
          });
        } else {
          // Novo livro (POST)
          response = await fetch('/api/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, genero }),
          });
        }

        if (response.ok) {
          alert(livroId ? "Livro atualizado com sucesso." : "Livro adicionado com sucesso.");
          const modal = bootstrap.Modal.getInstance(modalElement);
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
});

// Função apagar 
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
