export function draggable(node: HTMLElement) {
    let x;
    let y;

    function handleMousedown(event: MouseEvent | TouchEvent) {
        if (event.type === 'touchstart') {
            const touch = (event as TouchEvent).touches[0];
            x = touch.clientX;
            y = touch.clientY;
        } else {
            x = (event as MouseEvent).clientX;
            y = (event as MouseEvent).clientY;
        }

        node.dispatchEvent(new CustomEvent('dragstart', {
            detail: { x, y }
        }));

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
        window.addEventListener('touchmove', handleMousemove, { passive: false });
        window.addEventListener('touchend', handleMouseup);
    }

    function handleMousemove(event: MouseEvent | TouchEvent) {
        let clientX = 0;
        let clientY = 0;

        if (event.type === 'touchmove') {
            event.preventDefault(); // Prevent scrolling while dragging
            const touch = (event as TouchEvent).touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (event as MouseEvent).clientX;
            clientY = (event as MouseEvent).clientY;
        }

        const dx = clientX - x;
        const dy = clientY - y;
        x = clientX;
        y = clientY;

        node.dispatchEvent(new CustomEvent('dragmove', {
            detail: { x, y, dx, dy }
        }));
    }

    function handleMouseup(event: MouseEvent | TouchEvent) {
        if (event.type === 'touchend') {
            const touch = (event as TouchEvent).changedTouches[0];
            x = touch.clientX;
            y = touch.clientY;
        } else {
            x = (event as MouseEvent).clientX;
            y = (event as MouseEvent).clientY;
        }

        node.dispatchEvent(new CustomEvent('dragend', {
            detail: { x, y }
        }));

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
        window.removeEventListener('touchmove', handleMousemove);
        window.removeEventListener('touchend', handleMouseup);
    }

    node.addEventListener('mousedown', handleMousedown);
    node.addEventListener('touchstart', handleMousedown, { passive: false });

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
            node.removeEventListener('touchstart', handleMousedown);
        }
    };
}
