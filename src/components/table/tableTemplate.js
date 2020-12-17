const CODES = {
    a: 65,
    z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(row, state ) {
    return function(content, col) {
        content = state.dataState[`${row}:${col}`] || '';
        return `
        <div 
        class="cell" 
        contenteditable="true" 
        data-col=${col} 
        data-id=${row}:${col} 
        data-type="cell" 
        style="width: ${getWidth(state.colState, col)}">${content}</div>
    `
    }
}

function toColumn({col, index, width}) {
    return `
            <div class="column" data-type="resizable" data-col=${index} 
            style="width: ${width}">
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>
    `
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH ) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT ) + 'px';
}

function withWidthFrom(state) {
    return function(col, index) {
        return {col, index, width: getWidth(state, index)}
    }
}

function createRow(index, content, rowState) {
    const resize = index ? `<div class="row-resize" data-resize="row" ></div>` : '';
    return `<div class="row" data-type="resizable" data-row="${index}" style="height: ${getHeight(rowState, index)}">
                <div class="row-info" data-row="${index}" >
                ${index ? index : ''}
                ${resize}
                </div>
                <div class="row-data" data-row="${index}">${content}</div> 
            </div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.a + index);
}

export function createTable(rowCounts = 15, state) {
    const colsCount = CODES.z-CODES.a + 1;
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state.colState))
    .map(toColumn)
    .join('')


    const rows = [];
    rows.push(createRow(null, cols, state.rowState))
    for (let row = 0; row<rowCounts; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
        rows.push(createRow(row+1, cells, state.rowState))
    }
    return rows.join('');
}
