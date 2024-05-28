import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';

import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presnter.js';

const pageBodyElement = document.querySelector('.page-body');
const tripMainElement = pageBodyElement.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageBodyElement.querySelector('.trip-events');

const eventModel = new EventModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(
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

tripPresenter.init();
headerPresenter.init();
filterPresenter.init();
