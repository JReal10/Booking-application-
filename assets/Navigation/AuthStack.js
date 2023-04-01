import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import adminLogin from "../Screens/Adminlogin";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    </Stack.Navigator>
    );
}
export default AuthStack;