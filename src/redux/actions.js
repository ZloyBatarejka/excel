import {CHANGE_TEXT, COL_RESIZE, ROW_RESIZE} from './types';

export function colResize(data) {
    return {
        type: COL_RESIZE,
        data
    }
}

export function rowResize(data) {
    return {
        type: ROW_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data: data
    }
}
