import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Image,StatusBar, ScrollView} from 'react-native';
import colors from '../Colors/colors';
import StepIndicator from 'react-native-step-indicator';
import FowardButton from '../Components/FowardButton';

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

function Bookingpage3({navigation}) {
  const [date,setDate] = React.useState(new Date());
  const [time,setTime] = React.useState("");

  return (
    <View style = {styles.Container}>
      <SafeAreaView>
        <ScrollView>
          <View style = {styles.stepIndicator}>
          <StepIndicator customStyles={customStyles}
          currentPosition = {2}
          labels ={labels}
          stepCount = {3}/>
          </View>
          <View style = {styles.Container1}>
            <View style = {styles.ContainerHeader}>
              <Text style = {styles.Header}>Booking Details</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Selected Course</Text>
              <Text style = {styles.Text1}>[Hand] Clear only</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Selected Course</Text>
              <Text style = {styles.Text1}>[Hand] Clear only</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Name</Text>
              <Text style = {styles.Text1}>Jamie Ogundiran</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Email</Text>
              <Text style = {styles.Text1}>jamieogundiran@gmail.com</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Date</Text>
              <Text style = {styles.Text1}>09/11/2022</Text>
            </View>
            <View style = {styles.ContainerElement}>
              <Text style = {styles.Header2}>Time</Text>
              <Text style = {styles.Text1}></Text>
            </View>
          </View>
          <FowardButton title = 'CONTINUE' onPress={() => navigation.navigate('Booking4')}/>
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
  TabNavSpace: 
  {
    paddingVertical:20,
  },
  Container1: 
  {
    marginVertical: 15,
    marginHorizontal:12,
    backgroundColor: colors.secondary_green,
    paddingTop: 30,
    paddingHorizontal:28,
    borderRadius:8,
  },
  Header:
  {
    fontSize:24,
    fontWeight:'bold',
    color: colors.text_white
  },
  ContainerHeader:
  {
    marginBottom:28,
    borderBottomWidth:1,
    borderColor: colors.text_white
  },
  Header2:
  {
    fontSize:20,
    fontWeight:'bold',
    color: colors.text_white
  },
  Text1:
  {
    fontSize:18,
    color: colors.text_white,
    marginTop:7,
  },
  ContainerElement: 
  {
    marginBottom: 24,
  }
})

export default Bookingpage3