import * as React from 'react';
import { Text,View, StyleSheet,SafeAreaView,ScrollView,Image,Modal } from 'react-native';
import colors from '../Colors/colors';
import GalleryData from '../Data/GalleryData';
import { useState} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Gallerypage() {

  const [visible, setVisible] = useState(false);

  return (
    <View style ={styles.container}>
      <ScrollView showsVerticalScrollIndicator = {false}>
      <SafeAreaView style = {styles.listWrapper}>
      <View style = {styles.HeaderWrapper}>
        <Text style = {styles.galleryHeader}>Gallery</Text>
        <Text style={styles.innerText}>             
        Have any questions? Please visit our FAQ section below or contact our customer care team for more information.
        </Text>
      </View>

      {GalleryData.map((gallery) => {
        return (
            <TouchableOpacity>
              <Image style = {styles.item} source = {gallery.image}/>
              <Text style = {styles.title}> {gallery.title}</Text>
            </TouchableOpacity>
          );
        })}

      <View style = {styles.imageContainer}>
      {GalleryData.map((gallery) => {
        return (
            <TouchableOpacity>
              <Image style = {styles.item} source = {gallery.image}/>
              <Text style = {styles.title}> {gallery.title}</Text>
            </TouchableOpacity>
          );
        })}
        </View>
        <View style = {styles.footer}>
        </View>
      </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create
({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  HeaderWrapper:{
    paddingBottom: 20,
    paddingTop:25,
    paddingHorizontal:20,
    alignItems:'center',
  },
  galleryHeader:{
    fontSize:28,
    fontFamily:'Merriweather-Regular',
    color:colors.text_brown,
  },
  innerText:{
    fontSize:16,
    fontFamily:'Poppins-Regular',
    paddingTop: 10,
    textAlign:'center',
    color: colors.text_brown
  },
  item:{
    width:275,
    height:225,
    marginVertical:10,
    borderRadius:8,
    borderWidth:1,
    borderColor:colors.text_white,
  },
  imageContainer:{
    alignItems:'center',
  },
  title:{
    textAlign:'center',
    fontSize:16,
    fontFamily:'Poppins-Regular',
    paddingTop:5,
    paddingBottom:15
  },
  footer:{
    padding:20,
  }
})

export default Gallerypage;