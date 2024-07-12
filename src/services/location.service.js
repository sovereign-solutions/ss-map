import Client from '../helper/http.helper';

const header = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.5',
    authorization: 'bearer fKIJF2UvlIKPM-IlkE3yd6Tk5uya8E6OVLPpnqo-eYPjYWQzPfdvwzwoL1TVds-fZl2b5LvSXtg3IMbROtPLoIrGi163WryrQeQLegcYumUFi5LGrEAEZkJlZ9HMHlK_DRRm6hf8NfBCj6L_epOARDpA5pUwuh7SjR_g8wN6mwPPxTiKn50HwWYq5UBK8yxPaNP9ZFyQLVApvktdJ59EoP5Ws-SK7wrDaHaJaA7q5AX1mZ98pUEhks0qta-iOTTjpNjFticFU5gTWDBE7f88uZUVwcoeBme120HaW6DaNvwq18Ih8qMYTBoB5UIRdrGPORwtWIYKs7VeYj_SdDMtoPyZqwNyvpEAOWDiUseuhevGK6vxiHJXxsoLH6iiTUXF6fDfRy2OGHpbXp8PmLkNbo29a7P1IRZwYXRn_ws4FwK5d5fRb20w-T3qp4ZIDoc8Fryed5pzaJW_8uxQY0f3RvjAv_WkXZ9L5lB1MfnES2xGwlYY0rbUktGahSfZX8YU_uf5Ig',
    Connection: 'keep-alive',
    'content-type': 'application/json',
};

export class LocationService
{
    client = new Client();

    constructor(apiURL = 'https://c4i2.gisx.vn')
    {
        this.apiURL = apiURL;
    }


    gets = () =>
    {
        return this.client.get(`${this.apiURL}/api/locations/gets`, header);
    };

    get = (id) =>
    {
        return this.client.get(`${this.apiURL}/api/locations/get?id=${id}`, header);
    };

    add = (location) =>
    {
        return this.client.post(`${this.apiURL}/api/locations`, location, header);
    };

    getLocationDataByGeo = async (lng, lat) =>
    {
        return this.client.get(`${this.apiURL}/api/locations/get-data-by-geo?lng=${lng}&lat=${lat}`, header);
    };

    searchGeoLocation = async (data) =>
    {
        const header = new Headers({
            'Content-Type': 'application/json',
            'Authorization': global.ss_authorization,
        });
        return this.client.post('https://testing.grow-matic.com/api/app-base/geo-locations/search', data, header);
    }
}
