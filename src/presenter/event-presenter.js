import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-view';
import SortView from '../view/sort-view';
import { render } from '../framework/render';
import { getDefaultEvent } from '../const';
import EditEventView from '../view/event-edit-view';

export default class EventPresenter {
  #container = null;
  #eventModel = null;
  #eventListComponent = new EventListView();
  #eventSortComponent = new SortView();

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    const events = this.#eventModel.events;
    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    render(this.#eventSortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    render(new EditEventView(getDefaultEvent(), destinations, offers), this.#eventListComponent.element);
    render(new EditEventView(events[1], destinations, offers), this.#eventListComponent.element);
    for (const event of events) {
      render(new EventItemView(event, destinations, offers), this.#eventListComponent.element);

    }
  }
}
