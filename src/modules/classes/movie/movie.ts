import { MovieItem } from '../../interfaces/movie-item';

export class Movie implements MovieItem {
  constructor(
    public name: string,
    public category: string,
    public year: number,
  ) {}
}
