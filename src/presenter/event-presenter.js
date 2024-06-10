import EventView from '../view/event-view';
import { render, replace, remove } from '../framework/render';
import EditEventView from '../view/event-edit-view';
import { Mode, UpdateType, UserAction } from '../const';

export default class EventPresenter {
  #container = null;
  #eventModel = null;
  #event = null;
  #updatedOffers = [];

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
    if (this.#mode === Mode.DEFAULT) {
      return;
    }
    this.#editEventView.reset(this.#event);
    this.#switchToViewMode();
  }

  #switchToEditMode() {
    this.#handleEditMode();
    replace(this.#editEventView, this.#eventItemView);

    document.addEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.EDIT;

  }

  #switchToViewMode() {
    this.#editEventView.reset(this.#event);
    replace(this.#eventItemView, this.#editEventView);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editEventView.reset(this.#event);
      this.#switchToViewMode();
    }
  };




  #handleSubmit = (event) => {
    this.#handleTripEventChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #renderEventItemView(event) {
    const destinations = this.#eventModel.destinations;
    const offers = this.#eventModel.offers;

    const prevEventView = this.#eventItemView;


    const onEditClick = () => this.#switchToEditMode();
    const onFormCancel = () => this.#switchToViewMode();

    this.#eventItemView = new EventView({
      event,
      offers,
      destinations,
      updatedOffers: this.#event.offers,
      onEditClick: onEditClick,
      onFavoriteClick: () => {
        this.#handleTripEventChange(
          UserAction.UPDATE_EVENT,
          UpdateType.MINOR,
          {...this.#event, isFavorite: !event.isFavorite},
        );
      }
    });

    this.#editEventView = new EditEventView({
      event,
      offers,
      destinations,
      onFormCancel: onFormCancel,
      onFormSubmit: this.#handleSubmit,
      onFormDelete: (event) => {
        this.#handleTripEventChange(
          UserAction.DELETE_EVENT,
          UpdateType.MINOR,
          event,
        );
      },
    });

    if (prevEventView === null) {
      render(this.#eventItemView, this.#container);
      return;
    }
    replace(this.#eventItemView, prevEventView);
  }
}
