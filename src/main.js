import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';

const pageBodyElement = document.querySelector('.page-body');
const tripMainElement = pageBodyElement.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageBodyElement.querySelector('.trip-events');

const eventModel = new EventModel();
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter(
  {
    container: tripEventsElement,
    eventModel,
    filterModel
  }
);
const headerPresenter = new HeaderPresenter(
  {
    container: tripMainElement
  }
);
const filterPresenter = new FilterPresenter(
  {
    container: controlsFiltersElement,
    filterModel
  }
);

eventPresenter.init();
headerPresenter.init();
filterPresenter.init();
