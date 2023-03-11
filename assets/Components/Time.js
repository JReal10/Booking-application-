import React from 'react';
import { Text,StyleSheet, View } from 'react-native';
import colors from '../Colors/colors';
import TimeButton from './TimeButton';
import { useState } from 'react';

export default function Time(props) {
  const [state,setState] = useState(false);

  const ButtonBgColor = state ? colors.secondary_green:colors.text_white
  const ButtonTextColor = state ? colors.text_white:colors.secondary_green

  const ButtonValue = state?"Added":"Add"
  

  const AddFunction = (time) => {
    const toggleState = !state;
    if(state == false){
    setState(true)
    setState(toggleState)
    props.changeTime(time)
    } else if(state == true){
      setState(false)
    }
  }

  return (
    <View>
    <View style = {styles.ButtonContainer}>
    <TimeButton style = {{}} onPress={() => AddFunction('1245')} title = {ButtonValue}/>
    <TimeButton onPress={() =>  AddFunction('1245')} title = {ButtonValue}/>
    <TimeButton onPress={() => props.changeTime('1445')}  title = '14:45'/>
    <TimeButton onPress={() => props.changeTime('1545')}  title = '15:45'/>
    </View>

    <View style = {styles.ButtonContainer}>
    <TimeButton onPress = {() => props.changeTime('1645')} title = '16:45'/>
    <TimeButton onPress = {() => props.changeTime('1745')} title = '17:45'/>
    <TimeButton onPress = {() => props.changeTime('1845')} title = '18:45'/>
    <TimeButton onPress = {() => props.changeTime('1945')} title = '19:45'/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom:20,
  },
});