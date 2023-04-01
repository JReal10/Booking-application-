import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,TouchableOpacity,FlatList} from 'react-native';
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
  const [totalPrice,setTotalPrice] = useState(0);

  const EnergyRateArray = [
    { name: 'Jamie Ogundiran', value: 3500, date: "3/25/2023" },
    { name: 'Qwerty Jones', value: 2500, date: "3/25/2023"},
    { name: 'Jamie Ogundiran', value: 1000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 4000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 5000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 6000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 1000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 1000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 1000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 1000, date: "3/25/2023"},
    { name: 'Qwerty Jones', value: 1000, date: "3/25/2023"},
  ];

  const totalPriceCalc = () => 
  {
    let total = 0;

    for (let i = 0; i < EnergyRateArray.length; i++) {
      const item = EnergyRateArray[i];
      total += item.value;
    }

    return total;
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
        <Text style = {styles.SubHeader}>Appointment History</Text>
        <View>
        <FlatList
        height = {height/2.25}
        ItemSeparatorComponent={ItemDivider}
        data={EnergyRateArray}
        renderItem={renderItem}
        keyExtractor={item => item}
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
  flContainer2:
  {
    paddingHorizontal: 10,
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
  SubHeader:
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