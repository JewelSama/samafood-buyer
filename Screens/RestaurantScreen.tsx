import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { AntDesign, FontAwesome6, Entypo } from "@expo/vector-icons"
import DishRow from '../Components/DIshRow'
import BasketIcon from '../Components/BasketIcon'
import { useEffect } from 'react'
import { useState } from 'react'
import { VendorMenuAPI, baseURL } from '../endpoints'
import { AppContext } from '../Providers/AppProvider'


const RestaurantScreen = ({ navigation, route }: any) => {
    const [menus, setMenus] = useState([])
    const { vendor } = route.params;
    const { user } = useContext<any>(AppContext);
    const [ loading, setLoading ] = useState(false)

    // const hhh = 'https://img.freepik.com/free-vector/simple-corn-cartoon_1308-124847.jpg'
    // const dishes = [
    //     {
    //         id: 1,
    //         name: 'Jollof rice',
    //         short_description: "Sweet and tasty jollof rice",
    //         price: '1500',
    //         image: hhh
    //     }
    // ]



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetch(`${VendorMenuAPI}/${vendor?.id}`, {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          })
        })
        .then(res => res.json())
        .then(resp => {
          setLoading(false)
          if(resp?.errors){
            return alert(resp?.message)
          }
          console.log(resp)
          setMenus(resp?.data); 
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          alert('Something went wrong')
        })
    
      }, [])
    

  return (
    <>
    <BasketIcon />

    <ScrollView className='bg-white'>
        <View className="relative">
            <Image 
                source={{ uri: baseURL+'/'+vendor.display_pic }}
                className="w-full h-56 bg-gray-300 p-4"
            />
            <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
                <AntDesign name='arrowleft' color="#064929" size={18} />
            </TouchableOpacity>
        </View>
        <View className="bg-white">
            <View className="px-4 pt-4">
                <Text className="text-2xl" style={{fontFamily: 'Bold'}}>{vendor?.name}</Text>
                <View className="flex-row space-x-2 my-1">
                    <View className="flex-row items-center space-x-1">
                        <AntDesign name='star' size={18} color={'green'} />
                        <Text className="text-[#064929]" style={{fontFamily: 'Regular'}}>4.6</Text>
                    </View>
                   
                    <View className="flex-row items-center space-x-1">
                        <FontAwesome6 name='location-dot' size={18} color={'gray'} />
                        <Text className="text-xs text-gray-500">
                            <Text className="text-[#064929]" style={{fontFamily: 'Regular'}}>Nearby . {vendor?.address}</Text>
                        </Text>
                    </View>

                </View>
                <Text className="text-gray-500 mt-2 pb-4" style={{fontFamily: 'Regular'}}>{vendor?.description}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                {/* <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} /> */}
                <AntDesign name='questioncircleo' size={18} color={'gray'} />
                <Text className="pl-2 flex-1 text-md" style={{fontFamily: 'Bold'}}>
                    Have a food allergy?
                </Text>
                <Entypo name='chevron-right' size={18} color={'#064929'} />

            </TouchableOpacity>
            <View className="pb-36">
                <Text className="px-4 pt-5 mb-3 text-xl" style={{fontFamily: 'SemiBold'}}>
                    Menu
                </Text>
                {
                    !loading && menus ? (
                        <View>
                            {menus.map((menu: any) => (
                            <DishRow 
                                key={menu.id}
                                id={menu.id}
                                name={menu.name}
                                description={menu.description}
                                price={menu.price}
                                image={baseURL+'/'+menu.display_pic}
                            />
                            ))}
                        </View>
                    ) : (
                        <View className='mt-10'>
                            <ActivityIndicator size={'small'} color="#064929" />
                        </View>

                    )
                }


            </View>
        </View>
      
    </ScrollView>
    </>
  )
}

export default RestaurantScreen