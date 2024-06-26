function debounce(func, wait, immediate) {
    let timeout;
    return function(){
        const context = this, args = arguments;
        const later = function(){
            timeout = null;
            if (!immediate) func.apply(context,args);
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later,wait);
        if (callNow) {
            func.apply(context,args);
        }
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context,args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit)
        }
    }
}

export {debounce,throttle};