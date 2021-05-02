/* eslint-disable @typescript-eslint/no-empty-function */
import { IFavoriteMovies } from '../../interfaces/favorite-movies.interface';
import { MovieItem } from '../../interfaces/movie-item';
import { ISave } from '../../interfaces/save.interface';
import { CustomerName } from '../../interfaces/user.interface';
import { Actions } from './actions';

class FavoriteMoviesMock implements IFavoriteMovies {
  get movies(): Readonly<MovieItem[]> {
    return [{ name: 'teste', category: 'teste', year: 2015 }];
  }
  addMovie(movie: MovieItem): void {}
  removeMovie(index: number): void {}
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class SaveMock implements ISave {
  saveFavorite() {}
}

class CustomerUserMock implements CustomerName {
  getName() {
    return '';
  }

  getIdentifier() {
    return '';
  }
}

const createSut = () => {
  const favoriteMoviesMock = new FavoriteMoviesMock();
  const saveMock = new SaveMock();
  const customerUserMock = new CustomerUserMock();

  const sut = new Actions(favoriteMoviesMock, saveMock, customerUserMock);

  return {
    sut,
    favoriteMoviesMock,
    saveMock,
    customerUserMock,
  };
};

describe('Action', () => {
  afterEach(() => jest.clearAllMocks());

  it('should not add to favorites if it is empty', () => {
    const { sut, favoriteMoviesMock } = createSut();
    const favoriteMoviesMockSpy = jest
      .spyOn(favoriteMoviesMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.addFavorite();
    expect(favoriteMoviesMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.status).toBe('none');
  });

  it('should save the favorite if not empty', () => {
    const { sut, favoriteMoviesMock } = createSut();
    const favoriteMoviesMockSpy = jest
      .spyOn(favoriteMoviesMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.addFavorite();
    expect(favoriteMoviesMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.status).toBe('added');
  });

  it('should save favorite', () => {
    const { sut, saveMock } = createSut();
    const saveMockSpy = jest.spyOn(saveMock, 'saveFavorite');
    sut.addFavorite();
    expect(saveMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should get name customer', () => {
    const { sut, customerUserMock } = createSut();
    const customerUserMockSpy = jest.spyOn(customerUserMock, 'getName');
    sut.addFavorite();
    expect(customerUserMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear favorite', () => {
    const { sut, favoriteMoviesMock } = createSut();
    const favoriteMoviesMockSpy = jest.spyOn(favoriteMoviesMock, 'clear');
    sut.addFavorite();
    expect(favoriteMoviesMockSpy).toHaveBeenCalledTimes(0);
  });
});
