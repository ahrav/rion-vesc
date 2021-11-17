import React, {useContext} from 'react';
import {StyleSheet, FlatList, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, Button} from 'react-native-elements';
import MapView, {Polyline} from 'react-native-maps';

import Map from '../components/Map';
import {Context as LocationContext} from '../context/LocationContext';
import {Text, View} from '../components/Themed';

const StatsScreen = () => {
  const {
    state: {topSpeed, avgSpeed, distance},
  } = useContext(LocationContext);
  // const { startRecording, stopRecording } = useContext(LocationContext);
  const escData = [
    {name: 'escTempMax', value: '87', shortName: '°F'},
    {name: 'escAmpMax', value: '221', shortName: 'A'},
    {name: 'motorTempMax', value: '98', shortName: '°F'},
    {name: 'motorAmpMax', value: '339', shortName: 'A'},
  ];
  const rideData = [
    {name: 'Top Speed', value: topSpeed, shortName: 'MPH'},
    {name: 'Avg Speed', value: avgSpeed, shortName: 'MPH'},
    {name: 'Distance', value: distance.toFixed(1), shortName: 'Miles'},
    {name: 'Wh/Mi', value: '49'},
    {name: 'Duration', value: '22:10'},
  ];
  const numColumns = 2;

  return (
    <SafeAreaView style={{flex: 1, ...StyleSheet.absoluteFillObject}}>
      <Map />
      {/* <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} /> */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 2}}>
        <View
          style={{
            backgroundColor: '#303030',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <View
            style={{
              height: Dimensions.get('window').width / 3,
              alignItems: 'center',
              margin: 2,
              borderRadius: 5,
              justifyContent: 'center',
              width: Dimensions.get('window').width / 2.05,
            }}
          >
            <Text style={styles.text}>{rideData[0].name}</Text>
            <Text style={styles.text}>{rideData[0].value}</Text>
            <Text style={styles.text}>{rideData[0].shortName}</Text>
          </View>
          <FlatList
            data={rideData.slice(1)}
            style={{flex: 1}}
            keyExtractor={item => item.name}
            numColumns={numColumns}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    height: Dimensions.get('window').width / 6.05,
                    alignItems: 'center',
                    margin: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width / 4.15,
                  }}
                >
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.value}</Text>
                  <Text style={styles.text}>
                    {item.shortName && item.shortName}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#303030',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <FlatList
            data={escData}
            style={{flex: 1}}
            keyExtractor={item => item.name}
            numColumns={numColumns}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    height: Dimensions.get('window').width / 2.98,
                    alignItems: 'center',
                    margin: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    width: Dimensions.get('window').width / 4.1,
                  }}
                >
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.value}</Text>
                  <Text style={styles.text}>{item.shortName}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 1,
    fontSize: 14,
  },
});

export default StatsScreen;
