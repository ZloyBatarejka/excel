import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './tableTemplate';
import {resizeHandler} from './resizeHandler';
export class Table extends ExcelComponent {
  static className = 'excel__table';
  static resizing = false;
  static resizeTarget = null;
  static startX = null;
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'mousemove']
    })
  }
    toHTML() {
        return createTable(25)
      }
      onMousedown(event) {
          resizeHandler(event, this.$root)
      }
      onMouseup() {
      }
      onMousemove(event) {
      }
}

