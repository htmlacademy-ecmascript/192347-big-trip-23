import {remove, render, RenderPosition} from '../framework/render.js';
import EditEventView from '../view/event-edit-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType, EVENT_TYPES, getDefaultEvent} from '../const.js';

export default class NewEventPresenter {

  #container = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventModel = null;

  #event = {};
  #destinations = [];
  #offers = [];

  #eventTypes = EVENT_TYPES;

  #eventEditComponent = null;

  constructor({container, onDataChange, onDestroy, eventModel}) {
    this.#eventModel = eventModel;
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = this.#eventModel.destinations;
    this.#offers = this.#eventModel.offers;
    this.#event = getDefaultEvent();
    console.log(this.#event);
    console.log(this.#container);
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
      onDeleteClick: this.#handleDeleteClick,
      onFormCancel: this.#handleDeleteClick,
    });

    console.log(this.#eventEditComponent);

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
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}