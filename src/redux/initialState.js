import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '../core/utils';

export function normolizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}

export const z = 4;

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

