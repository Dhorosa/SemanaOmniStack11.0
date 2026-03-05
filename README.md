# SemanaOmniStack11.0
Curso com Diego Fernandes da RocketSeat

# Sobre o projeto

O Be the hero é um projeto com o intuito de facilitar a forma com que as ongs interagem com as pessoas. Pela aplicação web as ongs podem cadastrar casos que necessitam de doação, os usuários comuns, podem ler os casos ccadastrados pela aplicação mobile, e se tornarem os heróis de um caso.


# *Tecnologias Usadas*

## As seguintes tecnologias foram utiliadas neste projeto:

    Node.js
    Express.js
    Knex
    Jest
    ReactJS
    React-Native
    Expo.io
    
    
## Imagens Web
 ![login](https://user-images.githubusercontent.com/53453696/87104360-07996900-c22e-11ea-90f5-1895b0410e3f.png)
 
 ![Cadastro](https://user-images.githubusercontent.com/53453696/87107827-2a7c4b00-c237-11ea-85d9-4158269489c5.png)
 
 ![dashboard](https://user-images.githubusercontent.com/53453696/87108088-d0c85080-c237-11ea-90d4-c80f734c7c91.png)

## Imagens Mobile
![Splash](https://user-images.githubusercontent.com/53453696/87107075-3830d100-c235-11ea-897f-5bb7e4c7633e.jpg)

![Home mobile](https://user-images.githubusercontent.com/53453696/87106611-37e40600-c234-11ea-8ba4-ae6e63007c52.jpg)

![Caso Mobile](https://user-images.githubusercontent.com/53453696/87106606-374b6f80-c234-11ea-97cf-7818b0f63938.jpg)

## Estrutura do repositório

- `backend`: API construída com Express, Knex e SQLite (já com banco binário incluído).
- `frontend`: SPA em React (Create React App) que consome o backend e exibe os casos.
- `mobile`: App Expo/React Native com rotas e integração com o mesmo backend.

## Executando localmente

### Backend

1. Vá para `backend`, instale dependências (`npm install`).
2. Rode os testes com `npm test` (usa `jest --passWithNoTests` para não falhar sem specs).
3. Inicie com `npm start`.
4. A API lê o `PORT` via `process.env.PORT` (fallback `3333`), então ajuste conforme o host.

### Frontend (web)

1. Entre em `frontend` e instale dependências (`npm install`).
2. Ajuste `REACT_APP_API_URL` (`export REACT_APP_API_URL=http://localhost:3333` no mac/linux ou `set REACT_APP_API_URL=http://localhost:3333` no Windows) para apontar para o backend local.
3. Rode `npm start` para desenvolvimento.
4. O build usa `cross-env NODE_OPTIONS=--openssl-legacy-provider react-scripts build` para lidar com a versão atual do Node e gera `build/` (deploy em Vercel/Netlify ou qualquer servidor estático).

### Mobile (Expo)

1. Entre em `mobile` e rode `npm install`.
2. Ajuste o `extra.apiUrl` no `app.json` ou defina a variável `API_URL`/`EXPO_PUBLIC_API_URL` com o endereço acessível (por exemplo `http://192.168.x.x:3333` para um dispositivo).
3. Inicie com `expo start` e escolha o modo desejado (emulador, físico ou web).

## Deploy

- **Backend:** qualquer provider Node.js pode usar o `start` script; garanta que a variável `PORT` esteja definida e que o SQLite (`src/database/db.sqlite`) esteja incluído no deploy.
- **Frontend:** gere `build/` com `npm run build` (já inclui a variável `NODE_OPTIONS=--openssl-legacy-provider` para compatibilidade). Defina `REACT_APP_API_URL` no ambiente do host para apontar para a API publicada.
- **Mobile:** o app lê o backend por `Constants.manifest.extra.apiUrl`. Atualize esse valor (ou as variáveis `API_URL`/`EXPO_PUBLIC_API_URL`) com a URL pública da API antes de publicar no Expo ou nas lojas.




