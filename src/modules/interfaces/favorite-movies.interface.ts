import { MovieItem } from './movie-item';

export interface IFavoriteMovies {
  movies: Readonly<MovieItem[]>;
  addMovie(movie: MovieItem): void;
  removeMovie(index: number): void;
  isEmpty(): boolean;
  clear(): void;
}
