import { Save } from './services/save.service';
import { Favorite } from './modules/classes/favorite-movie/favorite-movie';
import { CustomerPhysicalPerson } from './modules/classes/customer/customer';
import { Actions } from './modules/classes/actions/actions';
import { Movie } from './modules/classes/movie/movie';
import { FavoriteStatus } from './modules/interfaces/favorite-status';

const save = new Save();
const favorite = new Favorite();

const status: Record<FavoriteStatus, string> = {
  added: 'Adicionado',
  none: 'Não contém',
};

const favoriteStatus = (type: FavoriteStatus) => {
  return status[type] || status.none;
};

const customer = new CustomerPhysicalPerson('Sara', 'Larson', '333.333.333-33');

const actions = new Actions(favorite, save, customer);

favorite.addMovie(
  new Movie("Marvel's The Avengers: Os Vingadores", 'Aventura/Ação', 2012),
);
favorite.addMovie(
  new Movie('Vingadores: Era de Ultron', 'Aventura/Ação', 2015),
);
favorite.addMovie(
  new Movie('Vingadores: Guerra Infinita', 'Aventura/Ação', 2018),
);

favorite.addMovie(
  new Movie('Vingadores: Ultimato', 'Ação/Ficção científica', 2019),
);

console.log(favorite.movies);
favorite.removeMovie(1); // Removido da lista -> Vingadores: Era de Ultron
actions.addFavorite();
console.log(`Status do favorito: ${favoriteStatus(actions.status)}`);
