import {CHANGE_TEXT, COL_RESIZE, CHANGE_STYLES, ROW_RESIZE, APPLY_STYLE, CHANGE_TITLE} from './types';

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

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data: data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data: data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data: data
    }
}
