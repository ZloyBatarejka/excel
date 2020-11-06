const CODES = {
    a: 65,
    z: 90
}

// function toCell(content, col, row) {
    // return `
    //     <div class="cell" contenteditable="true" data-col=${col} data-row=${row}>${content}</div>
    // `
// }

function toCell(row) {
    return function(content, col) {
        return `
        <div class="cell" contenteditable="true" data-col=${col} data-id=${row}:${col} data-type="cell">${content}</div>
    `
    }
}

function toColumn(col, index) {
    return `
            <div class="column" data-type="resizable" data-col=${index}>
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>
    `
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" data-resize="row" ></div>` : '';
    return `<div class="row" data-type="resizable">
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

export function createTable(rowCounts = 15) {
    const colsCount = CODES.z-CODES.a + 1;
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')


    const rows = [];
    rows.push(createRow(null, cols))
    for (let row = 0; row<rowCounts; row++) {
        const cells = new Array(colsCount)
        .fill('')
        // .map((_, col)=>toCell(_, col, row))
        .map(toCell(row))
        .join('')
        rows.push(createRow(row+1, cells))
    }
    return rows.join('');
}
