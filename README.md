# Reading Dashboard

```json
{
  "title": "Klara and the Sun",
  "author": "Kazuo Ishiguro",
  "pages": 303,
  "isbn": "978-0593318182",
  "genres": ["Sci-fi", "Fiction", "Literary Fiction"]
}
```

```json
{
  "title": "The Immortal Life of Henrietta Lacks",
  "author": "Rebecca Skloot",
  "genres": ["Non-fiction", "Science", "Biography", "History"],
  "pages": 384,
  "isbn": "1400052181"
}
```

```json
{
  "title": "Piranesi",
  "author": "Susanna Clarke",
  "genres": ["Fantasy", "Mystery", "Literary Fiction"],
  "pages": 272,
  "isbn": "1635575637"
}
```

```json
{
  "title": "Nós",
  "author": "Yevgeny Zamyatin",
  "pages": 240,
  "isbn": "8573262696",
  "genres": ["Distopia", "Ficção Científica", "Clássico", "Ficção Filosófica"]
}
```

POST /bookshelf?tab=reading 200 in 3338ms

```json
{
  "title": "Stories of Your Life and Others",
  "author": "Ted Chiang",
  "genres": [
    "Science Fiction",
    "Short Stories",
    "Fiction
",
    "Philosophy"
  ],
  "pages": 336,
  "isbn": "1101972124"
}
```

```json
{
  "title": "Project Hail Mary",
  "author": "Andy Weir",
  "pages": 496,
  "isbn": "978-0593135204",
  "genres": ["Sci-fi", "Adventure", "Fiction"]
}
```

```json
{
  "title": "Children of Time",
  "
author": "Adrian Tchaikovsky",
  "pages": 600,
  "isbn": "978-1447288814",
  "genres": [
    "Sci-
fi",
    "Fiction"
  ]
}
```

![application demo video](./public/presentation.gif)

[Reading Dashboard](https://readingdashboard.vercel.app/) é uma aplicação que permite acompanhar o progresso de leitura e gerenciar alguns dados dos livros adicionados. Com esta aplicação é possível:

- Visualizar o progresso de leitura de cada livro.
- Modificar informações sobre os livros, como o número de páginas lidas, status de leitura, etc.
- Adicionar novos livros à lista de leitura.
- Visualizar dados referentes à leitura por meio de gráficos.

Essa aplicação é de uso pessoal e todos os dados estão sendo recebidos do Notion. É apenas uma forma mais agradável de visualizar os dados contidos no database do Notion.

## Tecnologias Utilizadas

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Notion API**
- **Radix UI**

## Usage

Para fins de demonstração, adicionei autenticação criando um usuário demo, com **informações fictícias**.

Para entrar basta utilizar o username:

```bash
demo_user
```

## Demo

[Página do Notion com a estrutura do database](https://ojailson17.notion.site/Reading-Dashboard-Demo-Page-ed01f1ac6ba645c0b3d82c5605ed7974?pvs=4)

[Link de deploy](https://readingdashboard.vercel.app/)
