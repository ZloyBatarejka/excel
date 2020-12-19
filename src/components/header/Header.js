import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';
import {changeTitle} from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {ActiveRoute} from '../../core/router/ActiveRoute';


export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const button = event.target.dataset.action;
    if (button === 'exit') {
      ActiveRoute.navigate('');
    }
    if (button === 'delete') {
      localStorage.removeItem(`excel:${ActiveRoute.param}`);
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
        <input class="input" type="text" value="${title}"/>
        <div>
            <div class="button">
                <i class="material-icons" data-action="delete">delete</i>
            </div>
            <div class="button">
                <i class="material-icons" data-action="exit">exit_to_app</i>
            </div>
        </div>
    `
  }
}
