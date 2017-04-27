import { JogoMemoriaPage } from './app.po';

describe('jogo-memoria App', () => {
  let page: JogoMemoriaPage;

  beforeEach(() => {
    page = new JogoMemoriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
