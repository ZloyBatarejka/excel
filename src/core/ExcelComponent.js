import {DomListener} from './DomListener';
import './DomListener';

export class ExcelComponent extends DomListener {
    // Возвращает шаблон компонета
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = [];
        this.prepare()
    }
    toHTML() {
        return '';
    }
    /** настраиваем наш компонент до инит */
    prepare() {

    }
    /** добовляем дом слушатели */
    init() {
        this.initDOMListeners();
    }
    /** чистим */
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
    // уведомляем
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }
    // подписываемся на эвент
    $on(event, fn) {
       const unsub = this.emitter.subscribe(event, fn);
       this.unsubscribers.push(unsub);
    }
}
