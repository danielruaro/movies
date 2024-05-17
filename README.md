#  Movies


## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Contato](#contato)

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)

## Instalação

Instruções passo a passo sobre como configurar o ambiente de desenvolvimento local.

```bash
# Clone o repositório
git clone https://github.com/danielruaro/movies.git

# Navegue até o diretório do projeto
cd movies

# Instale as dependências
yarn install
```

## Uso

Instruções sobre como executar o projeto.

```bash
# Inicia o banco de dados POSTGRES utilizando docker e aplica migrations ao banco de dados
yarn db:dev:start

# Inicia a aplicação, limpa o banco de dados e insere os dados no banco de dados
yarn start:dev

# Caso queira apagar todos os dados do banco
yarn db:dev:restart

```

## APIs REST

### Producers

#### Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido,

```http
GET http://localhost:3333/producers/awards-interval
```

**Resposta:**

```json
{
	"max": [
		{
			"producer": "Matthew Vaughn",
			"interval": 13,
			"previousWin": 2002,
			"followingWin": 2015
		}
	],
	"min": [
		{
			"producer": "Joel Silver",
			"interval": 1,
			"previousWin": 1990,
			"followingWin": 1991
		}
	]
}
```

## Testes

```bash
# Execute os testes de integração
yarn test
```


## Contato

Daniel Ruaro - danielruaro@hotmail.com


---


