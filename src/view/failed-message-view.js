import AbstractView from '../framework/view/abstract-view';

const createFailedMessageTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class FailedMessageView extends AbstractView {
  get template() {
    return createFailedMessageTemplate();
  }
}