//@ts-nocheck
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useContext, useState} from 'react'
import { Entypo } from '@expo/vector-icons'
import { CartContext, useCart } from '../Providers/CartProvider'

const DishRow = ({id, name, description, price, image}: any) => {
    const [isPressed, setIsPressed] = useState(false)

    const { addToCart, removeFromCart, cartItems } = useCart();

    const itemInCart = cartItems.find((item) => item.id === id);
  
    const handleAddToCart = () => {
      addToCart({ id, name, description, price, image });
    };
  
    const handleRemoveFromCart = () => {
      removeFromCart(id);
    };

  


    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2"> ₦{price}
                            {/* <Currency quantity={price} currency="NGR" /> */}
                        </Text>
                    </View>
                    <View>
                    <Image 
                        style={{borderWidth: 1, borderColor: "#f3f3f4"}}
                        source={{uri: image}}
                        className="h-20 w-20 bg-gray-300 p-4"
                        />
                        </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity onPress={handleRemoveFromCart}>
                            <Entypo name='circle-with-minus' size={35} color={cartItems > 0 ? "#00cc88" : "gray"}  />
                        </TouchableOpacity>
                        {
                            itemInCart ? (
                                <Text>{itemInCart.quantity}</Text>
                            ) : (
                                <Text>0</Text>
                            )
                        }

                        <TouchableOpacity  onPress={handleAddToCart}>
                            <Entypo name='circle-with-plus' size={35} color={"#00cc88"}  />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
  )
}

export default DishRow