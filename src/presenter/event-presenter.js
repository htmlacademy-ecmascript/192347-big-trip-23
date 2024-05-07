import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-view';
import SortView from '../view/sort-view';
import { render } from '../render';
import { getDefaultEvent } from '../const';
import EditEventView from '../view/event-edit-view';

export default class EventPresenter {
  eventListComponent = new EventListView;
  eventSortComponent = new SortView;

  constructor({ container, eventModel }) {
    this.container = container;
    this.eventModel = eventModel;
  }

  init() {
    render(this.eventSortComponent, this.container);
    render(this.eventListComponent, this.container);
    const events = this.eventModel.getEvents();
    const destinations = this.eventModel.getDestinations();
    const offers = this.eventModel.getOffers();

    render(new EditEventView(getDefaultEvent(), destinations, offers), this.eventListComponent.getElement());
    render(new EditEventView(events[1], destinations, offers), this.eventListComponent.getElement());
    for (const event of events) {
      render(new EventItemView(event, destinations, offers), this.eventListComponent.getElement());
    }
    // что лучше использовать?
    // events.forEach((event) => {
    //   render(new EventItemView(event, destinations, offers), this.eventListComponent.getElement());
    // });
  }
}
