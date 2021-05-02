import { ISave } from '../modules/interfaces/save.interface';

export class Save implements ISave {
  saveFavorite(): void {
    console.log('Favorito salvo.');
  }
}
