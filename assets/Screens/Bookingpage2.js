import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView, ScrollView} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';
import { Calendar } from 'react-native-calendars';
import TimeButton from '../Components/TimeButton';
import colors from '../Colors/colors';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: colors.secondary_green,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: colors.secondary_green,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.secondary_green,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.secondary_green,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.secondary_green,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: colors.secondary_green
}


const labels = ["Menu","Date","Confirmation"];

function Bookingpage2({navigation}) {

  const [date,setDate] = React.useState(new Date());
  const [showTime,setShowTime] = React.useState(false)

  const onChange = date => {
    setDate(date);
  }
  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <ScrollView>
          <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {1}
          labels ={labels}
          stepCount = {3}/>
          </View>
          <Calendar
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        setDate(day.dateString);
        console.log(date)
      }}
      // Handler which gets executed on day long press. Default = undefined
      minDate = {new Date()}
      markedDates={{
        date:{selected:true}
      }}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}

      firstDay={1}
      enableSwipeMonths={true} 
          />
          <Text style = {styles.AvailableTime}>Available Time</Text>

          <View style = {styles.ButtonContainer}>
          <TimeButton title = '12:45'/>
          <TimeButton title = '13:45'/>
          <TimeButton title = '14:45'/>
          <TimeButton title = '15:45'/>
          </View>

          <View style = {styles.ButtonContainer}>
          <TimeButton title = '16:45'/>
          <TimeButton title = '17:45'/>
          </View>

          <FowardButton title = 'CONTINUE' onPress={() => navigation.navigate('Booking3')}/>
          <View style = {styles.TabNavSpace}/>
          </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create
({
  stepIndicator: 
  {
    paddingVertical: '8%',
    paddingHorizontal:'5%',
    borderBottomWidth:1,
    borderBottomColor: '#B0B0B0'
  },
  Container: 
  {
    flex:1
  },
  AvailableTime: 
  {
    paddingHorizontal:12,
    fontSize: 16,
    color: colors.text_brown,
    paddingVertical: 25,
    fontWeight: 'bold'

  },
  ButtonContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom:20,
  },
  TabNavSpace: 
  {
    paddingVertical:40,
  }
})

export default Bookingpage2