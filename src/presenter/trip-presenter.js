import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import { remove, render } from '../framework/render';
import EmptyListView from '../view/empty-list-view';
import { isEmpty, sortEvents, filter } from '../utils';
import { DEFAULT_FILTER_TYPE, FilterTypes, SortType, UpdateType, UserAction } from '../const';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';
import LoadingMessageView from '../view/loading-message-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #sortView = null;
  #emptyListView = null;
  #filterType = DEFAULT_FILTER_TYPE;
  #handleNewPointDestroy = null;
  #activePresenter = null;
  #loadingMessageComponent = new LoadingMessageView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({ container, eventModel, filterModel, onNewEventDestroy }) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#eventListComponent = new EventListView();
    this.#handleNewPointDestroy = onNewEventDestroy;


    this.#newEventPresenter = new NewEventPresenter({
      eventModel: this.#eventModel,
      container: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onEventDestroy: this.#handleNewPointDestroy,
    });

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[this.#filterType](events);
    const sortedEvents = sortEvents(filteredEvents, this.#currentSortType);
    return sortedEvents;
  }

  init() {
    this.#clearEventList();
    this.#eventsRendering();
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);

    if (this.#activePresenter) {
      this.#activePresenter.destroy();
    }

    const tripEventsElement = document.querySelector('.trip-events__list');

    if (tripEventsElement === null) {
      render(this.#eventListComponent, this.#container);
    }

    if (this.#newEventPresenter !== null) {
      remove(this.#emptyListView);
    }

    this.#newEventPresenter.init();
    this.#activePresenter = this.#newEventPresenter;
  }

  #handleSortTypeChange = (nextSortType) => {
    this.#currentSortType = nextSortType;
    this.init();
  };

  #clearEventList() {
    remove(this.#emptyListView);
    this.#emptyListView = null;

    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortView);

    this.#sortView = null;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());

    if (this.#activePresenter && this.#activePresenter !== this.#newEventPresenter) {
      this.#activePresenter.resetView();
      this.#activePresenter = null;
    } else if (this.#activePresenter === this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#activePresenter = null;
    }
  };

  #loadingMessageRendering() {
    render(this.#loadingMessageComponent, this.#container);
  }

  #eventsRendering() {
    if (isEmpty(this.events) && this.#isLoading !== true) {

      this.#emptyListView = new EmptyListView({ filterType: this.#filterType });
      render(this.#emptyListView, this.#container);
      return;
    }

    if (this.#isLoading) {
      this.#loadingMessageRendering();
      return;
    }

    this.#sortView = new SortView({
      sortTypes: this.#eventModel.sortTypes,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortView, this.#container);
    render(this.#eventListComponent, this.#container);

    this.events.forEach((event) => {
      const eventPresenter = new EventPresenter({
        event,
        eventModel: this.#eventModel,
        container: this.#eventListComponent.element,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#handleModeChange,
      });

      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    });
  }

  #handleViewAction = async (actionType, updateType, update) => {

    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#eventModel.updateEvent(updateType, update);
        } catch {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventModel.addEvent(updateType, update);
        } catch {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        try {
          await this.#eventModel.deleteEvent(updateType, update);
        } catch {
          this.#eventPresenters.get(update.id).setAborting();
        }
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#eventsRendering();
        break;
      case UpdateType.MAJOR:
        this.#clearEventList();
        this.#eventsRendering();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingMessageComponent);
        this.#eventsRendering();
        break;
    }
  };
}
