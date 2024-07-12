import { PermissionsAndroid } from 'react-native';
// import storage from '../components/storage/mmkv';
import DirectionV3 from '../data/direction-v3.json';

export class CommonHelper
{

    static coordsDecode(str, precision)
    {
        let index = 0;
        let lat = 0;
        let lng = 0;
        const coordinates = [];
        let shift = 0;
        let result = 0;
        let byte = null;
        let latitude_change,
            longitude_change;
        const factor = Math.pow(10, Number.isInteger(precision) ? precision : 6);

        // Coordinates have variable length when encoded, so just keep
        // track of whether we've hit the end of the string. In each
        // loop iteration, a single coordinate is decoded.
        while (index < str.length)
        {
            // Reset shift, result, and byte
            byte = null;
            shift = 0;
            result = 0;

            do
            {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            }
            while (byte >= 0x20);

            latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

            shift = result = 0;

            do
            {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            }
            while (byte >= 0x20);

            longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

            lat += latitude_change;
            lng += longitude_change;

            coordinates.push([lat / factor, lng / factor]);
        }

        return coordinates;
    }

    static coordsEncode(coordinates, precision)
    {
        // convert poins to coords
        if (coordinates && coordinates[0] && coordinates[0].Latitude)
        {
            for (let i = 0; i < coordinates.length; i++)
            {
                coordinates[i] = [coordinates[i].Latitude, coordinates[i].Longitude];
            }
        }

        function py2_round(value)
        {
            // Google's polyline algorithm uses the same rounding strategy as Python 2, which is different from JS for negative values
            return Math.floor(Math.abs(value) + 0.5) * (value >= 0 ? 1 : -1);
        }

        function encode(current, previous, factor)
        {
            current = py2_round(current * factor);
            previous = py2_round(previous * factor);
            let coordinate = current - previous;
            coordinate <<= 1;
            if (current - previous < 0)
            {
                coordinate = ~coordinate;
            }
            let output = '';
            while (coordinate >= 0x20)
            {
                output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
                coordinate >>= 5;
            }
            output += String.fromCharCode(coordinate + 63);
            return output;
        }

        if (!coordinates.length)
        {
            return '';
        }

        const factor = Math.pow(10, Number.isInteger(precision) ? precision : 6);
        let output = encode(coordinates[0][0], 0, factor) + encode(coordinates[0][1], 0, factor);

        for (let i = 1; i < coordinates.length; i++)
        {
            const a = coordinates[i];
            const b = coordinates[i - 1];
            output += encode(a[0], b[0], factor);
            output += encode(a[1], b[1], factor);
        }

        return output;
    }

    static toDictionary = (array, key, value) =>
    {
        const dict = {};
        array.forEach((item) =>
        {
            if (item[key])
            {
                dict[item[key]] = value ? item[value] : item;
            }
        });
        return dict;
    };
    static translateDirectionV3 = (dir) =>
    {
        // // const USER_LANGUAGE = storage.getString('USER_LANGUAGE') ?? 'vi';
        const USER_LANGUAGE = global.ss_lang ?? 'en';
        dir = parseInt(dir);
        const direction = DirectionV3.Data.find((o) => o.code === dir);
        return direction ? direction[USER_LANGUAGE] : '';
    };

    static getFormatDuration(seconds, isGetSecond = true)
    {
        const hText = 'hr ';
        const mText = 'min ';
        const sText = 's ';

        if (seconds != null)
        {
            seconds = Number(seconds);

            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor((seconds % 3600) % 60);

            const hDisplay = h > 0 ? h + hText : ' ';
            const mDisplay = m > 0 ? m + mText : ' ';
            const sDisplay = s > 0 ? s + sText : ' ';

            let res = hDisplay + mDisplay + (isGetSecond ? sDisplay : '');
            if (!res)
            {
                res = sDisplay;
            }

            return res;
        }

        return '';
    }

    static getFormatDistance(meter, fixed)
    {

        if (meter >= 1000)
        {
            meter = meter / 1000;
            return meter?.toFixed(fixed || 1) + ' km';
        }

        return meter?.toFixed(fixed || 1) + ' m';


    }

    static getDistance({ X: lon1, Y: lat1 }, { X: lon2, Y: lat2 })
    {
        const R = 6371; // radius of earth, km (change this constant to get miles)
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.cos((lat1 * Math.PI) / 180), 2) * Math.pow(Math.sin(dLon / 2), 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d * 1000; // meters
    }

