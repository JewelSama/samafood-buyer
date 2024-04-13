import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign, FontAwesome6, Entypo } from "@expo/vector-icons"
import DishRow from '../Components/DIshRow'
import BasketIcon from '../Components/BasketIcon'
import { useEffect } from 'react'
import { useState } from 'react'


const RestaurantScreen = ({ navigation }: any) => {
    const [res, setRes] = useState([])


    const hhh = 'https://img.freepik.com/free-vector/simple-corn-cartoon_1308-124847.jpg'
    const dishes = [
        {
            id: 1,
            name: 'Jollof rice',
            short_description: "Sweet and tasty jollof rice",
            price: '1500',
            image: hhh
        }
    ]



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

  return (
    <>
    <BasketIcon />

    <ScrollView className='bg-white'>
        <View className="relative">
            <Image 
                source={{ uri: hhh }}
                className="w-full h-56 bg-gray-300 p-4"
            />
            <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
                <AntDesign name='arrowleft' color="#00cc88" size={18} />
            </TouchableOpacity>
        </View>
        <View className="bg-white">
            <View className="px-4 pt-4">
                <Text className="text-3xl font-bold">Chillout Restaurant</Text>
                <View className="flex-row space-x-2 my-1">
                    <View className="flex-row items-center space-x-1">
                        {/* <StarIcon size={22} color="green" opacity={0.5} /> */}
                        <AntDesign name='star' size={18} color={'green'} />
                        <Text className="text-green-500">4.6</Text>
                    </View>
                   
                    <View className="flex-row items-center space-x-1">
                        {/* <LocationMarkerIcon size={22} color="gray" opacity={0.4} /> */}
                        <FontAwesome6 name='location-dot' size={18} color={'gray'} />
                        <Text className="text-xs text-gray-500">
                            <Text className="text-green-500">Nearby . {"10, hassan avenue"}</Text>
                        </Text>
                    </View>

                </View>
                <Text className="text-gray-500 mt-2 pb-4">{"Sweet and tasty meals in a condusive environs"}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                {/* <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} /> */}
                <AntDesign name='questioncircleo' size={18} color={'gray'} />
                <Text className="pl-2 flex-1 text-md font-bold">
                    Have a food allergy?
                </Text>
                <Entypo name='chevron-right' size={18} color={'#00cc88'} />

            </TouchableOpacity>
            <View className="pb-36">
                <Text className="px-4 pt-5 mb-3 font-bold text-xl">
                    Menu
                </Text>

            {/* DishRows */}
             {dishes.map(dish => (
                <DishRow 
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    image={dish.image}
                />
             ))}


            </View>
        </View>
      
    </ScrollView>
    </>
  )
}

export default RestaurantScreen