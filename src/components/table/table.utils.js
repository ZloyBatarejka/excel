export function shouldResize(event) {
    return !!event.target.dataset.resize
}
export function isCell(event) {
    return event.target.dataset.type==='cell'
}
export function range(start, end) {
    if (start>end) {
        [start, end] = [end, start]
    }
    return new Array(end-start+1)
        .fill('')
        .map((_, index)=>start+index)
}
export function matrix($current, $target) {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
    const ids = cols.reduce((acc, col)=>{
        rows.forEach(row=>acc.push(`${row}:${col}`))
        return acc;
    }, [])
    return ids;
}
export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0;
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++;
            break
        case 'Tab':
        case 'ArrowRight':
            col++;
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break
    }
    return `[data-id="${row}:${col}"]`
}
