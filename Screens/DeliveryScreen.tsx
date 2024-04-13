import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
// import { XIcon } from 'react-native-heroicons/solid'
import { FontAwesome } from '@expo/vector-icons'
import * as Progress from 'react-native-progress'
import MapView, {Marker} from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'


const DeliveryScreen = () => {
    const navigation: any = useNavigation()
    // const restaurant = useSelector(selectRestaurant)

  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1">
      <View className="z-50">

        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                {/* <XIcon color="white" size={30} /> */}
              <FontAwesome name='times' color="white" size={30} />
            </TouchableOpacity>
            <Text className="font-light text-lg text-white">Order Help</Text>
      </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md" style={{shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 4,}}>
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                    <Text className="text-4xl font-bold">45-55 Minutes</Text>
                </View>
                <Image 
                    source={{uri: "https://links.papareact.com/fls"}}
                    className="h-20 w-20"
                />
                    
            </View>
            {/* @ts-ignore */}
            <Progress.Bar size={30} color="#00ccbb" indeterminate={true} />
               <Text className="mt-3 text-gray-500">
                    Your order at Chillout is being prepared 
               </Text>
        </View>

      </View>
      <MapView
        initialRegion={{
            latitude: 6.39998,
            longitude: 5.6099,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        className="flex-1 mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
        coordinate={{ 
            latitude: 6.39998,
            longitude: 5.6099,
        }}
        title={"Chilllout Restaurant"}
        description={"Sweet and tasty meals"}
        identifier="origin"
        pinColor='#00ccbb'
            />
      </MapView>
      <View className="bg-white flex-row items-center space-x-5 h-28">
        <Image 
            source={{uri: "https://links.papareact.com/wru"}}
            className="h-12 w-12 bg-gray-300 rounded-full ml-5"
        />
        <View className="flex-1">
            <Text className="text-lg">
                Jewel~Sama
            </Text>
            <Text className="text-gray-400">Your delivery guy</Text>
        </View>
        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </View>
    </SafeAreaView>
  )
}

export default DeliveryScreen