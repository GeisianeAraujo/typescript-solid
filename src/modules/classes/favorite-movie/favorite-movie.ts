import { IFavoriteMovies } from '../../interfaces/favorite-movies.interface';
import { MovieItem } from '../../interfaces/movie-item';

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
