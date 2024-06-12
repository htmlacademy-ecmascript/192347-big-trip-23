import { remove, render, RenderPosition } from '../framework/render.js';
import EditEventView from '../view/event-edit-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, EVENT_TYPES, getDefaultEvent } from '../const.js';

export default class NewEventPresenter {

  #container = null;
  #handleTripEventChange = null;
  #handleDestroy = null;
  #eventModel = null;

  #event = {};
  #destinations = [];
  #offers = [];

  #eventTypes = EVENT_TYPES;

  #eventEditComponent = null;

  constructor({ container, onDataChange, onEventDestroy, eventModel }) {
    this.#event = getDefaultEvent();
    this.#eventModel = eventModel;
    this.#destinations = this.#eventModel.destinations;
    this.#offers = this.#eventModel.offers;
    this.#container = container;
    this.#handleTripEventChange = onDataChange;
    this.#handleDestroy = onEventDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EditEventView({
      event: this.#event,
      offers: this.#offers,
      eventTypes: this.#eventTypes,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleEventDeleteClick,
    });

    render(this.#eventEditComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleTripEventChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { ...event, id: nanoid() },
    );
    this.destroy();
  };

  #handleEventDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
