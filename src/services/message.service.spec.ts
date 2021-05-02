import { Message } from '../modules/interfaces/message';
import { EmptyFavoriteMessage, SaveFavoriteMessage } from './message.service';

const createSut = (sendMessage: new () => Message): Message => {
  return new sendMessage();
};

describe('Message', () => {
  afterEach(() => jest.clearAllMocks());

  it('should show when empty', () => {
    const sut = createSut(EmptyFavoriteMessage);
    expect(sut.sendMessage()).toBe('Nenhum filme salvo no favorito.');
  });

  it('should show when you have movies and save your favorites', () => {
    const sut = createSut(SaveFavoriteMessage);
    expect(sut.sendMessage('Filme')).toBe(
      'Filmes adicionados ao favorito: Filme',
    );
  });
});
