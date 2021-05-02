import { MovieItem } from '../../interfaces/movie-item';
import { Movie } from './movie';

const createSut = (name: string, category: string, year: number): MovieItem => {
  return new Movie(name, category, year);
};

describe('Movie', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have properties name, category and year', () => {
    const sut = createSut('Vingadores: Guerra Infinita', 'Aventura/Ação', 2018);
    expect(sut).toHaveProperty('name', 'Vingadores: Guerra Infinita');
    expect(sut).toHaveProperty('category', 'Aventura/Ação');
    expect(sut.year).toBeCloseTo(2018);
  });
});
