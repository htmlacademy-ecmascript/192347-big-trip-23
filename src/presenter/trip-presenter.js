import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import { remove, render } from '../framework/render';
import EmptyListView from '../view/empty-list-view';
import { isEmpty, sortEvents, sortEventsBy, filter } from '../utils';
import { DEFAULT_FILTER_TYPE, SortType, UpdateType, UserAction } from '../const';
import EventPresenter from './event-presenter';


export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;
  #eventListComponent = null;
  #eventPresenters = new Map();
  // #events = [];
  #currentSortType = SortType.DAY;
  #sortView = null;
  #renderEmptyView = null;
  #filterType = DEFAULT_FILTER_TYPE;


  constructor({ container, eventModel, filterModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#eventListComponent = new EventListView();
    
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }
  
  get events() {
    this.#filterType = this.#filterModel.filter;
    console.log('filterModel', this.#filterModel);
    const events = this.#eventModel.events;
    

    const sortedEvents = sortEvents(events, this.#currentSortType);
    const filteredEvents = filter[this.#filterType](sortedEvents);
    console.log('filteredEvents', filteredEvents);
    return filteredEvents;
  }

  init() {
    this.#clearEventList();
    this.#renderEvents();
  }

  #handleSortTypeChange = (nextSortType) => {
    this.#currentSortType = nextSortType;
    this.init();
  };

  #clearEventList() {
    if (isEmpty(this.events)) {
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
    if (isEmpty(this.events)) {
      console.log('this.events',this.events);
      this.#renderEmptyView = new EmptyListView({filterType: this.#filterType});
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

    this.events.forEach((event) => {
      const eventPresenter = new EventPresenter({
        event,
        eventModel: this.#eventModel,
        container: this.#eventListComponent.element,
        onEventUpdate: this.#handleViewAction,
        onModeChange: this.#handleModeChange,
      });

      eventPresenter.init(event);
      this.#eventPresenters.set(event.id, eventPresenter);
    });
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда event добавлен в избранное)
        this.#clearEventList();
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearEventList();
        this.#renderEvents();
        break;
    }
  };
}
