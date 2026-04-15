let contador = 0;

function adicionarMusica(animada = true) {
  contador++;
  const lista = document.getElementById("lista-musicas");

  const item = document.createElement("div");
  item.classList.add("musica-item", "py-3");
  if (animada) item.classList.add("nova");

  item.innerHTML = `
        <div class="musica-cabecalho">
            <p class="musica-numero mb-0">Música ${contador}</p>
            ${
              contador > 1
                ? `<button type="button" class="btn-remover" title="Remover música" onclick="removerMusica(this)">×</button>`
                : ""
            }
        </div>
        <label for="nome-${contador}" class="my-2 texto-escuro">Nome:</label>
        <input type="text" name="nome[]" id="nome-${contador}" class="form-input linha-form mb-3">

        <label for="link-${contador}" class="my-2 texto-escuro">Link do YouTube:</label>
        <input type="text" name="link[]" id="link-${contador}" class="form-input linha-form">
    `;

  lista.appendChild(item);
  item.addEventListener("animationend", () => item.classList.remove("nova"));
}

function removerMusica(botao) {
  const item = botao.closest(".musica-item");
  item.style.opacity = "0";
  item.style.transform = "translateY(-8px)";
  item.style.transition = "opacity 0.2s, transform 0.2s";
  setTimeout(() => {
    item.remove();
    renumerarMusicas();
  }, 200);
}

function renumerarMusicas() {
  const itens = document.querySelectorAll(".musica-item");
  contador = itens.length;

  itens.forEach((item, i) => {
    const numero = i + 1;
    item.querySelector(".musica-numero").textContent = `Música ${numero}`;

    const inputs = item.querySelectorAll("input");
    const labels = item.querySelectorAll("label");
    labels[0].setAttribute("for", `nome-${numero}`);
    inputs[0].setAttribute("id", `nome-${numero}`);
    labels[1].setAttribute("for", `link-${numero}`);
    inputs[1].setAttribute("id", `link-${numero}`);

    const btnRemover = item.querySelector(".btn-remover");
    if (numero === 1 && btnRemover) {
      btnRemover.remove();
    } else if (numero > 1 && !btnRemover) {
      const cabecalho = item.querySelector(".musica-cabecalho");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-remover";
      btn.title = "Remover música";
      btn.textContent = "×";
      btn.setAttribute("onclick", "removerMusica(this)");
      cabecalho.appendChild(btn);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => adicionarMusica(false));
