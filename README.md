
# Frotend_3D_car

## Sobre o projeto

Este projeto é uma aplicação que simula a navegação de um veículo em um mapa interativo 3D. O usuário pode visualizar trajetos, escolher rotas, e interagir com animações do carro. A aplicação é **internacionalizada** e utiliza boas práticas de desenvolvimento com **React**, **TypeScript**, **SCSS** e **Leaflet**.

## Funcionalidades

- **Internacionalização** (i18n) com `react-i18next`.
- **Mapa interativo** utilizando **Leaflet**.
- **Animação do carro** com controle da direção do sprite.
- **Seleção de rota** pelo usuário.
- **Responsividade** para adaptação em diferentes dispositivos.

## Ferramentas

### Frontend
Localização: `packages/frontend`

- **React**, **TypeScript**, **SCSS**
- **Leaflet** para mapas interativos.
- **i18n** (internacionalização) com `react-i18next`.

### Backend
Localização: `packages/backend`

- **Node.js**, **Express**
- **JSON Parser** para manipulação de dados.

## Execução

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Iniciar o programa:
   ```bash
   npm start
   ```

3. Acesse a aplicação no navegador em: [http://localhost:5173/](http://localhost:5173/)

## Roadmap Resumido

### Frontend

- **Configuração do Lerna Monorepo**: Inicialize o Lerna e crie os pacotes para **frontend** e **backend**.
- **Instalar dependências**: Instalar pacotes como `react`, `typescript`, `leaflet`, `i18next`.
- **Configuração do mapa Leaflet**: Implementar o traçado da rota e animação do veículo.
- **Internacionalização**: Configurar e integrar o `react-i18next` para suportar múltiplos idiomas.

### Backend

- **Criação do backend**: Inicializar o backend com **Node.js**, **Express** e configurar o **JSON parser**.
- **Endpoints**: Criar endpoints necessários para fornecer dados de rotas ao frontend.
- **Integração com o frontend**: Garantir comunicação entre o frontend e o backend via API.