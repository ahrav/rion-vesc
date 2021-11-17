import React, {useContext} from 'react';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Polyline, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext';

const Map = () => {
  const {
    state: {currentLocation, locations},
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{marginTop: 200}} />;
  }

  const initialLocation = {
    longitude: -118.44924,
    latitude: 34.06258,
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        ...initialLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Circle
        center={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        radius={10}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline
        strokeWidth={2}
        coordinates={locations.map(loc => {
          return {
            latitude: loc.latitude,
            longitude: loc.longitude,
          };
        })}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1.2,
  },
});

export default Map;
