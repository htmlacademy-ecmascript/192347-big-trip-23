import Observable from '../framework/observable';
import { SortType, UpdateType } from '../const';

export default class EventModel extends Observable {
  #eventApiService = null;
  #events = [];
  #destinations = [];
  #offers = [];
  #sortTypes = Object.values(SortType);

  constructor({eventApiService}) {
    super();

    this.#eventApiService = eventApiService;

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

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update event');
    }


  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventApiService.addEvent(update);
      const addEvent = this.#adaptToClient(response);
      this.#events = [
        addEvent,
        ...this.#events,
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
    this._notify(updateType, update);
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
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
