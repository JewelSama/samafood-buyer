import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import RestaurantScreen from '../Screens/RestaurantScreen';
import BasketScreen from '../Screens/BasketScreen';
import PreaparingOrderScreen from '../Screens/PreaparingOrderScreen';
import DeliveryScreen from '../Screens/DeliveryScreen';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Basket" component={BasketScreen} 
            options={{ presentation: "modal" , headerShown: false }}
        />
        <Stack.Screen name="PreparingOrderScreen" component={PreaparingOrderScreen} 
          options={{presentation: "fullScreenModal", headerShown:false}}
        />
          <Stack.Screen name="Delivery" component={DeliveryScreen} 
            options={{presentation: "fullScreenModal", headerShown:false}}
          />
    </Stack.Navigator>
  )
}

export default StackNavigator