import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is requires');
        }
        this.$placeholder = $(selector);
        this.routes = routes;
        this.changePageHanlder = this.changePageHanlder.bind(this);
        this.init();
        this.page = null;
    }

    init() {
        window.addEventListener('hashchange', this.changePageHanlder)
        this.changePageHanlder();
    }

    async changePageHanlder() {
        if (this.page) {
            this.page.destroy();
        }
        this.$placeholder.clear();
        const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;
        this.page = new Page(ActiveRoute.param);
        const root = await this.page.getRoot();
        this.$placeholder.append(root);
        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHanlder)
    }
}
