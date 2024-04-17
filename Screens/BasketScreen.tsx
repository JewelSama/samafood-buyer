// @ts-nocheck
import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native' 
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../Providers/CartProvider'



const BasketScreen = ({ navigation }: any) => {
  const { totalCartItems, cartItems, totalAmount } = useCart();
    // console.log('Cartit: ', baseURL+'/'+cartItems[0]?.image)



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#064929] bg-white shadow-xs">
            <View>
              <Text className="text-lg text-center" style={{fontFamily: 'Bold'}}>Cart</Text>
              <Text className="text-gray-400 text-center" style={{fontFamily: 'SemiBold'}}>
                Chillout Restaurant
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full bg-gray-100 absolute top-3 right-5">
              <FontAwesome name='times' color="#064929" size={30} />
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}} className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
          <Text className="flex-1" style={{fontFamily: 'Regular'}}>Delivery in 20-50 minutes</Text>
          <TouchableOpacity>
            {/* <Text className="text-[#064929]">Change</Text> */}
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {
            cartItems && cartItems.map((item, index) => (

              <View key={index} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                  <Text className="text-[#064929]">{item?.quantity} x</Text>
                  <Image 
                    source={{ uri: item?.image }}
                    className="h-12 w-12 rounded-full"
                  />
                  <Text className="flex-1">{item.name}</Text>
                  <Text className="text-gray-600">
                    ₦{item.price}
                  </Text>
                  <TouchableOpacity onPress={() => ""}>
                    <Text className="text-[#064929] text-xs">
                      Remove
                    </Text>
                  </TouchableOpacity>
              </View>

            ))
          }
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>Subtotal</Text>
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>
              ₦{totalAmount}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>Delivery Fee</Text>
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>
              ₦450
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text style={{fontFamily: 'SemiBold'}}>Order Total</Text>
            <Text className="font-extrabold">
              ₦{totalAmount + 500}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#064929] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>

        </View> 

      </View> 
    </SafeAreaView>
  )
}

export default BasketScreen