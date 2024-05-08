import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';

export default class HeaderPresenterPresenter {
  tripInfoComponent = new TripInfoView;

  constructor({container}) {
    this.container = container;
  }

  renderTripInfo() {
    render(this.tripInfoComponent, this.container, RenderPosition.AFTERBEGIN);
  }

  init() {
    this.renderTripInfo();
  }
}
