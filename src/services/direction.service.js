import AwesomeDebouncePromise from 'awesome-debounce-promise';

import Client from '../helper/http.helper';

import { CommonHelper } from '../helper/common.helper';
import { LocationService } from './location.service';
// import storage from '../components/storage/mmkv';

const header = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.5',
    // authorization: 'bearer ' + (storage.getString('USER_TOKEN') ?? '9QZctbLajaMJtONgg9I9_tlMdphZ7Tpq1swVdUuCTiMOKq_dLrxututTS-bF0VdBDGoPZ-H3-x8KqVL-GrQCMhGRDyQdtvrFujX7i5Z6oFmMyC3sUAgpWbUA4hcz1IYYxzGOBhVYG_vOZjbDv8lHHhqJhpdU5hH_1FcYNw3xjkp07EInwpdtZQlfrXOc2AYdVgo1jVhmUTXCNfevnFCug7p4cc53pRf4onk6uZRifsGD_RFcy7Qmq4uci6CI1qF62pvnMqxqOkPa0oavPwBhZBnesQ30NKZM9ctBO1xzoCv3ph-dT91LIH7I2cgF2hcD_9OXKRa7ZFvH682A-Py9sfdpiCYR_jZkWlKmX0FVkiSMn-IOyt8HX53-5MJUrk568XQXghqPORlC0vVvhUSgGfIgN8D1GywtsZUBhXxXn7jFo50HvAZxVJoLnV_Judb-uF0KlQ'),
    authorization: global.ss_authorization,
    Connection: 'keep-alive',
    'content-type': 'application/json',
};

const ROUTE_DIRECTIONS =
    {
        Directions: {
            'straight': 0,
            'left': 1,
            'right': 2,
            'slight left': 3,
            'slight right': 4,
            'sharp left': 5,
            'sharp right': 6,
            'uturn': 7,
        },
        Actions: {
            'turn': 't',
            'continue': 'c',
            'new name': 'nn',
            'depart': 'd',
            'arrive': 'a',
            'merge': 'm',
            'on ramp': 'or',
            'off ramp': 'ofr',
            'fork': 'f',
            'end of road': 'eor',
            'roundabout': 'rb',
            'rotary': 'ro',
            'roundabout turn': 'rt',
            'notification': 'notif',
            'exit roundabout': 'exrb',
            'exit rotary': 'exro',
        },
    };

export class DirectionService
{
    client = new Client();

    constructor(apiURL = 'https://bando.tphcm.gov.vn/')
    {
        // this.apiURL = storage.getString('BASE_URL') ? (storage.getString('BASE_URL') + '/') : (apiURL);
        this.apiURL = global.ss_baseUrl ?? apiURL;

    }


    async searchLocation(key, lx, ly, rx, ry)
    {
        let data = {};
        // header.authorization = `bearer ${storage.getString('USER_TOKEN')}`;
        header.authorization = global.ss_authorization;
        this.apiURL = global.ss_baseUrl;
        await this.client.get(`${this.apiURL}api/locations/search?keyword=${key}&lx=${lx}&ly=${ly}&rx=${rx}&ry=${ry}&skip=0&limit=20`, header).then((res) =>
        {

            data = res.docs;
        });

        return data;
    }


    searchAll = (text, lx, ly, rx, ry) => this.client.get(`${this.apiURL}api/locations/search?keyword=${text}&lx=${lx}&ly=${ly}&rx=${rx}&ry=${ry}&skip=0&limit=20`, header).then((data) =>
    {
        if (data && data.docs && data.docs.length)
        {
            data.docs.forEach((loc) =>
            {
                loc.address = this.getAddress(loc);
                loc.shortAddress = this.getShortAddress(loc);
                loc.oriThumbnail = loc.thumbnail;
                loc.thumbnail = this.getThumbnail(loc.thumbnail);
                loc.provider = loc.providerType;
                if (!loc.name)
                {
                    loc.name = loc.address;
                    loc.address = loc.shortAddress = '';
                }
            });
        }
        return data;
    });


    getAddress(item)
    {
        let address = [
            [item.floor, item.building, item.number].filter((s) => s && s !== '').join(', '),
            [item.street, item.ward, item.district, item.province].filter((s) => s && s !== '').join(', '),
        ].filter((s) => s && s !== '').join(' ');

        if (!address.trim() && item.longitude && item.latitude)
        {
            address = `${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)}`;
        }

        return address;
    }

