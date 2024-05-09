function isIE() {
    const userAgent = navigator.userAgent;
    // IE 10 or older
    const msie = userAgent.indexOf("MSIE ");
    if (msie > 0) {
        return parseInt(userAgent.substring(msie+5, userAgent.indexOf('.',msie)), 10);
    }

    // IE 11
    const trident = userAgent.indexOf('Trident/');
    if (trident > 0) {
        const rv = userAgent.indexOf('rv:');
        return parseInt(userAgent.substring(rv+3, userAgent.indexOf('.',rv)), 10);
    }
    // if not IE or if IE version couldn't be determined
    return false;
}

export  {isIE};