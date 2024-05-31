import EventView from '../view/event-view';
import { render, replace, remove } from '../framework/render';
import EditEventView from '../view/event-edit-view';
import { updateItem } from '../utils';
import { Mode } from '../const';

export default class EventPresenter {
  #container = null;
  #eventModel = null;
  #event = null;

  #eventItemView = null;
  #editEventView = null;

  #handleTripEventChange = null;
  #handleEditMode = null;

  #mode = Mode.DEFAULT;

  constructor({ container, eventModel, onEventUpdate, onModeChange }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#handleTripEventChange = onEventUpdate;
    this.#handleEditMode = onModeChange;
  }

  init(event) {
    this.#event = event;
    this.#renderEventItemView(this.#event);
  }

  destroy() {
    remove(this.#eventItemView);
    remove(this.#editEventView);

    this.#eventItemView = null;
    this.#editEventView = null;

    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  resetView() {
    if (this.#mode === Mode.EDIT) {
      this.#switchToViewMode();
    }
  }

  #switchToEditMode() {
    this.#handleEditMode();
    replace(this.#editEventView, this.#eventItemView);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.EDIT;
  }

  #switchToViewMode() {
    replace(this.#eventItemView, this.#editEventView);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToViewMode();
    }
  };

  #renderEventItemView(event) {
    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    const prevEventView = this.#eventItemView;


    const onEditClick = () => this.#switchToEditMode();
    const onFormSubmit = () => this.#switchToViewMode();
    const onFormCancel = () => this.#switchToViewMode();

    this.#eventItemView = new EventView({
      event,
      offers,
      destinations,
      onEditClick: onEditClick,
      onFavoriteClick: () => {
        const updatedEvent = updateItem(event, { isFavorite: !event.isFavorite });
        this.#handleTripEventChange(updatedEvent);
      }
    });

    this.#editEventView = new EditEventView({
      event,
      offers,
      destinations,
      onFormSubmit: onFormSubmit,
      onFormCancel: onFormCancel,
    });

    if (prevEventView === null) {
      render(this.#eventItemView, this.#container);
      return;
    }
    replace(this.#eventItemView, prevEventView);
  }
}
