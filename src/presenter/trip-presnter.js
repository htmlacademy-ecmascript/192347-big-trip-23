import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import { remove, render } from '../framework/render';
import EmptyListView from '../view/empty-list-view';
import { isEmpty, sortEvents } from '../utils';
import { SortType } from '../const';
import EventPresenter from './event-presenter';
import { updateData } from '../utils';

export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  #events = [];
  #currentSortType = SortType.DAY;
  #sortView = null;
  #renderEmptyView = null;


  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#eventListComponent = new EventListView();
  }

  init() {
    this.#clearEventList();
    this.#events = sortEvents(this.#eventModel.events, this.#currentSortType);
    this.#renderEvents(this.#eventModel);
  }

  #handleSortTypeChange = (nextSortType) => {
    this.#currentSortType = nextSortType;
    this.init();
  };

  #clearEventList() {
    if (isEmpty(this.#events)) {
      remove(this.#renderEmptyView);
      this.#renderEmptyView = null;
      return;
    }
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#eventListComponent);
    remove(this.#sortView);

    this.#sortView = null;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEvents() {
    if (isEmpty(this.#events)) {
      this.#renderEmptyView = new EmptyListView();
      render(this.#renderEmptyView, this.#container);
      return;
    }

    this.#sortView = new SortView({
      sortTypes: this.#eventModel.sortTypes,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortView, this.#container);
    render(this.#eventListComponent, this.#container);

    this.#events.forEach((event) => {
      const eventPresenter = new EventPresenter({
        event,
        eventModel: this.#eventModel,
        container: this.#eventListComponent.element,
        onEventUpdate: this.#handleDataChange,
        onModeChange: this.#handleModeChange,
      });

      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    });
  }

  #handleDataChange = (updatedItem) => {
    this.#events = updateData(this.#events, updatedItem);
    this.#eventPresenters.get(updatedItem.id).init(updatedItem);
  };
}
