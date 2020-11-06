import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './tableTemplate';
import {resizeHandler} from './resizeHandler';
import {TableSelection} from './TableSelection';
import {shouldResize, isCell, matrix, nextSelector} from './table.utils';
import {$} from '@core/dom';

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
        return createTable(25);
      }
      prepare() {
        this.selection = new TableSelection();
      }
      init() {
        super.init();
        this.selectCell(this.$root.find('[data-id="0:0"]'));
        this.$on('fomula:input', text => {
          this.selection.current.text(text);
          console.log(this.selection.current.text())
        });
        this.$on('formula:enter', () => {
          this.selection.current.focus();
        });
      }
      onMousedown(event) {
        if (shouldResize(event)) {
          resizeHandler(event, this.$root)
        } else if (isCell(event)) {
          const $target = $(event.target)
          if (event.shiftKey) {
            const $cells = matrix(this.selection.current, $target).map(id=>this.$root.find(`[data-id="${id}"]`));
            this.selection.selectGroup($cells);
          } else {
            this.selection.select($target);
          }
        }
      }
      selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
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
      onInput(event) {
        this.$emit('table:input', $(event.target))
      }
}

