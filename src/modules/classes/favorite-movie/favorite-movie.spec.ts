import { MovieItem } from '../../interfaces/movie-item';
import { Favorite } from './favorite-movie';

const createSut = () => {
  const sut = new Favorite();
  return { sut };
};

const createMovie = (name: string, category: string, year: number) => {
  class MovieItemMock implements MovieItem {
    constructor(
      public name: string,
      public category: string,
      public year: number,
    ) {}
  }

  return new MovieItemMock(name, category, year);
};

const createSutWithMovies = () => {
  const { sut } = createSut();
  const MovieItem1 = createMovie(
    'Vingadores: Guerra Infinita',
    'Aventura/Ação',
    2018,
  );
  const movieItem2 = createMovie(
    'Vingadores: Era de Ultron',
    'Aventura/Ação',
    2015,
  );
  sut.addMovie(MovieItem1);
  sut.addMovie(movieItem2);
  return { sut };
};

describe('Favorite', () => {
  it('should be empty favorites when no movie added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 movies', () => {
    const { sut } = createSutWithMovies();
    expect(sut.movies.length).toBe(2);
  });

  it('should add movies and clear favorites', () => {
    const { sut } = createSutWithMovies();
    expect(sut.movies.length).toBe(2);
    sut.clear();
    expect(sut.movies.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove movies', () => {
    const { sut } = createSutWithMovies();
    expect(sut.movies.length).toBe(2);
    sut.removeMovie(1);
    expect(sut.movies.length).toBe(1);
    sut.removeMovie(0);
    expect(sut.isEmpty()).toBe(true);
  });
});
