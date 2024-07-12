import { LocationService } from "./location.service.js";

export class SearchService
{
    searchGeoLocation = async (searchKey: string, skip: number, take: number,
        lat: number, long: number, _lx: number, _ly: number, _rx: number, _ry: number) =>
    {
        const data = {
            skip: skip,
            take: take,
        };
        if (typeof searchKey === 'string' && searchKey)
        {
            if (searchKey.includes('*'))
            {
                Object.assign(data, {
                    searchKey: searchKey,
                });
            }
            else
            {
                const matches = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(searchKey);
                if (matches && matches.length)
                {
                    Object.assign(data, {
                        searchKey: searchKey,
                    });
                }
                else
                {
                    Object.assign(data, {
                        searchKey: `*${searchKey}*`,
                    });
                }
            }
        }
        return new LocationService().searchGeoLocation(data)
        .then(async res =>
            {
                // if (isNaN(lat) || isNaN(long))
                // {
                    // return Promise.resolve(res?.data);
                // }
                // else
                // {
                //     return Promise.resolve(this.searchGeoCodeLocation(lat, long));
                // }
                // console.log('res',res);
                if (res)
                {
                    return Promise.resolve(res);
                }
                else
                {
                    return Promise.resolve({ docs: [] });
                }
            }).catch((error) =>
            {
                return Promise.resolve({ docs: [] });
            });
    
    }
}
