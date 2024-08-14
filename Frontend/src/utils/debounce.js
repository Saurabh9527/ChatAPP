


export const debounce = (cl, delay) => {
    let timerId;
    return (...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(() =>{
            cl(...args)
        },delay)
    }
}