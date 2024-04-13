import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native' 
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'



const BasketScreen = ({ navigation }: any) => {


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00cc88] bg-white shadow-xs">
            <View>
              <Text className="text-lg font-bold text-center">Cart</Text>
              <Text className="text-gray-400 text-center">
                Chillout Restaurant
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full bg-gray-100 absolute top-3 right-5">
              <FontAwesome name='times' color="#00cc88" size={30} />
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}} className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00cc88]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
            <View className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text className="text-[#00cc88]">{'2'} x</Text>
                <Image 
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEAtfryy3h79PfpxPs7zB6hNVslMDtTu5S2AdP8wqjQ&s' }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{"name"}</Text>
                <Text className="text-gray-600">
                  ₦{"price"}
                </Text>
                <TouchableOpacity onPress={() => ""}>
                  <Text className="text-[#00cc88] text-xs">
                    Remove
                  </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              ₦{"cartTotal"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              ₦450
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              ₦{"cartTotal + 500"}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#00cc88] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>

        </View> 

      </View> 
    </SafeAreaView>
  )
}

export default BasketScreen