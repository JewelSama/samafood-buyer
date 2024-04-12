import React, {useLayoutEffect, useState, useEffect} from 'react'
import { View, Text, Platform, StatusBar, Image, TextInput, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import GlobalStyles from '../GlobalStyles'
// import {UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import { Feather, FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons'
// import sanityClient  from '../sanity'



const data = [
  {
    id: 1,
    name: 'samm',
    short_Description: 'acbioaboban'
  }
]

const HomeScreen = () => {
  const [featuredCategory, setfeaturedCategory] = useState(data)



  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: 'Testingggg'
      headerShown: false,
    })
  }, [navigation])

  // useEffect(() => {
  //   sanityClient.fetch(`
  //   *[_type == "featured"] {
  //     ...,
  //     restaurants[]->{
  //       ...,
  //       dishes[]->
  //   }
  //   }`).then((data) => {
  //     setfeaturedCategory(data)
  //   });

  // }, [sanityClient])
  // console.log(featuredCategory)

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
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
            <FontAwesome5 name="user" size={25} color="#00cc88" />             

        
        </View>
        {/* Search */}

        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
            <Feather name="search" size={20} color="gray" />             
            <TextInput placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>
            <AntDesign name="filter" size={25} color="#00cc88" />             

        </View>
        
        {/* body */}

        {/* <ScrollView className="bg-gray-100" contentContainerStyle={{paddingBottom: 125}}> */}
        <ScrollView className="bg-gray-500" contentContainerStyle={{paddingBottom: 125}}>
            {/* categories */}
            <Categories />


            {/* featured rows */}
            {featuredCategory?.map(category => (
              <FeaturedRow
              key={category.id} 
                id={category.id}
                title={category.name}
                description={category.short_Description}
                
              />
            ))}



        </ScrollView>


      
    </SafeAreaView>
  )
}

export default HomeScreen