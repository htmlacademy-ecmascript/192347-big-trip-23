import FilterView from '../view/filter-view';
import { render } from '../framework/render';

export default class FilterPresenterPresenter {
  #filterComponent = new FilterView();
  #container = null;

  constructor({container}) {
    this.#container = container;
  }

  init() {
    render(this.#filterComponent, this.#container);
  }
}
