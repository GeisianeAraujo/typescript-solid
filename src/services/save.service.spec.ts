import { Save } from './save.service';

describe('Save', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined when save empty', () => {
    const sut = new Save();
    expect(sut.saveFavorite()).toBeUndefined();
  });

  it('should show console.log once', () => {
    const sut = new Save();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveFavorite();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should show console.log with "Favorito salvo."', () => {
    const sut = new Save();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveFavorite();
    expect(consoleSpy).toHaveBeenCalledWith('Favorito salvo.');
  });
});
