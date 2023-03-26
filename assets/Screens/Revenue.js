import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity,FlatList,StatusBar,TextInput, Dimensions } from 'react-native';
import colors from '../Colors/colors';
import AppLoading from 'expo-app-loading';
import useFonts from '../Hooks/useFonts';
import {useWindowDimensions} from 'react-native';
import { useState,useEffect}from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Revenue({navigation}){

  const {height, width} = useWindowDimensions();
  const [IsReady, SetIsReady] = useState(false);
  const [count, setCount] = useState(0);
  const [days, setDays] = useState(5);

  const EnergyRateArray = [
    { name: 'Air Conditioner', value: 318 * days },
    { name: 'Air Purifier', value: 100 * days},
    { name: 'UV Light', value: 96 * count},
    { name: 'Nail Gel Remover', value: 72 * count},
    { name: 'Desktop PC', value: 200 * days},
    { name: 'Wifi', value: 20 * days},
    { name: 'Vaccum', value: 120 * count},
    { name: 'Card Reader', value: 0.5 * days},
    { name: 'Light', value: 300 * days},
    { name: 'Towel Warmer', value: 100 * days},
    { name: 'Time Card', value: 10 * days},
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
  const AverageCustomer = (count/days) * 100;

  const WattsPerAppointment = (uvLight * 1) + (gelRemover * 0.5) + (vaccum * 0.5);
  const WattsPerday = (ac * 8) + (airPurifier * 8) + (PC * 8) + (wifi * 8) + (cardReader * 8) + (light * 8) + (towelWarmer * 8) + (timeCard * 8);

  const totalCost = ((WattsPerday/1000) * ElectricityPrices * days) + ((WattsPerAppointment/1000) * ElectricityPrices * count);
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
    fontSize:'48',
    fontFamily:'Poppins-Medium',
    color:colors.background
  },
  flContainer:
  {
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 10,
  },
  flatList:
  {
    marginHorizontal:10,
    justifyContent:'flex-start',
  },
  PriceContainer:
  {
    justifyContent:'space-evenly',
    backgroundColor: colors.secondary_green,
    borderRadius:8,
    paddingHorizontal:'5%'
  },
  itemText:
  {
    fontSize:18,
    fontFamily:'Poppins-Regular',
    color:colors.text_brown
  },
  BalancHeader:
  {
    fontSize:24,
    paddingVertical: 10,
    fontFamily:'Merriweather-Regular',
    color:colors.text_brown,
    
  },
  priceStatusStyle:
  {
    fontFamily:'Merriweather-Bold',
    fontSize:16,
    color:colors.background
  },
  dateStyle:
  {
    fontSize:16,
    fontFamily:'Poppins-Regular',
    color: "#FFFFFF99"
  },
  ppTextStyle:
  {
    fontSize:16,
    fontFamily:'Poppins-Regular',
    color:colors.background
  }
})

export default Revenue;