import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CartContext, useCart } from '../Providers/CartProvider'

const BasketIcon = ({ vendor_id }: any) => {
  const navigation: any = useNavigation()
  // @ts-ignore
    const { totalCartItems, cartItems, totalAmount } = useCart();
    const [items, setItems] = useState([5]) 
    // console.log('Cart: ', cartItems)


    if(totalCartItems === 0) return null;

  return (
    <View className="absolute w-full bottom-10 z-50">
      <TouchableOpacity onPress={() => navigation.navigate('Basket', {vendor_id})} className="bg-[#064929] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-extrabold text-lg bg-[#0f1e17] py-1 px-2">
            {totalCartItems}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Cart</Text>
        <Text className="text-lg text-white font-extrabold">₦{totalAmount}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon