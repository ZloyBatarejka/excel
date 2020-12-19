import {Page} from '../core/router/Page';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {createStore} from '@core/createStore'
import {rootReducer} from '../redux/rootReducer';
import {debounce, storage} from '../core/utils';
import {normolizeInitialState} from '../redux/initialState.js';

function storageName(param) {
    return 'excel:' + param;
}

export class ExcelPage extends Page {
    getRoot() {
        console.log(this.params)
        const params = this.params || Date.now().toString();
        const state = storage(storageName(this.params));
        const store = createStore(rootReducer, normolizeInitialState(state));
        const stateListener = debounce(state => {
           storage(storageName(params), state);
        }, 300)

        store.subscribe(stateListener)
        this.excel = new Excel({
           components: [Header, Toolbar, Formula, Table],
           store: store
        });

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