    static getCoordinateBetweenTwoCoordinatesWithDistance = ({ X: startX, Y: startY }, { X: endX, Y: endY }, length) =>
    {
        const xDist = endX - startX;
        const yDist = endY - startY;
        const dist = this.getDistance({ X: startX, Y: startY }, { X: endX, Y: endY });
        const fractionOfTotal = length / dist;

        return {
            X: startX + xDist * fractionOfTotal,
            Y: startY + yDist * fractionOfTotal,
        };
    };

    static drawArrow(coords)
    {
        const des = coords[coords.length - 1];
        const ori = coords[coords.length - 2];

        const dLon = des[0] - ori[0];
        const dLat = des[1] - ori[1];
        const angle = 180 + (Math.atan2(dLon, dLat) * 180) / Math.PI;

        return {
            coords: coords,
            angle: angle,
            des: des,
        };
    }

    static getDirectionIconV3(dir)
    {
        switch (parseInt(dir, 10))
        {
            case 0:
                return 'direction_continue'; // "Không rẽ";
            case 1:
                return 'direction_continue_straight'; // "Đi thẳng";
            case 2:
                return 'direction_turn_slight_right'; // "Hướng sang phải";
            case 3:
                return 'direction_turn_right'; // "Rẽ phải";
            case 4:
                return 'direction_turn_sharp_right'; // "Vòng sang phải";
            case 5:
                return 'direction_uturn'; // "Quay đầu";
            case 6:
                return 'direction_turn_sharp_left'; // "Vòng sang trái";
            case 7:
                return 'direction_turn_left'; // "Rẽ trái";
            case 8:
                return 'direction_turn_slight_left'; // "Hướng sang trái";
            case 9:
                return 'direction_arrive_straight'; // "Đến điểm trung gian";
            case 10:
                return 'direction_turn_straight'; // "Đi vào";
            case 11:
                return 'direction_roundabout'; // "Vào vòng xoay";
            case 12:
                return 'direction_depart_straight'; // "Rời vòng xoay";
            case 13:
                return 'direction_rotary'; // "Bám vòng xoay";
            case 14:
                return 'direction_turn_straight'; // "Đi từ cuối đường";
            case 15:
                return 'direction_arrive'; // "Đến đích";
            default:
                return '';
        }
    }

    static getDirectionIconOSRM(dir)
    {
        const breakDir = dir.split('-');
        const action = breakDir[0];
        const direction = parseInt(breakDir[1], 10);

        switch (true)
        {
            case direction === 0 && action === 'c':
                return 'direction_continue_straight'; // "Đi thẳng";
            case direction === 0 || action === 'c':
                return 'direction_continue'; // "Không rẽ";
            case direction === 4:
                return 'direction_turn_slight_right'; // "Hướng sang phải";
            case direction === 2:
                return 'direction_turn_right'; // "Rẽ phải";
            case direction === 6:
                return 'direction_turn_sharp_right'; // "Vòng sang phải";
            case direction === 7:
                return 'direction_uturn'; // "Quay đầu";
            case direction === 5:
                return 'direction_turn_sharp_left'; // "Vòng sang trái";
            case direction === 1:
                return 'direction_turn_left'; // "Rẽ trái";
            case direction === 3:
                return 'direction_turn_slight_left'; // "Hướng sang trái";
            case action === 'a':
                return 'direction_arrive'; // "Đến đích";
            case action === 'rb':
            case action === 'rt':
                return 'direction_roundabout'; // "Vào vòng xoay";
            case action === 'exrb':
            case action === 'exro':
                return 'direction_depart_straight'; // "Rời vòng xoay";
            case action === 'ro':
                return 'direction_rotary'; // "Bám vòng xoay";
            case action === 'eor':
                return 'direction_turn_straight'; // "Đi từ cuối đường";
            default:
                return 'direction_turn_straight'; // "Đi vào";
        }
    }

    // static translateDirectionOSRM(dir)
    // {
    //     const breakDir = dir.split('-');
    //     const action = DirectionOSRM.Actions.find(a => a.code === breakDir[0]);
    //     const direction = DirectionOSRM.Directions.find(d => d.code === parseInt(breakDir[1]));
    //     // console.log(breakDir, DirectionOSRM.Directions.find(d => d.code === parseInt(breakDir[1])), direction);
    //
    //     if (action)
    //     {
    //         let returnDir = action[this.appStore.contexts.i18n?.language?.substr(0, 2)];
    //         if (direction)
    //         {
    //             returnDir += ` ${direction[this.appStore.contexts.i18n?.language?.substr(0, 2)]}`;
    //         }
    //
    //         return returnDir;
    //     }
    //     return '';
    // }

