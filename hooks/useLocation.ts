import {useState, useEffect} from 'react';
import RNLocation from 'react-native-location';

import {useIsFocused} from '@react-navigation/native';

export default (callback: any) => {
  const [err, setErr] = useState(null);
  RNLocation.configure({
    distanceFilter: 1.0,
  });

  useEffect(() => {
    const startWatching = () => {
      try {
        RNLocation.requestPermission({
          ios: 'whenInUse', // or 'always'
          android: {
            detail: 'coarse', // or 'fine'
            rationale: {
              title: 'We need to access your location',
              message: 'We use your location to show where you are on the map',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        }).then(granted => {
          if (!granted) {
            throw new Error('Location permission not granted');
          }
          RNLocation.subscribeToLocationUpdates(location => {
            callback(location);
          });
        });
      } catch (e) {
        setErr(e);
      }
    };

    startWatching();
  }, [callback]);

  return [err];
};
