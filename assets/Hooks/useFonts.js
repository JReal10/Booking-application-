import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    'Poppins-SemiBold': require('../Fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../Fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../Fonts/Poppins-Regular.ttf'),
    'DancingScript': require('../Fonts/DancingScript-SemiBold.ttf'),
    'Merriweather-Regular': require('../Fonts/Merriweather-Regular.ttf'),
    'Merriweather-Bold': require('../Fonts/Merriweather-Bold.ttf'),
  });
 }

export default useFonts;