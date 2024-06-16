import TripInfoView from '../view/trip-info-view';
import { remove, render, replace, RenderPosition } from '../framework/render';
import { sortEvents, filter } from '../utils';
import { SortType } from '../const';

export default class HeaderPresenter {
  #tripInfoComponent = null;
  #container = null;
  #eventModel = null;
  #prevTripInfoView = null;

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#onModelEvent);
  }

  get events() {
    const events = this.#eventModel.events;
    const filteredEvents = filter['everything'](events);
    const sortedEvents = sortEvents(filteredEvents, SortType.DAY);
    return sortedEvents;
  }

  init() {
    const destinations = this.#eventModel.destinations;

    this.#tripInfoComponent = new TripInfoView({
      events: this.events,
      destinations
    });

    if (this.#prevTripInfoView === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#tripInfoComponent, this.#prevTripInfoView);
      remove(this.#prevTripInfoView);
    }

    this.#prevTripInfoView = this.#tripInfoComponent;
  }

  #onModelEvent = () => {
    this.init();
  };
}
