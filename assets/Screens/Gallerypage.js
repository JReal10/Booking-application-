import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, FlatList, Dimensions } from 'react-native';
import colors from '../Colors/colors';
import GalleryData from '../Data/GalleryData';

// Get the width and height of the screen using the Dimensions API
const { width, height } = Dimensions.get('window');

// Define the Gallerypage component
function Gallerypage() {

  // Define a function to render each image item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.item} source={item.image} />
      <Text style={styles.title}> {item.title}</Text>
    </View>
  );

  // Render the component
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Render the header section */}
        <View style={styles.HeaderWrapper}>
          <Text style={styles.galleryHeader}>Gallery</Text>
          <Text style={styles.innerText}>
            Have any questions? Please visit our FAQ section below or contact our customer care team for more information.
          </Text>
        </View>

        {/* Render the FlatList to display the image items */}
        <FlatList
          style={styles.FlatList}
          data={GalleryData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderWrapper: {
    paddingBottom: height * 0.02,
    paddingTop: height * 0.025,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  galleryHeader: {
    fontSize: height * 0.04,
    fontFamily: 'Merriweather-Regular',
    color: colors.text_brown,
  },
  innerText: {
    fontSize: height * 0.02,
    fontFamily: 'Poppins-Regular',
    paddingTop: height * 0.01,
    textAlign: 'center',
    color: colors.text_brown,
  },
  item: {
    width: width * 0.8,
    height: height * 0.3,
    marginVertical: height * 0.02,
    resizeMode: 'contain',
    borderColor: colors.text_white,
  },
  imageContainer: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: height * 0.015,
    fontFamily: 'Poppins-Regular',
    paddingBottom: height * 0.05,
    color:colors.text_brown,
  },
  contentContainer: {
    paddingBottom: height * 0.05,
  },
});

export default Gallerypage;