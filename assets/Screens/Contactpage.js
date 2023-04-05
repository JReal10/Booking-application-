import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,Dimensions} from 'react-native';
import colors from '../Colors/colors';
import Buttons from '../Components/ContactButtons';
import sendEmail from 'react-native-email';
import call from 'react-native-phone-call';
import openMap from 'react-native-open-maps';
import { ScrollView } from 'react-native-gesture-handler';

// Get the width and height of the screen using the Dimensions API
const { width, height } = Dimensions.get('window');

function ContactPage() {

  const handleEmail = () => {
  const to = ['tiaan@email.com'] // string or array of email addresses
  sendEmail(to, {
      // Optional additional arguments
      subject: 'Show how to use',
      body: 'Some body right here'
  }).catch(console.error)
}

const handleCall = () => {

  const args = {
    number: '9093900003', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
    skipCanOpen: true // Skip the canOpenURL check
  }
  call(args).catch(console.error)
  };

  // This function handles opening the device's default map application and showing a specific location
  const handleMap =() =>{
    openMap({ latitude: 35.749668, longitude: 139.804901 });
  }

  return (
    <View style = {styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator = {false}>
        <View style = {styles.ScreenContainer}>
          <Text style={styles.baseText}>
            Contact Us
          </Text>
          <Text style={styles.innerText}>             
          Have any questions? Please visit our FAQ section below or contact our customer care team for more information.
          </Text>
          <View style = {styles.Container2}>
            <Text style ={styles.ContainerHeader}>
              EMAIL
            </Text>
            <Text style = {styles.ContainerInnerText}>
              Contact our customer care team 
              with any enquiries
            </Text>
            <Buttons title="Email Us" onPress = {() => handleEmail()}/>
          </View>
          <View style = {styles.Container2}>
            <Text style ={styles.ContainerHeader}>
              PHONE
            </Text>
            <Text style = {styles.ContainerInnerText}>
              Contact our customer care team 
              with any enquiries
            </Text>
            <Buttons title="Call Us" onPress = {() => handleCall()}/>
          </View>
          <View style = {styles.Container2}>
            <Text style ={styles.ContainerHeader}>
              LOCATION
            </Text>
            <Text style = {styles.ContainerInnerText}>
              Contact our customer care team 
              with any enquiries
            </Text>
            <Buttons title="Our Location"  onPress = {() => handleMap()}/>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

//Stylesheet for the contact page
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ScreenContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  baseText: {
    fontSize: width * 0.08,
    marginTop: height * 0.02,
    color: colors.text_brown,
    textAlign: 'center'
  },
  innerText: {
    paddingTop: height * 0.03,
    color: colors.text_brown,
    fontSize: width * 0.05,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  Container2: {
    backgroundColor: '#EEEEEE',
    borderRadius: width * 0.03,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.04,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  ContainerHeader: {
    fontSize: width * 0.08,
    color: colors.text_brown,
    textAlign: 'center',
    paddingBottom: height * 0.03,
  },
  ContainerInnerText: {
    color: colors.text_brown,
    fontSize: width * 0.05,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
    paddingBottom: height * 0.03,
  },
});

export default ContactPage;