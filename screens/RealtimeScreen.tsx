import React, {useContext, useCallback} from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';

import {Text, View, TextInput} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Context as LocationContext} from '../context/LocationContext';
import {metersToMPH} from '../utils/conversion';
import useLocation from '../hooks/useLocation';

const RealtimeScreen = ({navigation}: RootTabScreenProps<'Realtime'>) => {
  const {
    state: {currentLocation},
    addLocation,
  } = useContext(LocationContext);
  const speed =
    currentLocation && currentLocation.speed > 0
      ? Math.round(metersToMPH(currentLocation.speed)).toString()
      : '0';

  const callback = useCallback(location => {
    addLocation(location[0]);
  }, []);
  const [err] = useLocation(callback);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/rion.png')}
          style={{justifyContent: 'center', height: 100, width: 200}}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={{
            justifyContent: 'flex-end',
            fontSize: 100,
            alignContent: 'flex-end',
            height: 85,
          }}
          value={speed}
          keyboardType="numeric"
        />
        <Text
          style={{
            fontSize: 30,
            height: 35,
          }}
        >
          mph
        </Text>
      </View>
      {/* <View style={styles.input2}>
        <TextInput
          style={{
            justifyContent: 'center',
            height: 60,
            fontSize: 75,
            alignContent: 'flex-start',
            backgroundColor: 'blue',
          }}
          value="133"
          keyboardType="numeric"
        />
        <TextInput
          style={{
            justifyContent: 'center',
            fontSize: 75,
            height: 60,
            alignContent: 'flex-end',
            backgroundColor: 'blue',
          }}
          value="233"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.input3}>
        <Text
          style={{
            fontSize: 20,
            height: 35,
            backgroundColor: 'orange',
          }}
        >
          A
        </Text>
        <Text
          style={{
            fontSize: 20,
            height: 35,
            backgroundColor: 'orange',
          }}
        >
          °F
        </Text>
      </View> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: Dimensions.get('window').height / 14,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  input: {
    height: Dimensions.get('window').height / 2.5,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    // flex: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  // input2: {
  //   flex: 2,
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   justifyContent: "space-around",
  //   backgroundColor: "green",
  // },
  // input3: {
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   justifyContent: "space-around",
  //   backgroundColor: "red",
  // },
});

export default RealtimeScreen;
