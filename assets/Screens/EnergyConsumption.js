import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,FlatList} from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import {Dimensions} from 'react-native';
import { useState,useEffect}from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

function EnergyConsumption(){

  const [IsReady, SetIsReady] = useState(false);
  const [count, setCount] = useState(0);
  const [day, setDay] = useState(0);

  const EnergyRateArray = [
    { name: 'Air Conditioner', value: 318},
    { name: 'Air Purifier', value: 100},
    { name: 'UV Light', value: 96 * count},
    { name: 'Nail Gel Remover', value: 72},
    { name: 'Desktop PC', value: 200},
    { name: 'Wifi', value: 20},
    { name: 'Vaccum', value: 120},
    { name: 'Card Reader', value: 0.5},
    { name: 'Light', value: 300},
    { name: 'Towel Warmer', value: 100},
    { name: 'Time Card', value: 10},
  ];

  const date = new Date().toLocaleDateString();
  const ElectricityPrices = 25.620; // 25.620/kwh 
  const ac = 318; // 318 watts/h
  const airPurifier = 100;
  const uvLight = 96;
  const gelRemover = 72;
  const PC = 200;
  const wifi = 20;
  const vaccum = 120;
  const cardReader = 0.5;
  const light = 300; 
  const towelWarmer = 100;
  const timeCard = 10;
  const AverageCustomer = (count/day) * 100;

  const WattsPerAppointment = (uvLight * 1) + (gelRemover * 0.5) + (vaccum * 0.5);
  const WattsPerday = (ac * 8) + (airPurifier * 8) + (PC * 8) + (wifi * 8) + (cardReader * 8) + (light * 8) + (towelWarmer * 8) + (timeCard * 8);

  const totalCost = ((WattsPerday/1000) * ElectricityPrices * day) + ((WattsPerAppointment/1000) * ElectricityPrices * count);
  const roundedTotalCost = totalCost.toFixed(0);
  const PredictedCost = ((WattsPerday/1000) * ElectricityPrices * 30) + ((WattsPerAppointment/1000) * ElectricityPrices * AverageCustomer);
  const roundedPredictedCost = PredictedCost.toFixed(0)

  const isFocused = useIsFocused();

  useEffect(() => {
      loadCount();
  },[isFocused])

  const loadCount = async () => {
    const storedCount = await AsyncStorage.getItem('count');
    if (storedCount !== null) {
      setCount(parseInt(storedCount));
    }
    const storedDay = await AsyncStorage.getItem('day');
    if (storedDay !== null) {
      setDay(parseInt(storedDay));
    }
    console.log(storedCount);
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
    <View style = {styles.flContainer}>
    <Text style = {styles.itemText}>{item.name}</Text>
    <Text style = {styles.itemText}>{item.value * count} w/h</Text>
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
        <Text style = {styles.priceStatusStyle}>Energy Price Status</Text>
        <View style = {styles.PriceHeader}>
        <Text style = {styles.HeaderText}>¥ {roundedTotalCost}</Text>
        <Text style = {styles.dateStyle}>{date}</Text>
        </View>
        <Text style = {styles.ppTextStyle}>Predicted Price: ¥{roundedPredictedCost}</Text>
        </View>
        <View style = {styles.flatList}>
        <Text style = {styles.BalancHeader}>Energy Usage</Text>
        <View>
        <FlatList
        height = {height/2.25}
        ItemSeparatorComponent={ItemDivider}
        data={EnergyRateArray}
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
  },
  ppTextStyle:
  {
    fontSize:height * 0.018,
    fontFamily:'Poppins-Regular',
    color:colors.background
  }
})

export default EnergyConsumption;