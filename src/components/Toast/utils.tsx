import { Platform } from 'react-native';

export function isIOS()
{
    return Platform.OS === 'ios';
}

export function getTestId(elementName: string)
{
    return `toast${elementName}`;
}
  
export function mergeIfDefined(
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>,
)
{
    const newObj = {
        ...obj1,
    };
    Object.entries(obj2).forEach(([key, value]) =>
    {
        if (value !== null && value !== undefined)
        {
            newObj[key] = value;
        }
    });
    return newObj;
}
  

export function upperBound(n: number, max: number)
{
    return n > max ? max : n;
}
  
export function lowerBound(n: number, min: number)
{
    return n < min ? min : n;
}
  
export function bound(n: number, min: number, max: number)
{
    return upperBound(lowerBound(n, min), max);
}
  

export const noop = () => undefined;


function additiveInverseArray(arr: number[])
{
    return arr.map((i) => -i);
}
  
export { additiveInverseArray };
  
