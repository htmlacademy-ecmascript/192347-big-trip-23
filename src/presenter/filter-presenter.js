import FilterView from '../view/filter-view';
import { render } from '../render';

export default class FilterPresenterPresenter {
  filterComponent = new FilterView;

  constructor({container}) {
    this.container = container;
  }

  renderFilter() {
    render(this.filterComponent, this.container);
  }

  init() {
    this.renderFilter();
  }
}
