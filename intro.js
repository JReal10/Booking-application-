import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { SafeAreaView,TouchableOpacity, ImageBackground} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from './assets/Colors/colors';
import {AppLoading} from 'expo-app-loading';
import {useState} from 'react';
import { Dimensions } from 'react-native';
import useFonts from './assets/Hooks/useFonts';

const { width, height } = Dimensions.get('window');

export default function intro({navigation}){  

  const [IsReady, SetIsReady] = useState(false);// initialize state variable refreshing with true

  //A function to load fonts
  const FetchFonts = async () => {
    await useFonts();
  };

  //Loads the font if React Hook "isReady" is true, if not displays loading screen till it's true.
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => SetIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});