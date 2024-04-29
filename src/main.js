import MainPresenter from './presenter/main-presenter.js';

const sitePageBodyElement = document.querySelector('.page-body');
const siteTripEventsElement = sitePageBodyElement.querySelector('.trip-events');

const mainPresenter = new MainPresenter({container: siteTripEventsElement});

mainPresenter.init();
