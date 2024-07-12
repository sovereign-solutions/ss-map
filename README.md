# ss-map

ss-mapview for react native 

Example project: "https://github.com/sovereign-solutions/ss-map-example.git

## Installation

In package.json add:

```sh
"ss-map": "git://github.com/sovereign-solutions/ss-map.git"`

//add dependencies
"@react-native-mapbox-gl/maps": "8.5.0",
"react": "17.0.2",
"react-dom": "18.2.0",
"react-native": "0.66.5",
"i18next": "20.6.1",

"react-i18next": "11.12.0",
"react-native-geolocation-service": "5.3.1",
"react-native-gesture-handler": "1.10.3",
"react-native-permissions": "3.5.0",
"react-native-svg": "12.1.1",
"react-native-svg-transformer": "0.14.3",
```

### Android:

In android/build.gradle:

```
allprojects {
    repositories {
       // ...
        maven {
            url 'https://api.mapbox.com/downloads/v2/releases/maven'
            authentication {
                basic(BasicAuthentication)
            }
            credentials {
                username = 'mapbox'
                password = MAPBOX_SECRET
            }
        }
        maven {
            url "$rootDir/../node_modules/@notifee/react-native/android/libs"
        }
        // ...
    }
}
```

In AndroidManifest.xml add:

```
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### IOS:

In Podfile

```
    // ...
    permissions_path = '../node_modules/react-native-permissions/ios'
    pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways"
    pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse"
    // ...
    pre_install do |installer|
        $RNMBGL.pre_install(installer)
    end
    // ...
    post_install do |installer|
        $RNMBGL.post_install(installer)
    // ...
```

In info.plist add these keys and descriptions: NSLocationWhenInUseUsageDescription, NSLocationAlwaysAndWhenInUseUsageDescription, NSLocationAlwaysUsageDescription, NSMotionUsageDescription

## Usage
in project index.js add
```js
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoidG...'); // you mapbox key
```

```js
import { Map } from "ss-map";

// ...

<Map.AllProvider>
  <Map
    overrideParams={{ API_KEY: "ed54ebec-..." }} // use your sovereign solutions API_KEY 
    zoomLevel={14}
    hideUserLocation={false}
    floatingMyLocation
  ></Map>
</Map.AllProvider>;
// ...
```
