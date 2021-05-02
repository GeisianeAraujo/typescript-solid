import { Message } from '../modules/interfaces/message';

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
