import {CHANGE_TEXT, COL_RESIZE, ROW_RESIZE} from './types';

export function rootReducer(state, action) {
    let field;
    console.log('GGGGGGGGGGGGG')
    switch (action.type) {
        case COL_RESIZE:
            return {...state, colState: {...state.colState, ...value(state, field, action)}} // id, value
        case ROW_RESIZE:
            return {...state, rowState: {...state.rowState, ...value(state, field, action)}} // id, value
        case CHANGE_TEXT:
            field = 'dataState';
            return {...state, currentText: action.data.value, [field]: value(state, field, action)}
        default: return state;
    }
}


function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}
