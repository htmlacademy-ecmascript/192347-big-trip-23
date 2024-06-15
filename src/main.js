import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import EventApiService from './event-api-service.js';

import { render, RenderPosition } from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './const.js';

import FilterPresenter from './presenter/filter-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import NewButtonView from './view/new-event-button-view.js';

const pageBodyElement = document.querySelector('.page-body');
const tripMainElement = pageBodyElement.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageBodyElement.querySelector('.trip-events');

const eventModel = new EventModel({
  eventApiService: new EventApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(
  {
    container: tripEventsElement,
    eventModel,
    filterModel,
    onNewEventDestroy: handleNewEventFormClose
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
    filterModel,
    eventModel
  }
);

const newEventButtonComponent = new NewButtonView({
  onButtonClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

tripPresenter.init();
eventModel.init()
  .finally(() => {
    render(newEventButtonComponent, tripMainElement, RenderPosition.BEFOREEND);
    headerPresenter.init();
    filterPresenter.init();
  });
