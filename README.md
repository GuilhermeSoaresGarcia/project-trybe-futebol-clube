# Trybe Futebol Clube Project

# Contexto

Neste projeto, deveria ser implementado o back-end para uma aplicação que mostra uma tabela de um campeonato de futebol, podendo filtrar partidas em andamento e finalizadas, bem como a classificação geral, classificação dos mandantes e dos visitantes. Além disso, a tabela deveria possuir dois perfis de usuário: admin, com o qual poderiam ser adicionadas novas partidas ou editadas partidas em andamento ou encerradas, e user, o qual poderia apenas consultar a tabela. Esses usuários deveriam gerar um token após autorizados (utilizando a biblioteca jsonwebtoken pra isso) e a senha dos usuários deveria ser armazenada criptografada (utilizando o Bcript) no banco de dados. O front-end já vinha pronto, mas a orquestração das aplicações deveria ser feita através do Docker-compose. Por fim, também deveriam ser implementados os teste unitários para as rotas criadas no back-end.

> Preparação dos ambientes do banco de dados, back-end e front-end com orquestração do docker-compose;

> Utilização do paradigma de programação orientada a objetos (POO) com o uso do TypeScript;

> Criação e alimentação do banco de dados via migrations do Sequelize;

> Desenvolvimento da aplicação back-end utilizando o conceito de camadas de models, services e controllers;

> Desenvolvimento de testes unitários para as rotas criadas.

## Tecnologias usadas

> Desenvolvido usando: Docker, Docker-compose, Sequelize, TypeScript, JWT, BCript, MySql e Mocha/Chai

## Instalando dependências
```
npm install
```

## Executando aplicação
```
npm run compose:up (para compor a aplicação)
```
```
A aplicação ficará acessível em: 
```
» http://localhost:3000/

## Preview

https://user-images.githubusercontent.com/87393731/194955439-53c464ab-7132-4fd9-bb67-8d48baa17f7a.webm
