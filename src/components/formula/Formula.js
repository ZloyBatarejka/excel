import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula';
    constructor($root) {
      super($root, {
        name: 'Formula',
      })
    }
    toHTML() {
        return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>
        `
      }
}