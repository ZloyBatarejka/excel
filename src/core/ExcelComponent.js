import {DomListener} from './DomListener';
import './DomListener';

export class ExcelComponent extends DomListener {
    // Возвращает шаблон компонета
    constructor($root, options ={}) {
        super($root, options.listeners)
        this.name = options.name || ''
    }
    toHTML() {
        return '';
    }
    init() {
        this.initDOMListeners()
    }
    destroy() {
        this.removeDOMListeners();
    }
}
