import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,StatusBar, Button, ScrollView } from 'react-native';
import colors from '../Colors/colors';
import Buttons from '../Components/ContactButtons';
import sendEmail from 'react-native-email';
import call from 'react-native-phone-call';
import openMap from 'react-native-open-maps';

//Main content for contact page
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

  const handleMap =() =>{
    openMap({ latitude: 35.749668, longitude: 139.804901 });
  }

  return (
    <View style = {styles.container}>
      <SafeAreaView>
        <ScrollView>
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
          <Buttons
            title="Email Us" onPress = {() => handleEmail()} 
          />
        </View>
        <View style = {styles.Container2}>
        <Text style ={styles.ContainerHeader}>
          PHONE
        </Text>
          <Text style = {styles.ContainerInnerText}>
            Contact our customer care team 
            with any enquiries
          </Text>
          <Buttons
            title="Call Us" 
            onPress = {() => handleCall()}
          />
        </View>
        <View style = {styles.Container2}>
        <Text style ={styles.ContainerHeader}>
          LOCATION
        </Text>
          <Text style = {styles.ContainerInnerText}>
            Contact our customer care team 
            with any enquiries
          </Text>
          <Buttons
            title="Our Location"  onPress = {() => handleMap()}
          />
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

//Stylesheet for the contact page
const styles = StyleSheet.create
({
    container :
    {
      flex:1
    },
    ScreenContainer: 
    {
     flexDirection: 'column',
     justifyContent: 'center', 
     padding: 20,
    },
    baseText: {
      fontSize:36,
      marginTop: 20,
      color: colors.text_brown,
      textAlign: 'center'
    },
    innerText: {
      paddingTop: 20,
      color: colors.text_brown,
      fontSize: 16,
      opacity: 0.9,
      textAlign: 'center',
      marginBottom:40,
    },
    Container2: 
    {
      backgroundColor: '#EEEEEE',
      borderRadius: 8,
      paddingVertical:23,
      paddingHorizontal:22,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom:21,
    },

    ContainerHeader:
    {
      fontSize: 36,
      color: colors.text_brown,
      textAlign: 'center',
      paddingBottom:21
    },
    ContainerInnerText:
    {
      color: colors.text_brown,
      fontSize: 16,
      opacity: 0.9,
      textAlign: 'center',
      paddingHorizontal:50,
      paddingBottom:21
    },

});

export default ContactPage;