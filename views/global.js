import {isIE} from "./common/jsTool/browser";
import myAjax from "./common/jsTool/myAjax";
import {debounce,throttle} from "./common/jsTool/debounce";

global.isIE = isIE;
global.throttle = throttle;
global.debounce = debounce;
global.myAjax = myAjax;
global.PubSub=PubSub;
global.permissions=[];