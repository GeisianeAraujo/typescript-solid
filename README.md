# typescript-solid

[![Coverage Status](https://coveralls.io/repos/github/GeisianeAraujo/typescript-solid/badge.svg)](https://coveralls.io/github/GeisianeAraujo/typescript-solid)

Aplicando os princípios do SOLID utilizando Typescript, em uma funcionalidade simples de adicionar filmes aos favoritos.

## Instalação

```bash
$ npm install
```

## Rodando o projeto

```bash
$ npm start
```

## Rodando os testes com coverage

```bash
$ npm run test:coverage
```

## Princípios do SOLID

### Single Responsibility Principle (Princípio da responsabilidade única)

Cada classe deve ter apenas uma responsabilidade.

```typescript
export interface IFavoriteMovies {
  movies: Readonly<MovieItem[]>;
  addMovie(movie: MovieItem): void;
  removeMovie(index: number): void;
  isEmpty(): boolean;
  clear(): void;
}

export class Favorite implements IFavoriteMovies {
  private readonly _movies: MovieItem[] = [];

  addMovie(item: MovieItem): void {
    this._movies.push(item);
  }

  removeMovie(index: number): void {
    this._movies.splice(index, 1);
  }

  get movies(): Readonly<MovieItem[]> {
    return this._movies;
  }

  isEmpty(): boolean {
    return this._movies.length === 0;
  }

  clear(): void {
    console.log('Lista de favoritos limpa...');
    this._movies.length = 0;
  }
}
```

### OCP - Open/Closed Principle (Princípio do aberto/fechado)

Entidades devem estar abertas para extensão, porém fechadas para modificação.

```typescript
export abstract class Message {
  abstract sendMessage(moviesAdded?: string): string;
}

export class EmptyFavoriteMessage extends Message {
  sendMessage(): string {
    return 'Nenhum filme salvo no favorito.';
  }
}

export class SaveFavoriteMessage extends Message {
  sendMessage(moviesAdded: string): string {
    return `Filmes adicionados ao favorito: ${moviesAdded}`;
  }
}

export class Actions {
  private _emptyMessage = new EmptyFavoriteMessage();
  private _saveMessage = new SaveFavoriteMessage();

   ...

  addFavorite(): void {
    if (this.favorite.isEmpty()) {
      console.log(this._emptyMessage.sendMessage());
      return;
    }
	...
    console.log(this._saveMessage.sendMessage('Filmes...'));
	...
  }
}
```

### LSP - Liskov Substitution Principle (Princípio da Substituição de Liskov)

As subclasses devem ser substituíveis por suas superclasses. Ou seja, As classes filhas nunca devem quebrar as definições de tipo da classe pai.

**Errado**

```typescript
export abstract class Message {
  abstract sendMessage(moviesAdded?: string): string;
}

export class EmptyFavoriteMessage extends Message {
  sendMessage(): string {
    return 50; // deve respeitar a tipagem de retorno.
  }
}
```

**Correto**

```typescript
export abstract class Message {
  abstract sendMessage(moviesAdded?: string): string;
}

export class EmptyFavoriteMessage extends Message {
  sendMessage(): string {
    return 'Texto em string';
  }
}
```

### ISP - Interface Segregation Principle (Princípio da Segregação de Interface)

Cada interface deve fornece um único comportamento. Ou seja, podemos escrever uma série de interfaces menores e mais específicas que serão implementadas pela classe.

```typescript
export interface CustomerName {
  getName(): string;
  getIdentifier(): string;
}

export interface IPhysicalPerson {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface ILegalPerson {
  firstName: string;
  lastName: string;
  cnpj: string;
}

export class CustomerPhysicalPerson implements IPhysicalPerson, CustomerName {
  firstName: string;
  lastName: string;
  cpf: string;

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cpf = cpf;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getIdentifier(): string {
    return `CPF: ${this.cpf}`;
  }
}

export class CustomerLegalPerson implements ILegalPerson, CustomerName {
  firstName: string;
  lastName: string;
  cnpj: string;

  constructor(firstName: string, lastName: string, cnpj: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cnpj = cnpj;
  }

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getIdentifier(): string {
    return `CNPJ: ${this.cnpj}`;
  }
}
```

### DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência)

As classes de alto nível não devem depender de componentes de baixo nível, mas sim de uma abstração. As classes de alto nível devem gerenciar as classes de baixo nível.

```typescript
const actions = new Actions(favorite, save, customer);

export class Actions {
  ...
  constructor(
    private readonly favorite: IFavoriteMovies,
    private readonly post: ISave,
    private readonly user: CustomerName,
  ) {}

  moviesAdded(): string {
    return this.favorite.movies
      .map((movie: MovieItem) => movie.name)
      .join(', ');
  }

  addFavorite(): void {
    if (this.favorite.isEmpty()) {
      console.log(this._emptyMessage.sendMessage());
      return;
    }
	...
    this.post.saveFavorite();
    console.log(
      `Usuário: ${this.user.getName()}, ${this.user.getIdentifier()}`,
    );
  }
}
```
