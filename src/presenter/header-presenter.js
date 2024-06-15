import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render';
import { isEmpty, sortEvents, filter } from '../utils';
import { SortType } from '../const';


export default class HeaderPresenter {
  #tripInfoComponent = null;
  #container = null;
  #eventModel = null

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
    console.log(this.events);
    this.#tripInfoComponent = new TripInfoView({
      events: this.events
    });
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #onModelEvent = () => {
    if (this.#tripInfoComponent) {
      this.#tripInfoComponent.destroy();
    }
  };
}
