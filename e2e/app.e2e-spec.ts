import { CinemaAppPage } from './app.po';

describe('cinema-app App', () => {
  let page: CinemaAppPage;

  beforeEach(() => {
    page = new CinemaAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
