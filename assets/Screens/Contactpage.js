import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,StatusBar, Button, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import colors from '../Colors/colors';
import Buttons from '../Components/ContactButtons';

Feather.loadFont();

//Main contnt for contact page
function ContactPage() {
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
            title="Email Us" 
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
            title="Our Location" 
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