import { remove, render, RenderPosition } from '../framework/render.js';
import EditEventView from '../view/event-edit-view.js';
import { UserAction, UpdateType, EVENT_TYPES, getDefaultEvent } from '../const.js';

export default class NewEventPresenter {
  #container = null;
  #handleTripEventChange = null;
  #handleNewEventDestroy = null;
  #eventModel = null;
  #event = {};
  #eventTypes = EVENT_TYPES;
  #eventEditComponent = null;

  constructor({ container, onDataChange, onNewEventDestroy, eventModel }) {
    this.#event = getDefaultEvent();
    this.#eventModel = eventModel;
    this.#container = container;
    this.#handleTripEventChange = onDataChange;
    this.#handleNewEventDestroy = onNewEventDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    this.#eventEditComponent = new EditEventView({
      event: this.#event,
      offers,
      eventTypes: this.#eventTypes,
      destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleEventDeleteClick,
    });

    render(this.#eventEditComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleNewEventDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#eventEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
    this.#handleTripEventChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event,
    );
  };

  #handleEventDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
