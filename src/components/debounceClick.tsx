import { debounce } from 'lodash';

export const Debounce = (func: any, timeout: number) =>
{
    // let timer: any;
    // return (...args:any) =>
    // {
    //     clearTimeout(timer);
    //     timer = setTimeout(() =>
    //     {
    //         func.apply(this, args);
    //     }, timeout);
    // };
    return debounce(func, timeout);
};

export const Sleep = (ms: number) =>
{
    return new Promise(resolve => setTimeout(resolve, ms));
};
