# 🎬 React Movie App

Aplicação desenvolvida em **React** que consome a API do **TMDB** (ou **OMDb**) para permitir que usuários busquem filmes, vejam detalhes e montem uma lista de favoritos.

---

## 📌 Funcionalidades

### 1️⃣ Página de Busca
- Campo de texto para digitar o termo de pesquisa.
- Exibe lista de resultados com:
  - Pôster
  - Título
  - Ano
  - Botão para ver detalhes do filme

### 2️⃣ Paginação
- Permite navegar entre as páginas de resultados da API.

### 3️⃣ Página de Detalhes
- Exibe informações completas do filme:
  - Diretor
  - Elenco
  - Sinopse
  - Avaliação

### 4️⃣ Lista de Favoritos
- Botão para adicionar/remover filmes da lista de favoritos.
- Favoritos são persistidos no **localStorage**, mantendo os dados entre sessões.

### 5️⃣ Tratamento de Erros & Loading
- Indicador de carregamento enquanto aguarda resposta da API.
- Mensagens de erro amigáveis caso algo dê errado.

---

## 🛠️ Tecnologias Utilizadas
- **React** → biblioteca principal para construção da interface.
- **JavaScript (ES6+)** → lógica da aplicação.
- **CSS / Styled Components** → estilização dos componentes.
- **localStorage** → persistência de favoritos no navegador.
- **TMDB / OMDb API** → fonte dos dados dos filmes.

---

## 🚀 Como Rodar o Projeto

1. Clonar este repositório:

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

2. Instalar dependências:

```bash
npm install
```

3. Criar arquivo `.env` na raiz do projeto e adicionar sua chave da API:

```env
REACT_APP_API_KEY=SUA_CHAVE_API
```

4. Rodar a aplicação:

```bash
npm start
```

- Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📂 Estrutura do Projeto

```
📦 react-movie-app
┣ 📂 public
┃ ┗ index.html
┣ 📂 src
┃ ┣ 📂 components
┃ ┣ 📂 pages
┃ ┣ 📂 services → API requests
┃ ┗ index.js
┣ .env
┣ package.json
┗ README.md
```

---

## 💡 Observações
- Certifique-se de ter a chave da API válida do **TMDB** ou **OMDb**.
- A lista de favoritos é armazenada localmente no navegador via `localStorage`.
- A aplicação trata carregamento e erros para melhorar a experiência do usuário.

---

## 📬 Contato
- GitHub: [github.com/SEU_USUARIO](https://github.com/SEU_USUARIO)
- E-mail: SEU_EMAIL_AQUI

---

## 📄 Licença
Este projeto está sob a licença **MIT**. Sinta-se à vontade para estudar, modificar e testar, dando os devidos créditos.
