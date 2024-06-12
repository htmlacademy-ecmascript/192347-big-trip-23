import EventListView from '../view/event-list-view';
import SortView from '../view/sort-view';
import { remove, render } from '../framework/render';
import EmptyListView from '../view/empty-list-view';
import { isEmpty, sortEvents, filter, sortEventsBy } from '../utils';
import { DEFAULT_FILTER_TYPE, FilterTypes, SortType, UpdateType, UserAction } from '../const';
import EventPresenter from './event-presenter';
import NewEventPresenter from './new-event-presenter';


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


  constructor({ container, eventModel, filterModel, onNewEventDestroy}) {
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
    console.log(this.events);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#newEventPresenter.init();
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

    // remove(this.#eventListComponent);
    remove(this.#sortView);

    this.#sortView = null;
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #eventsRendering() {
    if (isEmpty(this.events)) {
      console.log('this.events', this.events);
      this.#emptyListView = new EmptyListView({ filterType: this.#filterType });
      render(this.#emptyListView, this.#container);
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
    }
  };
}
