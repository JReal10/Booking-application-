import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Dimensions,FlatList} from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import {useWindowDimensions} from 'react-native';
import { useState,useEffect}from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

function Revenue({navigation}){

  const {height, width} = useWindowDimensions();
  const [IsReady, SetIsReady] = useState(false);
  const [count, setCount] = useState(0);
  const [Revenue,setRevenue] = useState([]);
  const vat = 0.08;

  const totalPriceCalc = () => 
  {
    let total = 0;
    let totalVat = 0;

    for (let i = 0; i < Revenue.length; i++) {
      const item = Revenue[i];
      total += item.value;
      totalVat += item.value * vat;
    }
    return total - totalVat;
  }

  const date = new Date().toLocaleDateString();

  const isFocused = useIsFocused();

  useEffect(() => {
      loadCount();
  },[isFocused])

  const loadCount = async () => {
    const storedCount = await AsyncStorage.getItem('count');
    if (storedCount !== null) {
      setCount(parseInt(storedCount));
    }
    const storedRev = await AsyncStorage.getItem('Revenue');
    if (storedRev !== null) {
      setRevenue(JSON.parse(storedRev));
    };
  };

  const FetchFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => SetIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const renderItem = ({ item }) => (
    <View>
    <View style = {styles.flContainer}>
    <Text style = {styles.itemText}>{item.name}</Text>
    <Text style = {styles.itemText}>¥{item.value}</Text>
    </View>
    <View style = {styles.flContainer2}>
    <Text style = {styles.itemText}>{item.date}</Text>
    </View>
    </View>
  );

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#00000030",
        }}
      />
    );
  }

  return (
    <View style ={styles.Container}>
      <SafeAreaView style = {styles.SafeAreaView} height = {height}>
        <View style ={styles.PriceContainer} height = {height/4} marginVertical = {height * 0.025} marginHorizontal = {width * 0.025}>
        <Text style = {styles.priceStatusStyle}>Total Revenue</Text>
        <View style = {styles.PriceHeader}>
        <Text style = {styles.HeaderText}>¥{totalPriceCalc()}</Text>
        <Text style = {styles.dateStyle}>{date}</Text>
        </View>
        </View>
        <View style = {styles.flatList}>
        <Text style = {styles.BalancHeader}>Appointment History</Text>
        <View>
        <FlatList
        height = {height/2.25}
        ItemSeparatorComponent={ItemDivider}
        data={Revenue}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        />
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create
({
  Container:
  {
    flex:1,
  },
  SafeAreaView:
  {
    backgroundColor:colors.background,
  },
  PriceHeader:
  {
    alignItems:'center'
  },
  HeaderText:
  {
    fontSize:height * 0.05,
    fontFamily:'Poppins-Medium',
    color:colors.background
  },
  flContainer:
  {
    flexDirection:'row',
    justifyContent:'space-between',
    padding: height * 0.01,
  },
  flContainer2:
  {
    padding: height * 0.01,
  },
  flatList:
  {
    marginHorizontal:width * 0.02,
    justifyContent:'flex-start',
  },
  PriceContainer:
  {
    justifyContent:'space-evenly',
    backgroundColor: colors.secondary_green,
    borderRadius:8,
    paddingHorizontal:width * 0.05
  },
  itemText:
  {
    fontSize:height * 0.02,
    fontFamily:'Poppins-Regular',
    color:colors.text_brown
  },
  BalancHeader:
  {
    fontSize:height * 0.025,
    paddingVertical: height * 0.015,
    fontFamily:'Merriweather-Regular',
    color:colors.text_brown,
    
  },
  priceStatusStyle:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:height * 0.02,
    color:colors.background
  },
  dateStyle:
  {
    fontSize:height * 0.018,
    fontFamily:'Poppins-Regular',
    color: "#FFFFFF99"
  }
})

export default Revenue;