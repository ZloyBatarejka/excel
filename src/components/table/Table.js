import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './tableTemplate';
import {resizeHandler} from './resizeHandler';
import {TableSelection} from './TableSelection';
import {shouldResize, isCell, matrix, nextSelector} from './table.utils';
import {$} from '@core/dom';
import * as actions from '../../redux/actions';
import {initialState} from '../../redux/initialState';
import {defaultStyles} from '../../constants';


export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
    toHTML() {
        return createTable(25, initialState);
      }
      prepare() {
        this.selection = new TableSelection();
      }
      init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('fomula:input', text => {
          this.selection.current.text(text);
          this.updateTextInStore(text);
        });
        this.$on('formula:enter', () => {
          this.selection.current.focus();
        });
        this.$on('toolbar:applyStyle', (style) => {
          this.selection.applyStyle(style);
        });
      }
      async resizeTable(event) {
        try {
          const data = await resizeHandler(event, this.$root);
          if (data.type === 'col') {
            this.$dispatch(actions.colResize(data));
          } else {
            this.$dispatch(actions.rowResize(data));
          }
        } catch (e) {
          console.warn('resizeWarn', e);
        }
      }
      onMousedown(event) {
        if (shouldResize(event)) {
          this.resizeTable(event);
        } else if (isCell(event)) {
          const $target = $(event.target)
          if (event.shiftKey) {
            const $cells = matrix(this.selection.current, $target).map(id=>this.$root.find(`[data-id="${id}"]`));
            this.selection.selectGroup($cells);
          } else {
            this.selectCell($target);
          }
        }
      }
      selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        console.log($cell.getStyles(Object.keys(defaultStyles)))
      }
      onKeydown(event) {
        const {key} = event;
        const keys = [
          'Enter',
          'Tab',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown'
        ]
        if (keys.includes(key) && !event.shiftKey) {
          event.preventDefault();
          const id = this.selection.current.id(true);
          const $next = this.$root.find(nextSelector(key, id));
          this.selectCell($next);
        }
      }
      updateTextInStore(value) {
        this.$dispatch(actions.changeText({
          id: this.selection.current.id(),
          value: value
        }))
      }
      onInput(event) {
        this.updateTextInStore($(event.target).text());
      }
}

