import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';
import EditEventItemView from '../view/event-item-edit-view';
import { render, RenderPosition } from '../render';

export default class EventPresenter {
  eventListComponent = new EventListView;

  constructor({container}) {
    this.container = container;
  }

  renderEventList() {
    render(this.eventListComponent, this.container);
  }

  renderEditEventItem() {
    render(new EditEventItemView, this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  renderEventItem() {
    render(new EventItemView, this.eventListComponent.getElement());
  }

  init() {
    this.renderEventList();
    this.renderEditEventItem();

    for (let i = 0; i < 3; i++) {
      this.renderEventItem();
    }
  }
}
