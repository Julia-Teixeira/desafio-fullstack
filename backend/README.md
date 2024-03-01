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

<h2 align="center">Usuário</h2>

`GET /users - FORMATO DA RESPOSTA`
 
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

`PATCH /users/id - FORMATO DA REQUISIÇÃO`
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

`DELETE /users/id - FORMATO DA REQUISIÇÃO`
```json
	No body
```

`DELETE /users/id - FORMATO DA RESPOSTA - STATUS 204`
```json
	No body returned for response
```
<br>
<h2 align="center">Produto</h2>

`POST /products - FORMATO DA REQUISIÇÃO`

Existem três formas para realizar o cadastro dos produtos:
Obs.: O campo img é opcional.

1º formato: 
```json
{
   "name": "Xiaomi Redmi 9",
   "brand": "Xiaomi",
   "model": "Redmi 9",
   "price":  10000,
   "color": "red"
}
```

2º formato: 
```json
{
   "name": "Xiaomi Redmi 10",
   "details": {
       "brand": "Xiaomi",
       "model": "Redmi 10",
       "color": "blue"
   },
   "price":  10000
}
```

3º formato: 
```json
[  
   {
        "name": "Xiaomi Redmi 11",
        "brand": "Xiaomi",
        "model": "Redmi 11",
        "data": [
           {
        	  "price":  10000,
        	  "color": "rosé"
           },
          {
        	  "price":  10000,
        	  "color": "lilás"
           }
        ]
   },
   {
        "name": "Iphone 14 Pro",
        "brand": "Iphone",
        "model": "14 Pro",
        "data": [
           {
        	  "price":  30000,
        	  "color": "silver"
           },
          {
        	  "price":  30100,
        	  "color": "gold"
           }
        ]
   }
]
```

`POST /products - FORMATO DA RESPOSTA - STATUS 201`

1º formato: 
```json
[
	{
		"createdAt": "2024-02-27T20:30:03.065Z",
		"updatedAt": "2024-02-27T20:30:03.065Z",
		"id": 1,
		"name": "Xiaomi Redmi 9",
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"userId": 1,
		"productInfos": [
			{
				"id": 1,
				"price": 10000,
				"color": "red",
				"createdAt": "2024-02-27T20:30:03.327Z",
				"updatedAt": "2024-02-27T20:30:03.327Z"
			}
		]
	}
]
```
2º formato: 
```json
[
	{
		"createdAt": "2024-02-27T20:34:48.868Z",
		"updatedAt": "2024-02-27T20:34:48.869Z",
		"id": 2,
		"name": "Xiaomi Redmi 10",
		"brand": "Xiaomi",
		"model": "Redmi 10",
		"userId": 1,
		"productInfos": [
			{
				"id":2,
				"price": 10000,
				"color": "blue",
				"createdAt": "2024-02-27T20:34:49.022Z",
				"updatedAt": "2024-02-27T20:34:49.022Z"
			}
		]
	}
]
```
3º formato: 
```json
[
	{
		"createdAt": "2024-02-26T18:06:46.253Z",
		"updatedAt": "2024-02-26T18:06:46.253Z",
		"id": 3,
		"name": "Xiaomi Redmi 11",
		"brand": "Xiaomi",
		"model": "Redmi 11",
		"userId": 1,
		"productInfos": [
			{
				"id": 3,
				"price": 10000,
				"color": "rosé",
				"createdAt": "2024-02-26T18:06:46.412Z",
				"updatedAt": "2024-02-26T18:06:46.412Z"
			},
			{
				"id": 4,
				"price": 10000,
				"color": "lilás",
				"createdAt": "2024-02-26T18:06:46.412Z",
				"updatedAt": "2024-02-26T18:06:46.412Z"
			}
		]
	},
	{
		"createdAt": "2024-02-26T18:06:46.253Z",
		"updatedAt": "2024-02-26T18:06:46.253Z",
		"id": 4,
		"name": "Iphone 14 Pro",
		"brand": "Iphone",
		"model": "14 Pro",
		"userId": 1,
		"productInfos": [
			{
				"id": 5,
				"price": 30000,
				"color": "silver",
				"createdAt": "2024-02-26T18:06:46.412Z",
				"updatedAt": "2024-02-26T18:06:46.412Z"
			},
			{
				"id": 6,
				"price": 30100,
				"color": "gold",
				"createdAt": "2024-02-26T18:06:46.412Z",
				"updatedAt": "2024-02-26T18:06:46.412Z"
			}
		]
	}
]
```

`GET /products - FORMATO DA REQUISIÇÃO`

```json
{
	No body
}
```

`GET /products - FORMATO DA RESPOSTA - 200`

