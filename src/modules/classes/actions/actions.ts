import { FavoriteStatus } from '../../interfaces/favorite-status';
import { IFavoriteMovies } from '../../interfaces/favorite-movies.interface';
import { CustomerName } from '../../interfaces/user.interface';
import { ISave } from '../../interfaces/save.interface';
import { MovieItem } from '../../interfaces/movie-item';
import {
  EmptyFavoriteMessage,
  SaveFavoriteMessage,
} from '../../../services/message.service';

export class Actions {
  private _favoriteStatus: FavoriteStatus = 'none';
  private _emptyMessage = new EmptyFavoriteMessage();
  private _saveMessage = new SaveFavoriteMessage();

  constructor(
    private readonly favorite: IFavoriteMovies,
    private readonly post: ISave,
    private readonly user: CustomerName,
  ) {}

  get status(): FavoriteStatus {
    return this._favoriteStatus;
  }

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
    this._favoriteStatus = 'added';
    console.log(this._saveMessage.sendMessage(this.moviesAdded()));
    this.post.saveFavorite();
    console.log(
      `Usuário: ${this.user.getName()}, ${this.user.getIdentifier()}`,
    );
  }
}
