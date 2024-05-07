import EventModel from './model/event-model.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';

const pageBodyElement = document.querySelector('.page-body');
const tripMainElement = pageBodyElement.querySelector('.trip-main');
const controlsFiltersElemet = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageBodyElement.querySelector('.trip-events');

const eventModel = new EventModel();
eventModel.init();

const eventPresenter = new EventPresenter({container: tripEventsElement, eventModel});
const headerPresenter = new HeaderPresenter({container: tripMainElement});
const filterPresenter = new FilterPresenter({container: controlsFiltersElemet});

eventPresenter.init();
headerPresenter.init();
filterPresenter.init();
