import EventListView from "../view/event-list-view";
import EventItemView from "../view/event-item-view";
import SortView from "../view/sort-view";
import FilterView from "../view/filter-view";
import EditEventItemView from "../view/event-item-edit-view";
import TripInfoView from "../view/trip-info-view";
import { render, RenderPosition } from "../render";



export default class MainPresenter {
  eventListComponent = new EventListView;

  constructor({container}) {
    this.container = container;

    this.sitePageBodyElement = document.querySelector('.page-body');
    this.siteTripMainElement = this.sitePageBodyElement.querySelector('.trip-main');
    this.siteControlsFiltersElemet = this.siteTripMainElement.querySelector('.trip-controls__filters');

    this.siteTripEventsElement = this.sitePageBodyElement.querySelector('.trip-events');
  

  }
  renderTripInfo() {
    render(new TripInfoView, this.siteTripMainElement, RenderPosition.AFTERBEGIN);
  }
  renderFilter() {
    render(new FilterView, this.siteControlsFiltersElemet);
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

 
  renderSort() {
    render(new SortView, this.siteTripEventsElement);
  }
  
  init() {
    this.renderTripInfo();
    this.renderFilter();
    this.renderSort();
    this.renderEventList();
    this.renderEditEventItem();

    for (let i = 0; i < 3; i++) {
      this.renderEventItem();  
    }
  }
}

