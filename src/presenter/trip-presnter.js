import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import { render } from '../framework/render';
import EmptyListView from '../view/empty-list-view';
import { isEmpty } from '../utils';
import { DEFAULT_SORT_TYPE, DEFAULT_FILTER_TYPE } from '../const';
import EventPresenter from './event-presenter';
import { updateData } from '../utils';

export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  #events = [];

  constructor({ container, eventModel }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#eventListComponent = new EventListView();
  }

  init() {
    this.#events = this.#eventModel.events;
    this.#renderEventListView(this.#eventModel);
  }

  #renderSortView() {
    render(new SortView({ sortTypes: this.#eventModel.sortTypes, currentSortType: DEFAULT_SORT_TYPE }), this.#container);
  }

  #renderEmptyView() {
    render(new EmptyListView({ filterTypes: DEFAULT_FILTER_TYPE }), this.#container);
  }

  #renderEventListView() {
    if (isEmpty(this.#events)) {
      this.#renderEmptyView();
      return;
    }

    this.#renderSortView();
    render(this.#eventListComponent, this.#container);

    this.#events.forEach((event) => {
      const eventPresenter = new EventPresenter({
        event,
        eventModel: this.#eventModel,
        container: this.#eventListComponent.element,
        onEventUpdate: this.#handleDataChange,
        onEditMode: this.#resetAllViews,
      });

      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    });
  }

  #handleDataChange = (updatedItem) => {
    this.#events = updateData(this.#events, updatedItem);
    this.#eventPresenters.get(updatedItem.id).init(updatedItem);
  };

  #resetAllViews = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
