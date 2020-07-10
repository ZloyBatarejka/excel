const CODES = {
    a: 65,
    z: 90
}

function toCell(content) {
    return `
        <div class="cell" contenteditable="true">${content}</div>
    `
}

function toColumn(col) {
    return `
            <div class="column">${col}</div>
    `
}

function createRow(index, content) {
    return `<div class="row">
                <div class="row-info">${index ? index : ''}</div>
                <div class="row-data">${content}</div> 
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

    const cells = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('')

    const rows = [];
    rows.push(createRow(null, cols))
    for (let i = 0; i<rowCounts; i++) {
        rows.push(createRow(i+1, cells))
    }
    return rows.join('');
}
