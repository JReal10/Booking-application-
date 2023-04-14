import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import adminLogin from "../Screens/Adminlogin";
import ForgotPassword from "../Screens/ForgotPassword";
import colors from "../Colors/colors";
import { Dimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

//create a navigation stack for three screens: Login, Signup, and adminLogin.
function AuthStack({navigation})
{
  return (
      <Stack.Navigator initialRouteName= "Login">
      <Stack.Screen name = 'adminLogin' component = {adminLogin} options = 
      {{
        headerShown:false,
      }}/>
      <Stack.Screen name = "Login" component={Login} options = 
      {{
        headerShown:false,
      }}/>
      <Stack.Screen name = "Signup" component={Signup} options = 
      {{
        headerShown:false,
      }}/>
      <Stack.Screen name = "fp" component={ForgotPassword} options = 
      {{
        headerShown:true,
        headerTitle: 'Reset Password',
        headerTintColor:colors.primary_brown,
        drawerActiveTintColor:colors.text_brown,
        headerBackVisible: true,
        headerBackTitle: '',
        headerStyle: 
        {  
          backgroundColor: colors.background,
          shadowColor: 'transparent',
        },
        headerTitleStyle: 
        {
          fontSize:height * 0.025,
          fontFamily:'Poppins-SemiBold'
        },
      }}/>
    </Stack.Navigator>
    );
}
export default AuthStack;