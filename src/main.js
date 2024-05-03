import TripInfoView from './view/trip-info-view';
import SortView from './view/sort-view';
import FilterView from './view/filter-view';
import EventPresenter from './presenter/event-presenter.js';
import { render, RenderPosition } from './render';

const pageBodyElement = document.querySelector('.page-body');
const tripMainElement = pageBodyElement.querySelector('.trip-main');
const controlsFiltersElemet = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageBodyElement.querySelector('.trip-events');

const eventPresenter = new EventPresenter({container: tripEventsElement});

eventPresenter.init();

render(new FilterView, controlsFiltersElemet);
render(new TripInfoView, tripMainElement, RenderPosition.AFTERBEGIN);
render(new SortView, tripEventsElement);
