#To-Do List
  Este é um projeto de lista de tarefas (to-do list) desenvolvido com React e Vite, estilizado com Tailwind CSS.

#Índice
  Demonstração
  Tecnologias Utilizadas
  Instalação e Execução
  Funcionalidades
  Estrutura do Projeto
  Contribuindo
  Licença
  
#Demonstração

[[https://github.com/usuario/projeto-todo-list.git](https://to-do-list-ashy-five-92.vercel.app/)]

#Tecnologias Utilizadas

  React: Biblioteca JavaScript para criar interfaces de usuário.
  Vite: Ferramenta de build para desenvolvimento rápido com React.
  Tailwind CSS: Framework utilitário para estilização de componentes.
  JavaScript (ES6+): Para a lógica do projeto.
  Instalação e Execução
  Siga os passos abaixo para rodar o projeto localmente:

#Instalação
  Clone o repositório:
    git clone [https://github.com/usuario/projeto-todo-list.git](https://github.com/albertverso/to-do-list.git)
  Acesse o diretório do projeto:
    cd projeto-todo-list
  Instale as dependências:
    npm install
  Rode o projeto localmente:
    npm run dev
  Acesse o projeto em seu navegador:
    http://localhost:3000
  
#Funcionalidades:
  Login e criar conta
  Personalizar perfil do usuário
  Adicionar novas tarefas
  Adicionar itens a essa terefa
  Marcar os itens como concluídas
  Marcar como favoritas as tarefas

Interface responsiva com Tailwind CSS

#Estrutura do Projeto
  projeto-todo-list/
  ├── public/
  ├── src/
  |   ├── assets/
  │   ├── components/
  |   |   └── Footer.jsx
  |   |   └── Header.jsx
  |   |   └── Notes.jsx
  |   |   └── Sidebar.jsx
  |   |   └── SkeletonLoading.jsx
  |   ├── pages/
  |   |   └── Home.jsx
  |   |   └── Login.jsx
  |   |   └── Profile.jsx        
  |   ├── services/
  |   |   └── apiService.jsx
  |   |   └── authService.jsx
  |   ├── styles/
  │   ├── App.js
  │   ├── Router.jsx
  │   └── main.jsx
  ├── tailwind.config.js
  ├── package.json
  └── README.md

components/: Contém os componentes reutilizáveis.
assets/: Contém imagens do projeto.
pages/: Contém as paginas.
styles/: css customizavel.
services/: Contém as requisições que vem do back-end

#Contribuindo
Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

#Licença
Este projeto está licenciado sob a MIT License.
