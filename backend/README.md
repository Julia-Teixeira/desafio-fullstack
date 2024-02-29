## Descrição

O objetivo dessa aplicação é criar um catálogo de produtos.

## Endpoins

A API tem um total de 2 endpoints, podendo cadastrar seu usuário e realizar o login e cadastrar seus produtos.<br><br>

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:Julia-Teixeira/desafio-fullstack.git

# Acesse a pasta do projeto no terminal/cmd
$ cd desafio-fullstack

# Vá para a pasta server
$ cd backend/

# Instale as dependências
$ npm install

# Preencha as variáveis de ambiente corretamente

# Execute a aplicação em modo de desenvolvimento
$ npm run start


```

# Documentação

## Rotas que não precisão de autenticação

`POST /users/login - FORMATO DA REQUISIÇÃO`
```json
{
  "email": "usuario@gmail.com",
  "password": "1234"
}
```

`POST /users/login - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjg0OTc3NDE0LCJleHAiOjE2ODQ5ODEwMTQsInN1YiI6ImEwYWEzMDBlLTBiNDEtNDM5NS1hY2M4LTkxY2Q5YjMyODIyMiJ9.Pk2EVvTirr6IFfPLgDdS4OoD440GnCbS3hKvBQ1Eew8"
}
```
Se alguma informação estiver incorreta:<br>

`POST /users/login - FORMATO DA RESPOSTA - STATUS 401`
```json
{
	"message": "Incorrect email or password"
}
```

`POST /users/ - FORMATO DA REQUISIÇÃO`
```json
{
	"name": "Nome e Sobrenome",
	"email": "email@gmail.com",
	"password": "1234"
}
```
`POST /users/ - FORMATO DA RESPOSTA - STATUS 200`
```json
{
	"id": 1,
	"name": "Nome e Sobrenome",
	"email": "email@gmail.com",
	"createdAt": "2024-02-24T19:24:27.997Z",
	"updatedAt": "2024-02-24T19:24:27.997Z"
}
```
<br> <br>

## Rotas que precisa de autenticação

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

<blockquote>
Authorization: Bearer {token}
</blockquote>
<br>

<h2 align="center"> Usuário</h2>

`GET /users - FORMATO DA RESPOSTA - STATUS 200`
 
```json
{
  "id": 1,
	"name": "Nome e Sobrenome",
	"email": "email@gmail.com",
	"createdAt": "2024-02-24T19:24:27.997Z",
	"updatedAt": "2024-02-24T19:24:27.997Z"
}
```
<br />

`GET /users/id - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "id": 1,
	"name": "Nome e Sobrenome",
	"email": "email@gmail.com",
	"createdAt": "2024-02-24T19:24:27.997Z",
	"updatedAt": "2024-02-24T19:24:27.997Z"
}
```
<br />

`PATCH /users/id - FORMATO DA REQUISIÇÃO - STATUS 200`
```json
{
	"name": "Nome e Sobrenome1",
}
```
`PATCH /users/id - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "id": 1,
	"name": "Nome e Sobrenome1",
	"email": "email@gmail.com",
	"createdAt": "2024-02-24T19:24:27.997Z",
	"updatedAt": "2024-02-24T19:24:27.997Z"
}
```
<br />

`DELETE /users/id - FORMATO DA REQUISIÇÃO - STATUS 200`
```json
No body
```

`DELETE /users/id - FORMATO DA RESPOSTA - STATUS 204`
```json
No body returned for response
```