    getShortAddress(item)
    {
        let shortAddress = [item.number, item.street].filter((s) => s && s !== '').join(' ');

        if (!shortAddress.trim())
        {
            shortAddress = this.getAddress(item);
        }

        return shortAddress;
    }

    getThumbnail(thumbnail)
    {
        if (thumbnail && thumbnail !== 'UPLOADFOLDER/icon.bmp')
        {
            return 'http://vietbando.com/' + thumbnail;
        }
        else
        {
            return '';
        }
    }


    addBarrier = (user, type, loc) => this.client.get(`/api/barrier?user=${user}&type=${type}&loc=${loc}`).then((res) =>
    {
        return res && res.status === 200 && res.barrier_id !== null && res.barrier_id !== '';
    });

    removeBarrier = (user) => this.client.get(`/api/barrier?user=${user}&clr=true`).then((res) =>
    {
        return res && res.status === 200;
    });

    getRouteAvoidBarrier = (locs, veh, crit, user, isAvoidBarrier, step = 1) =>
    {
        // header.authorization = `bearer ${storage.getString('USER_TOKEN')}`;
        header.authorization = global.ss_authorization;
        this.apiURL = global.ss_baseUrl;
        return this.client.get(`${this.apiURL}api/viaroute?locs=${CommonHelper.coordsEncode(locs, 6)}&veh=${veh}&crit=${crit}&geom=1&steps=${step}&user=${user}&barr=${isAvoidBarrier ? 1 : 0}`, header).then((res) =>
        {
            if (res.status !== 200)
            {
                switch (res.status)
                {
                    case 210:
                        return 'Unsupported vehicle type';
                    case 207:
                        return 'No solution found';
                    case 208:
                        return 'One of the coordinates could not snap to street segment';
                    default:
                        return 'false';
                }
            }
            else
            {
                const replaceAt = function (text, index, replacement)
                {
                    return text.substr(0, index) + replacement + text.substr(index + replacement.length);
                };

                const cv = function (oj)
                {
                    for (const key in oj)
                    {
                        if (typeof (oj[key]) === 'object' && !Array.isArray(oj[key]))
                        {
                            cv(oj[key]);
                        }
                        let newKey = replaceAt(key, 0, key[0].toUpperCase());
                        let i = key.indexOf('_');
                        if (i !== -1 && i !== key.length - 1)
                        {
                            newKey = replaceAt(newKey, i + 1, newKey[i + 1].toUpperCase());
                        }
                        oj[newKey] = oj[key];
                        delete oj[key];
                        i = -1;
                    }
                };

                // decode Geometry
                if (res.routes && res.routes.length)
                {
                    let oriOrder = 1;
                    for (const route of res.routes)
                    {
                        cv(route);
                        if (route && route.Geometry)
                        {
                            route.Geometry = CommonHelper.coordsDecode(route.Geometry, 6);
                            // need reformat [lat, lng] => [lng, lat]
                            route.Geometry.forEach((coord) =>
                            {
                                coord.reverse();
                            });

                            route.oriOrder = oriOrder;
                            oriOrder++;
                        }
                    }
                }
                return res.routes;
            }
        }).catch((err) =>
        {
            console.error('getRouteAvoidBarrier:', err);
        });
    };

