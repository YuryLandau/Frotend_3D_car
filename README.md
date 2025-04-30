# Frotend_3D_car

## Sobre o projeto

## Funcionalidades
* Internacionalização dos textos (i18n - react-i18next)
* Incluir mapa (Leaflet map)
* Utilização de bons padrões de código
* Utilização SCSS
* Versionamento
* Animação da imagem no sprite
    * Controlar direção do sprite dependendo do ângulo de movimento.

### Extras
* Velocidade do carro muda.
* Possibilitar que o usuário selecione a rota

## Ferramentas
* [Lerna Monorepo](https://www.youtube.com/watch?v=j0FiMekdeOs)
* [Lerna Docs](https://lerna.js.org/docs/getting-started)
    * Managing tool

### Frontend 
localização: `packages/frontend`
* React
* TypeScript
* SCSS - Estilização
* Leaflet
* [i18n - Internacionalização](https://react.i18next.com)

### Backend 
localização: `packages/backend`
* Node.JS
* TypeScript
* Express
* JSON Parser

# Roadmap
* Checar a versão do Lerna que será instalada, assim como a configuração que será gerada: `npx lerna@latest init --dryRun --exact`
* Para iniciar o lerna, basta remover a flag `--dryRun`
* Criar pasta frontend: `npx lerna create frontend -y`
    * Iniciar um novo projeto React: `npm create vite@latest`
    * Criar com React versão 18, assim como o TypeScript
* Criar pasta backend: `npx lerna create backend -y`
    * Isto criará os repositórios dentro da pasta `packages/`
    * A flag `-y` serve para pular as etapas de configuração manual.
* Instalar dependências no backend: 
    * `cd packages/backend`
    * `npm i express body-parser`
* Criar arquivo do backend
* Limpar todas as dependências dos packages `npx lerna clean -y`
* Instalar todas as dependências dos packages na raiz: `npm install`
* Instalar sass: `npm install sass`
* Instalar i18n: `npm install react-i18next i18next --save`
    * Integração com o browser: `npm install i18next-http-backend i18next-browser-languagedetector --save`
* Instalar Leaflet: `npm install react@rc react-dom@rc leaflet`
    * A parte do React: `npm install react-leaflet@4.2.1 leaflet`
    * Types para o leaflet: `npm install -D @types/leaflet`
    * Setup Leaflet
    * Implementar traçado do percurso
        * Usar (Vector Layers)[https://react-leaflet.js.org/docs/example-vector-layers/]
    * Implementar marcador
        * Marker com DivIcon
        * (Implementar movimento)[https://gist.github.com/ramiroaznar/44f8de5ab7db081cae19db4e67bf6d74]
    * Implementar botão de iniciar viagem.
* Criar endpoint backend.
* Lapidar interface

# To solve
* OK - `npm install -D @types/leaflet` gera conflito com i18next
* `tsBuildInfoFile` no arquivo `tsconfig.app.json` com arning de erro
* Corrigir detecção da linguagem do navegador
* Corrigir versão do React para 18

# Implementar
* Responsividade
* Internacionalização