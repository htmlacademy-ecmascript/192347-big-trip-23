import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';

export default class EventModel {
  #events = events;
  #destinations = destinations;
  #offers = offers;

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
