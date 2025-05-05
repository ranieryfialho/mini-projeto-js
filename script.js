const overlay = document.querySelector("#overlay")
const criarTarefa = document.querySelector("#criarTarefa")
const lista = document.querySelector("#lista")
const titulo = document.querySelector("#titulo")
const descricao = document.querySelector("#descricao")
const busca = document.querySelector("#busca")

function abrirModal() {
  overlay.classList.add("active")
  criarTarefa.classList.add("active")
}

function fecharModal() {
  overlay.classList.remove("active")
  criarTarefa.classList.remove("active")
  resetarFormulario()
}

function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefas(res)
    })
    .catch((erro) => {
      console.error("Erro ao buscar tarefas:", erro)
      lista.innerHTML = '<li style="width:100%; text-align:center; color:red;">Erro ao carregar tarefas!</li>'
    })
}

buscarTarefas()

function inserirTarefas(listaDeTarefas) {
  if (listaDeTarefas.length > 0) {
    lista.innerHTML = ""
    listaDeTarefas.map((tarefa) => {
      const concluida = tarefa.concluida ? "concluida" : ""
      lista.innerHTML += `
                <li class="${concluida}">
                    <h5 class="${concluida}">
                      ${tarefa.titulo}
                      <div>
                        <box-icon id="check" name='check-circle' type='solid' onclick="marcarComoConcluida(${tarefa.id}, ${!tarefa.concluida})" style="fill: ${tarefa.concluida ? "#4CAF50" : "#999"}"></box-icon>
                        <box-icon id="edit" name='edit' type='solid' onclick="editarTarefa(${tarefa.id})"></box-icon>
                        <box-icon id="delete" name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                      </div>
                    </h5>
                    <p class="${concluida}">${tarefa.descricao}</p>
                </li>
            `
    })
  }
}

function novaTarefa() {
  event.preventDefault()
  const tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
    concluida: false,
  }
  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      alert("Tarefa criada com sucesso!")
      fecharModal()
      buscarTarefas()
    })
    .catch((erro) => {
      console.error("Erro ao criar tarefa:", erro)
      alert("Erro ao criar tarefa!")
    })
}

function deletarTarefa(id) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Tarefa Deletada com Sucesso!")
        buscarTarefas()
      })
      .catch((erro) => {
        console.error("Erro ao deletar tarefa:", erro)
        alert("Erro ao deletar tarefa!")
      })
  }
}

function editarTarefa(id) {
  fetch(`http://localhost:3000/tarefas/${id}`)
    .then((res) => res.json())
    .then((tarefa) => {
      // Preencher o formulário com os dados da tarefa
      document.querySelector("#titulo").value = tarefa.titulo
      document.querySelector("#descricao").value = tarefa.descricao

      // Modificar o formulário para modo de edição
      const form = document.querySelector("#form-tarefa")
      const botao = form.querySelector("button")
      botao.textContent = "Atualizar"

      // Armazenar o ID da tarefa em um atributo de dados no formulário
      form.setAttribute("data-id", id)
      form.setAttribute("data-editing", "true")

      // Abrir o modal
      abrirModal()
    })
    .catch((erro) => {
      console.error("Erro ao buscar tarefa:", erro)
      alert("Erro ao buscar dados da tarefa!")
    })
}

function resetarFormulario() {
  const form = document.querySelector("#form-tarefa")
  form.reset()

  // Restaurar o botão para "Criar"
  const botao = form.querySelector("button")
  botao.textContent = "Criar"

  // Limpar os atributos de dados
  form.removeAttribute("data-id")
  form.removeAttribute("data-editing")
}

// Modificar a função novaTarefa para lidar com criação e edição
document.querySelector("#form-tarefa").onsubmit = (event) => {
  event.preventDefault()

  const form = document.querySelector("#form-tarefa")
  const isEditing = form.getAttribute("data-editing") === "true"

  if (isEditing) {
    const id = form.getAttribute("data-id")
    atualizarTarefa(id)
  } else {
    novaTarefa()
  }
}

function atualizarTarefa(id) {
  const tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
  }

  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Tarefa atualizada com sucesso!")
      fecharModal()
      buscarTarefas()
    })
    .catch((erro) => {
      console.error("Erro ao atualizar tarefa:", erro)
      alert("Erro ao atualizar tarefa!")
    })
}

function marcarComoConcluida(id, status) {
  fetch(`http://localhost:3000/tarefas/${id}`)
    .then((res) => res.json())
    .then((tarefa) => {
      // Atualizar o status da tarefa
      tarefa.concluida = status

      // Enviar a tarefa atualizada para o servidor
      return fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("Status da tarefa atualizado:", res)
      buscarTarefas()
    })
    .catch((erro) => {
      console.error("Erro ao atualizar status da tarefa:", erro)
      alert("Erro ao marcar tarefa como concluída!")
    })
}

function pesquisarTarefas() {
  const lis = document.querySelectorAll("ul li")
  const termo = busca.value.toLowerCase().trim()

  lis.forEach((li) => {
    const titulo = li.querySelector("h5").innerText.toLowerCase()
    const descricao = li.querySelector("p").innerText.toLowerCase()

    if (termo.length > 0) {
      if (titulo.includes(termo) || descricao.includes(termo)) {
        li.classList.remove("oculto")
      } else {
        li.classList.add("oculto")
      }
    } else {
      li.classList.remove("oculto")
    }
  })
}