    static getArrayCoordinatesWithLength = (arrCoordinates, reqLength, reverse) =>
    {
        let resCoordinates = [];

        if (arrCoordinates && arrCoordinates.length)
        {
            let curLength = 0;
            if (reverse)
            {
                arrCoordinates = JSON.parse(JSON.stringify(arrCoordinates)).reverse(); // need reverse because length we want is distance to end point
            }

            let lastCoord = arrCoordinates[0];
            resCoordinates.push(lastCoord);

            for (let i = 1; i < arrCoordinates.length; i++)
            {
                if (arrCoordinates[i])
                {
                    const start = { X: lastCoord[0], Y: lastCoord[1] };
                    const end = { X: arrCoordinates[i][0], Y: arrCoordinates[i][1] };

                    const lengthOfThisStep = this.getDistance(start, end);

                    if (curLength + lengthOfThisStep > reqLength)
                    {
                        const lengthOfThisStepShouldAdd = reqLength - curLength;

                        const middleCoord = this.getCoordinateBetweenTwoCoordinatesWithDistance(start, end, lengthOfThisStepShouldAdd);

                        // push middle coordinate instead of end point to limit length of path
                        resCoordinates.push([middleCoord.X, middleCoord.Y]);
                        break;
                    }
                    else // length of path still not enough required
                    {
                        lastCoord = arrCoordinates[i];
                        curLength += lengthOfThisStep;
                        resCoordinates.push(arrCoordinates[i]);
                    }
                }
            }
        }

        if (reverse)
        {
            resCoordinates = resCoordinates.reverse();
        }

        return resCoordinates;
    };

    static drawDirectionArrow = (fullPathCoords, step) =>
    {
        let arrowCoords = [];

        // start calculate array coordinates for arrow of this step
        if (step.start !== -1)
        {
            const leftCoordinates = fullPathCoords.slice(Math.max(0, step.start - 20), step.start + 1);
            const rightCoordinates = fullPathCoords.slice(step.start, Math.min(step.start + 20, fullPathCoords.length));

            // let point = rightCoordinates[0];
            // new mapboxgl.Marker().setLngLat([point[0], point[1]]).addTo(map);

            let left = 50;
            let right = 50;

            if (step.start < 5)
            {
                left = 0;
                right = 100;
            }

            const leftArrowCoordinates = this.getArrayCoordinatesWithLength(leftCoordinates, left, true /* side left */);
            const rightArrowCoordinates = this.getArrayCoordinatesWithLength(rightCoordinates, right, false /* side right */);

            arrowCoords = [...leftArrowCoordinates, ...rightArrowCoordinates];
        }
        else // destination point
        {
            // let fullPathCoords = fullPathCoords[fullPathCoords.length - 1];
            const arrCoordinates = fullPathCoords.slice(fullPathCoords.length - 40, fullPathCoords.length + 1);

            arrowCoords = this.getArrayCoordinatesWithLength(arrCoordinates, 100, 1 /* side left */);
        }

        return arrowCoords;
    };

    static getPointBettwenTwoCoordinates(coord1, coord2)
    {
        midX = (coord1[0] + coord2[0]) / 2;
        midY = (coord1[1] + coord2[1]) / 2;
        return [midX, midY];
    }

    static getDistanceByCoords(coord1, coord2)
    {
        const R = 6371; // radius of earth, km (change this constant to get miles)
        const dLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
        const dLon = ((coord2[0] - coord1[0]) * Math.PI) / 180;
        const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.cos((coord1[1] * Math.PI) / 180), 2) * Math.pow(Math.sin(dLon / 2), 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d * 1000; // meters
    }

    static formatter = (val) =>
    {
        if (val >= 1000000)
        {
            return (val / 1000000).toFixed(2) + ' triệu';
        }
        else if (val >= 1000)
        {
            return (val / 1000).toFixed(2) + ' nghìn';
        }
        else
        {
            return val.toFixed(2);
        }
    };

    static isUrl = (str) =>
    {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    };

    static requestLocationPermission = async () =>
    {
        try
        {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Need more permission',
                    message:
                        'Please grant Location permission to use this featrue.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Grant',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (err)
        {
            console.warn(err);
            return false;
        }
    };
}
