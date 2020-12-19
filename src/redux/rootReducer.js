
import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, COL_RESIZE, ROW_RESIZE, UPDATE_DATE} from './types';

export function rootReducer(state, action) {
    let field;
    let val;
    switch (action.type) {
        case COL_RESIZE:
            return {...state, colState: {...state.colState, ...value(state, field, action)}}; // id, value
        case ROW_RESIZE:
            return {...state, rowState: {...state.rowState, ...value(state, field, action)}}; // id, value
        case CHANGE_TEXT:
            field = 'dataState';
            return {...state, currentText: action.data.value, [field]: value(state, field, action)};
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data};
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            });
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            };
        case CHANGE_TITLE:
            return {...state, title: action.data};
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()};
        default: return state;
    }
}


function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}
