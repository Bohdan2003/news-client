export const onShowTransitionGroupItem= (e) => {
    e.style.height = `${e.scrollHeight}px`;
    e.style.transform = 'none';       
    e.style.opacity = `1`;
}

export const onHiddenTransitionGroupItem = (e) => {
    e.style.height = `0px`;
    e.style.transform = 'rotateX(-90deg)';
    e.style.opacity = `0`;
}

export const getTime = (date) => date.slice(11).replace(/\-/g, ":");

export const getDay = (date) => date.slice(8,10);

export const getMonth = (date) => date.slice(5,7);

export const transformMonth = (month) => {
    switch(month){
        case '01':
            return 'січень'
        case '02':
            return 'лютий'
        case '03':
            return 'березень'
        case '04':
            return 'квітень'
        case '05':
            return 'травень'
        case '06':
            return 'червень'
        case '07':
            return 'липень'
        case '08':
            return 'серпень'
        case '09':
            return 'вересень'
        case '10':
            return 'жовтень'
        case '11':
            return 'листопад'
        case '12':
            return 'грудень'
        default:
            return 'error'                   
    }      
};

export const transformDate = (date) => {
    return `${getDay(date)} ${transformMonth(getMonth(date)).toUpperCase()} ${getTime(date)}`
};

export const disabled = (e) => {
    e.target.setAttribute('disabled', true);
}

export const checkIsMatchesWidth = (width) => {
    return window.matchMedia(`(max-width:${width}px)`).matches;
}