```json
[
	{
		"createdAt": "2024-02-27T20:30:03.065Z",
		"updatedAt": "2024-02-27T20:30:03.065Z",
		"id": 1,
		"name": "Xiaomi Redmi 9",
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"userId": 1,
		"productInfos": [
			{
				"id": 1,
				"price": 10000,
				"color": "red",
				"img": "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
			}
		]
	},
	.
	.
	.
]

```


`GET /products/id - FORMATO DA REQUISIÇÃO`

```json
{
No body
}
```

`GET /products - FORMATO DA RESPOSTA - 200`
```json
{
	"id": 1,
	"name": "Xiaomi Redmi 9",
	"brand": "Xiaomi",
	"model": "Redmi 9",
	"createdAt": "2024-02-26T14:38:49.787Z",
	"updatedAt": "2024-02-26T14:38:49.787Z",
	"userId": 1,
	"productInfos": [
		{
			"id": 1,
			"price": 709,
			"color": "Cinza",
			"img": "https://m.media-amazon.com/images/I/31tMsjj0x3L._AC_SR38,50_.jpg"
		},
		{
			"id": 2,
			"price": 709,
			"color": "Carbon Grey",
			"img": "https://m.media-amazon.com/images/I/51i+m4+BI5L._AC_SY741_.jpg"
		},
		{
			"id": 3,
			"price": 1152.99,
			"color": "Roxo",
			"img": "https://m.media-amazon.com/images/I/61TIUx9dzhL._AC_SL1000_.jpg"
		}
	]
}

```

Possíveis retornos de erro:

`GET /products/id - FORMATO DA RESPOSTA - 404`

```json
{
	"message": "Product not found"
}
```

`PATCH /products/id - FORMATO DA REQUISIÇÃO` <br>
Obs.: Todos os campos são opcionais.

```json
{
	"name": "Xiaomi Redmi 9",
	"brand": "Xiaomi",
	"model": "Redmi 9"
}
```

`PATCH /products/id - FORMATO DA RESPOSTA - 200`

```json

{
	"id": 1,
	"name": "Xiaomi Redmi 9",
	"brand": "Xiaomi",
	"model": "Redmi 9",
	"createdAt": "2024-02-26T14:38:49.787Z",
	"updatedAt": "2024-02-26T14:38:49.787Z",
	"userId": 1,
	"productInfos": [
		{
			"id": 1,
			"price": 709,
			"color": "Cinza",
			"img": "https://m.media-amazon.com/images/I/31tMsjj0x3L._AC_SR38,50_.jpg"
		},
		{
			"id": 2,
			"price": 709,
			"color": "Carbon Grey",
			"img": "https://m.media-amazon.com/images/I/51i+m4+BI5L._AC_SY741_.jpg"
		},
		{
			"id": 3,
			"price": 1152.99,
			"color": "Roxo",
			"img": "https://m.media-amazon.com/images/I/61TIUx9dzhL._AC_SL1000_.jpg"
		}
	]
}

```

`DELETE /products/id - FORMATO DA REQUISIÇÃO`

```json
{
	No body
}
```

`DELETE /products/id - FORMATO DA RESPOSTA - 204`

```json
{
	No body returned for response
}
```


Para adicionar uma nova cor do seu produto: <br> <br>
`POST /products/id/productInfos - FORMATO DA REQUISIÇÃO`
```json
{
	"price": 709.00,
	"color": "Carbon Grey",
	"img": "https://m.media-amazon.com/images/I/51i+m4+BI5L._AC_SY741_.jpg"
}
```

`PATCH  /products/id/productInfos - FORMATO DA RESPOSTA - 200`

```json
{
	"createdAt": "2024-02-27T18:45:16.408Z",
	"updatedAt": "2024-02-27T18:45:16.409Z",
	"id": 43,
	"price": 709,
	"color": "Carbon Grey",
	"img": "https://m.media-amazon.com/images/I/51i+m4+BI5L._AC_SY741_.jpg",
	"productId": 22
}
```


`PATCH /products/productInfos/id - FORMATO DA REQUISIÇÃO`

```json
{
	"color": "Gold" ,
	"price": 6499,
	"img": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-storage-select-202209-6-7inch-yellow?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1676501038043"
}
```

`PATCH /products/productInfos/id - FORMATO DA RESPOSTA - 200`

```json
{
	"id": 4,
	"color": "Gold",
	"price": 6499,
	"img": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-storage-select-202209-6-7inch-yellow?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1676501038043",
	"createdAt": "2024-02-27T20:33:49.538Z",
	"updatedAt": "2024-02-27T20:36:49.552Z",
	"productId": 32
}
```

`DELETE /products/productInfos/id - FORMATO DA REQUISIÇÃO`

```json
{
	No body
}
```

`DELETE /products/productInfos/id - FORMATO DA RESPOSTA - 204`

```json
{
	No body returned for response
}
```

