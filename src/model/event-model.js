import Observable from '../framework/observable';
import { events } from '../mock/events';
import { destinations } from '../mock/destination';
import { offers } from '../mock/offers';
import { SortType } from '../const';

export default class EventModel extends Observable {
  #eventApiService = null;
  #events = [];
  #destinations = [];
  #offers = [];
  #sortTypes = Object.values(SortType);

  constructor({eventApiService}) {
    super();

    this.#eventApiService = eventApiService;

    this.#eventApiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient));
    });

    this.#eventApiService.destinations.then((destinations) => {
      console.log(destinations);
    });

    this.#eventApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      const events = await this.#eventApiService.events;
      this.#events = events.map(this.#adaptToClient);
      this.#destinations = await this.#eventApiService.destinations;
      this.#offers = await this.#eventApiService.offers;
    } catch(err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
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

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom:event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
