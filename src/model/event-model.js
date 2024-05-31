import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';
import { SortType } from '../const';

export default class EventModel {
  #events = events;
  #destinations = destinations;
  #offers = offers;
  #sortTypes = Object.values(SortType);

  get events() {
    return this.#events;
  }

  set events(tripEvents) {
    this.#events = [...tripEvents];
  }


  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get sortTypes() {
    return this.#sortTypes;
  }
}
