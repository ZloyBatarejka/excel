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

class StateProcessor {
    constructor(client, delay = 300) {
        this.client = client;
        this.listen = debounce(this.listen.bind(this), delay);
    }
    listen(state) {
        this.client.save(state)
    }

    get() {
        return this.client.get()
    }
}

class LocalStorageClient {
    constructor(name) {
        this.name = storageName(name);
    }

    save(state) {
        storage(this.name, state);
        return Promise.resolve();
    }

    get() {
        return Promise.resolve(storage(this.name))
    }
}

export class ExcelPage extends Page {
    constructor(param) {
        super(param);
        this.storeSub = null;
        this.processor = new StateProcessor(new LocalStorageClient(this.params));
    }
    async getRoot() {
        const state = await this.processor.get();
        const store = createStore(rootReducer, normolizeInitialState(state));
        this.storeSub = store.subscribe(this.processor.listen);
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
        this.storeSub.unsubscribe();
    }
}
