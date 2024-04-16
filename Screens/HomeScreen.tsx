import React, {useLayoutEffect, useState, useEffect, useContext} from 'react'
import { View, Text, Platform, StatusBar, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather, FontAwesome5, FontAwesome6, FontAwesome, Entypo, AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppContext } from '../Providers/AppProvider'
import { windowWidth } from '../utils/Dimension'
import { MenusAPI, VendorsAPI, baseURL } from '../endpoints'




const data = [
  {
    id: 1,
    name: 'samm',
    short_Description: 'acbioaboban'
  }
]

const hhh = 'https://img.freepik.com/free-vector/simple-corn-cartoon_1308-124847.jpg'


const HomeScreen = ({ navigation }: any) => {
  const [vendors, setVendors] = useState(data)
  const [ loading, setLoading ] = useState(false);
  const [menus, setMenus] = useState<any>([]);
  const { user } = useContext<any>(AppContext);



  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: 'Testingggg'
      headerShown: false,
    })
  }, [navigation])




  useEffect(() => {
    setLoading(true)
    fetch(`${MenusAPI}`, {
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
      // console.log(baseURL+'/'+resp?.data[0].display_pic)
      setMenus(resp?.data); 
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })

  }, [])




  useEffect(() => {
    setLoading(true)
    fetch(`${VendorsAPI}`, {
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
      // console.log(resp?.data[0])
      setVendors(resp?.data); 
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })

  }, [])
  

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
            <Text className="text-gray-400 text-xs" style={{fontFamily: 'Bold'}}>Order Now</Text>
            <TouchableOpacity>
            <Text className="text-base text-slate-700" style={{fontFamily: 'Bold'}}>{user?.username}
            <Entypo name="chevron-down" size={20} color="#064929" />             
           </Text>
           </TouchableOpacity>
          </View>
          <View className='flex flex-row px-1 space-x-4 items-center'>
            <TouchableOpacity className='items-center' onPress={() => navigation.navigate('Order')}>
              <Feather name='shopping-cart' size={25} color="#064929" />           
            </TouchableOpacity>
            <TouchableOpacity className='items-center' onPress={() => navigation.navigate('Profile')}>
              <FontAwesome name="user-circle-o" size={25} color="#064929" />  
            </TouchableOpacity>
          </View>

        
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-2">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
            <Feather name="search" size={20} color="gray" />             
            <TextInput placeholder='Restaurants near you'
              keyboardType='default'
            />
          </View>
            <AntDesign name="filter" size={25} color="#064929" />             

        </View>
        
        <ScrollView className="bg-gray-10" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 125}}>

          {/* <Categories /> */}
          <ScrollView  className='h-20' horizontal  showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 15, paddingTop: 10}}>
            {
              !loading && menus && menus?.map((menu: any) => (
              <TouchableOpacity className="relative bg-gray-300 mr-2" key={menu?.id}>
                  <Image source={{uri: baseURL+'/'+menu.display_pic}} className="h-20 w-20 rounded" />
                <Text className="absolute bottom-1 left-1 text-white font-bold">{menu?.name}</Text>     
              </TouchableOpacity>

              ))
            }
          </ScrollView>


          {
            !loading ? (
             
             <View className='w-full mt-2'>
                <View className="mt-4 flex-row items-center justify-between px-4">
                  <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>Restaurants near you</Text>
                  <Entypo name='chevron-down' color={'#064929'} size={20} />
                </View>
                <Text className="text-xs text-gray-500 px-4" style={{fontFamily: 'Regular'}}>{"Why not support your local restaurants today?"}</Text>
                <View className='py-4 w-full items-center px-2 space-y-4'>
                {
                  vendors && vendors.map((vendor: any) => (
                    
                    <TouchableOpacity className="bg-white rounded-lg w-full shadow-s" onPress={() => navigation.navigate('Restaurant', {vendor})}>
                      <Image 
                        source={{
                            uri: baseURL+'/'+vendor.display_pic
                        }}
                        className="h-36 rounded-sm"
                      />
                      <View className="px-3 pb-4">
                      <Text className="font-bold text-lg pt-2">{vendor?.name}</Text>
                      <View className="flex-row mb-1 items-center space-x-1">
                          <AntDesign name='star' size={18} color={'rgb(250, 204, 21)'} />
                          <Text className="text-[#064929]">{4.6}</Text>
                      </View>
                      <View className="flex-row items-center space-x-1">
                        <FontAwesome6 name='location-dot' size={18} color={'gray'} />
                          <Text className="text-xs text-gray-500">Nearby . {vendor?.address}</Text>
                      </View>

                      </View>
                    </TouchableOpacity>

                  ))
                }

                  
                </View>
                

              </View>

            ) : (
              <View className='w-full'>
                <ActivityIndicator color="#064929" size={'large'} />
              </View>
            )
          }



        </ScrollView>
            


      
    </SafeAreaView>
  )
}

export default HomeScreen