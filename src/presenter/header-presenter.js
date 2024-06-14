import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render';

export default class HeaderPresenter {
  #tripInfoComponent = new TripInfoView();
  #container = null;

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }
}