    getRouteOSRM = (locs, vehicleType = 3, alternatives = false, steps = true) =>
    {
        if (locs && locs[0] && locs[0].Latitude)
        {
            for (let i = 0; i < locs.length; i++)
            {
                locs[i] = [locs[i].Latitude, locs[i].Longitude];
            }
        }
        const inputLocs = locs.map((loc) => `${loc[1]},${loc[0]}`).join(';');

        let vehicleParam = 'driving';
        switch (vehicleType)
        {
            case 0:
                vehicleParam = 'foot';
                break;
            case 2:
                vehicleParam = 'bike';
                break;
            case 3:
            case 5:
                vehicleParam = 'car';
                break;
        }

        return this.client.get(`${this.apiURL}api/osrmRoute/route/v1/${vehicleParam}/${inputLocs}?alternatives=${alternatives}&steps=${steps}&overview=simplified`, header).then((res) =>
        {
            // console.log(res);
            if (!res || res.code !== 'Ok')
            {
                return;
            }
            else
            {
                const returnRoutes = [];
                const routeTemplate = {
                    Geometry: [],
                    Steps: {
                        Distances: [],
                        Durations: [],
                        Indices: [0],
                        Names: [],
                        Turns: [],
                    },
                    Via_Distances: [0],
                    Via_Durations: [0],
                    Via_Indices: [0],
                };

                if (res.routes && Array.isArray(res.routes))
                {
                    // Many alternative ways => many routes
                    for (const route of res.routes)
                    {
                        const routeObj = Object.assign({}, routeTemplate);
                        let legIndicesLength = 0;

                        // Decode overview geometry
                        if (!steps && route.geometry)
                        {
                            const decodedGeometry = CommonHelper.coordsDecode(route.geometry, 5);
                            // need reformat [lat, lng] => [lng, lat]
                            decodedGeometry.forEach((coord) =>
                            {
                                coord.reverse();
                            });
                            routeObj.Geometry.push(...decodedGeometry);
                            // routeObj.Geometry = _uniq(routeObj.Geometry);
                        }

                        // Many locations => many legs
                        // const legNum = locs.length > 2 ? locs.length : locs.length - 1;
                        for (let index = 0; index < locs.length - 1; index += 1)
                        {
                            // console.log(index, route.legs, route.legs[index]);
                            const leg = route.legs[index];
                            // Add distance & duration
                            routeObj.Via_Distances.push(leg.distance);
                            routeObj.Via_Durations.push(leg.duration);

                            // Coords
                            leg.steps.forEach((step) =>
                            {
                                // Add location to Geometry
                                // routeObj.Geometry.push(step.maneuver.location);

                                // Decode the step geometry again to get the step index
                                const decodedGeometry = CommonHelper.coordsDecode(step.geometry, 5);
                                if (steps)
                                {
                                    // const decodedGeometry = CommonHelper.coordsDecode(step.geometry, 5);
                                    // need reformat [lat, lng] => [lng, lat]
                                    decodedGeometry.forEach((coord) =>
                                    {
                                        coord.reverse();
                                    });
                                    routeObj.Geometry.push(...decodedGeometry);
                                    routeObj.Steps.Indices.push(routeObj.Geometry.length);
                                    // routeObj.Geometry = _uniq(routeObj.Geometry);
                                }
                                else
                                {
                                    legIndicesLength += decodedGeometry.length;
                                    routeObj.Steps.Indices.push(legIndicesLength);
                                }

                                // Building steps
                                routeObj.Steps.Distances.push(step.distance);
                                routeObj.Steps.Durations.push(step.duration);
                                routeObj.Steps.Names.push(step.name);
                                let turnType = 0;

                                // Turn type mapping to custom types
                                turnType = `${ROUTE_DIRECTIONS.Actions[step.maneuver.type]}-${ROUTE_DIRECTIONS.Directions[step.maneuver.modifier]}`;

                                routeObj.Steps.Turns.push(turnType);
                            });
                            if (!steps)
                            {
                                routeObj.Via_Indices.push(legIndicesLength);
                            }
                            else
                            {
                                routeObj.Via_Indices.push(routeObj.Geometry.length - 1);
                            }
                        }
                        // console.log(routeObj);

                        returnRoutes.push(routeObj);
                    }
                }
                return returnRoutes;
            }
        });
    };

    reverseGeocode = (lng, lat) => new LocationService().getLocationDataByGeo(lng, lat).then((loc) =>
    {
        loc = loc.data;

        if (lng && lat)
        {
            const geo = {
                ...loc,
                longitude: lng, // use the position from request, not what return from server
                latitude: lat,
            };

            geo.address = this.getAddress((loc && Object.keys(loc).length) ? loc : geo);
            geo.shortAddress = this.getShortAddress((loc && Object.keys(loc).length) ? loc : geo);

            geo.name = geo.name || geo.shortAddress;

            return geo;
        }

        return null;
    });

    async searchGeoCodeLocation(lat, long)
    {
        const body = {
            'latitude': lat,
            'longitude': long,
        };
        // header.authorization = `bearer ${storage.getString('USER_TOKEN')}`;
        header.authorization = global.ss_authorization;
        this.apiURL = global.ss_baseUrl;
        const url = `${this.apiURL}api/app-base/geo-locations/reverse-geocode`;
        return this.client.post(url, body, header).then(res =>
        {
            return res.data;
        });
    }

    getRouteAvoidBarrierDebounced = AwesomeDebouncePromise(this.getRouteOSRM, 200);
    searchAllDebounced = AwesomeDebouncePromise(this.searchAll, 200);
}

