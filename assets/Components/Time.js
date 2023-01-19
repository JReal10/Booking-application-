import React from 'react';
import { Text,StyleSheet, View } from 'react-native';
import colors from '../Colors/colors';
import TimeButton from './TimeButton';

export default function Time(props) {
  const [state,setState] = React.useState(true);
  const ButtonBgColor = state ? colors.secondary_green:colors.text_white
  const ButtonTextColor = state ? colors.text_white:colors.secondary_green

  return (
    <View>
    <View style = {styles.ButtonContainer}>
    <TimeButton style = {{}} onPress={() => props.changeTime('12:45')} title = '12:45'/>
    <TimeButton onPress={() => props.changeTime('13:45')} title = '13:45'/>
    <TimeButton onPress={() => props.changeTime('14:45')}  title = '14:45'/>
    <TimeButton onPress={() => props.changeTime('15:45')}  title = '15:45'/>
    </View>

    <View style = {styles.ButtonContainer}>
    <TimeButton onPress = {() => props.changeTime('16:45')} title = '16:45'/>
    <TimeButton onPress = {() => props.changeTime('17:45')} title = '17:45'/>
    <TimeButton onPress = {() => props.changeTime('18:45')} title = '18:45'/>
    <TimeButton onPress = {() => props.changeTime('19:45')} title = '19:45'/>
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