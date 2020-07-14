import {$} from '@core/dom'
import {shouldResize} from './table.utils'
export function resizeHandler(event, root) {
    if (shouldResize(event)) {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const cells = root.findAll(`[data-col="${$parent.data.col}"]`)
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right';
        $resizer.css({opacity: 1, [sideProp]: '-5300px'})
        let value = null;
        document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: -delta+'px'})
            document.onselect = e => e.preventDefault();
        } else {
            document.onselect = e => e.preventDefault();
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({bottom: -delta+'px'})
        }
        }
        document.onmouseup = () =>{
            document.onselect = null;
        if (type === 'col') {
        // $parent.css({
        //   width: value + 'px'
        // })
        cells.forEach(item=>item.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }

        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({opacity: 0, bottom: '0px', right: '0px'})
        }
    }
}

