import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';
import { SORT_TYPES } from '../const';


export default class EventModel {
  #events = events;
  #destinations = destinations;
  #offers = offers;
  #sortTypes = SORT_TYPES;


  get events() {
    return this.#events;
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
