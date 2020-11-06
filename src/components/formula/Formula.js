import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';
    constructor($root, options) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'click', 'keydown'],
        ...options
      })
    }
    toHTML() {
        return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>
        `
    }
    init() {
      super.init();
      this.$formula = this.$root.find('.input')
      this.$on('table:select', $cell => {
       this.$formula.text($cell.text())
      })
      this.$on('table:input', $cell => {
        this.$formula.text($cell.text())
      })
    }
    onInput(event) {
      const text = $(event.target).text()
      this.$emit('fomula:input', text);
    }
    onClick() {
      console.log('click');
    }
    onKeydown(event) {
      const keys = ['Enter', 'Tab'];
      if (keys.includes(event.key)) {
        event.preventDefault();
        this.$emit('formula:enter');
      }
    }
}
