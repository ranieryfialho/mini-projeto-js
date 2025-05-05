# 📝 Mini Projeto JS - Lista de Tarefas

Este é um mini projeto desenvolvido em **HTML**, **CSS** e **JavaScript** puro, que implementa uma aplicação de gerenciamento de tarefas com suporte a **criação**, **edição**, **remoção**, **pesquisa** e **marcação como concluída**.

---

## 🚀 Funcionalidades

- 🔍 Pesquisa de tarefas por título ou descrição.
- ✅ Marcar tarefa como concluída.
- 📝 Edição de tarefas existentes.
- 🗑️ Exclusão de tarefas.
- 📋 Armazenamento de dados via API simulada com JSON Server.

---

## 🖼️ Interface

A interface é simples e responsiva, contendo:

- Campo de busca no topo.
- Listagem das tarefas em cards.
- Modal para criação/edição de tarefas.
- Estilização com CSS puro.

---

## ⚙️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Boxicons](https://boxicons.com/)
- [JSON Server](https://github.com/typicode/json-server) (para simulação da API REST)

---

## 🧑‍💻 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/ranieryfialho/mini-projeto.git
```

2. Instale as dependências (caso não tenha o json-server):
```bash
npm install -g json-server
```

3. json-server --watch api.json --port 3000
```bash
json-server --watch api.json --port 3000
```

📁 Estrutura de Pastas
mini-projeto-js/
├── api.json           # Banco de dados simulado
├── index.html         # Página principal
├── style.css          # Estilos da interface
├── script.js          # Lógica da aplicação
├── package.json       # Configuração do projeto (opcional)
├── package-lock.json  # Dependências travadas
└── node_modules/      # Ignorado no Git

🛑 Importante
Adicione no seu .gitignore:

```bash
node_modules/
```

📌 Requisitos
Node.js instalado
Navegador moderno
json-server instalado globalmente (npm install -g json-server)

📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar!
