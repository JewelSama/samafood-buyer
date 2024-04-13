import React, {useLayoutEffect, useState, useEffect} from 'react'
import { View, Text, Platform, StatusBar, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather, FontAwesome5, FontAwesome6, FontAwesome, Entypo, AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'




const data = [
  {
    id: 1,
    name: 'samm',
    short_Description: 'acbioaboban'
  }
]

const hhh = 'https://img.freepik.com/free-vector/simple-corn-cartoon_1308-124847.jpg'
const data2 = [
  {
    id: 1,
    name: 'samm1',
    hhh: hhh
  },
  {
    id: 2,
    name: 'samm2',
    hhh: hhh
  },
  {
    id: 3,
    name: 'samm3',
    hhh: hhh
  },
  {
    id: 4,
    name: 'samm4',
    hhh: hhh
  },
  {
    id: 5,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 6,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 7,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 8,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 9,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 10,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 11,
    name: 'samm',
    hhh: hhh
  },
  {
    id: 12,
    name: 'samm',
    hhh: hhh
  },
]

const HomeScreen = ({ navigation }: any) => {
  const [featuredCategory, setfeaturedCategory] = useState(data)
  const [categories, setCategories] = useState(data2);



  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: 'Testingggg'
      headerShown: false,
    })
  }, [navigation])
  

  return (
    <SafeAreaView className="bg-white h-full px-1">
        {/* Header */}
        <View className="flex-row pb-3 items-center space-x-2 mx-2">
          <Image 
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className='flex-1'>
            <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
            <Text className="font-bold text-xl">Current Location
            <Entypo name="chevron-down" size={20} color="#00cc88" />             
           </Text>
          </View>
          <View className='flex flex-row px-1 space-x-4 items-center'>
            <TouchableOpacity className='items-center' onPress={() => navigation.navigate('Order')}>
              <Feather name='shopping-cart' size={25} color="#00cc88" />           
            </TouchableOpacity>
            <TouchableOpacity className='items-center' onPress={() => navigation.navigate('Profile')}>
              <FontAwesome name="user-circle-o" size={25} color="#00cc88" />  
            </TouchableOpacity>
          </View>

        
        </View>
        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
            <Feather name="search" size={20} color="gray" />             
            <TextInput placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>
            <AntDesign name="filter" size={25} color="#00cc88" />             

        </View>
        
        {/* body */}

        <ScrollView className="bg-gray-10" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 125}}>


          {/* <Categories /> */}
          <ScrollView  className='h-20' horizontal  showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 15, paddingTop: 10}}>
            {
              categories?.map((category) => (
              <TouchableOpacity className="relative bg-gray-300 mr-2" key={category?.id}>
                  <Image source={{uri: category.hhh}} className="h-20 w-20 rounded" />
                <Text className="absolute bottom-1 left-1 text-white font-bold">{category?.name}</Text>     
              </TouchableOpacity>

              ))
            }
          </ScrollView>


          <View className='w-full'>
            <View className="mt-4 flex-row items-center justify-between px-4">
              <Text className="font-bold text-lg">{"Offers near you!"}</Text>
              <Entypo name='chevron-down' color={'#00cc88'} size={20} />
            </View>
            <Text className="text-xs text-gray-500 px-4">{"Why not support your local restaurants today?"}</Text>
            <View className='py-4 w-full items-center px-2 space-y-4'>

              <TouchableOpacity className="bg-white rounded-lg w-full shadow-s" onPress={() => navigation.navigate('Restaurant')}>
              <Image 
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEAtfryy3h79PfpxPs7zB6hNVslMDtTu5S2AdP8wqjQ&s'
                }}
                className="h-36 rounded-sm"
              />
              <View className="px-3 pb-4">
                <Text className="font-bold text-lg pt-2">{"Chillout Restaurant"}</Text>
                <View className="flex-row mb-1 items-center space-x-1">
                    <AntDesign name='star' size={18} color={'green'} />
                    <Text className="text-green-500">{4.6}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <FontAwesome6 name='location-dot' size={18} color={'gray'} />
                    <Text className="text-xs text-gray-500">Nearby . {"10, hassan avenue"}</Text>
                </View>

              </View>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white rounded-lg w-full shadow-s">
              <Image 
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEAtfryy3h79PfpxPs7zB6hNVslMDtTu5S2AdP8wqjQ&s'
                }}
                className="h-36 rounded-sm"
              />
              <View className="px-3 pb-4">
                <Text className="font-bold text-lg pt-2">{"Chillout Restaurant"}</Text>
                <View className="flex-row mb-1 items-center space-x-1">
                    <AntDesign name='star' size={18} color={'green'} />
                    <Text className="text-green-500">{4.6}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                  <FontAwesome6 name='location-dot' size={18} color={'gray'} />
                    <Text className="text-xs text-gray-500">Nearby . {"10, hassan avenue"}</Text>
                </View>

              </View>
              </TouchableOpacity>

              
            </View>
            

          </View>



        </ScrollView>
            


      
    </SafeAreaView>
  )
}

export default HomeScreen