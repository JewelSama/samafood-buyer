import { TouchableOpacity, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Order from '../Components/Order';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Providers/AppProvider';
import { GetOrderAPI } from '../endpoints';
import React from 'react';


const OrderScreen = ({ navigation }: any) => {
    const { user } = useContext<any>(AppContext)
    const [ loading, setLoading ] = useState(false);
    const [orders, setOrders] = useState<any>([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const getOrders = async() => {
      setLoading(true)
      await fetch(`${GetOrderAPI}`, {
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
        // console.log(resp?.data[0]?.vendor)
        setOrders(resp?.data.reverse()); 
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        alert('Something went wrong')
      })
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        getOrders()
      }, 2000);
    }, []);



    
  useEffect(() => {
    getOrders()

  }, [])




  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='px-5 h-full'>
        <View className='flex flex-row pb-2 justify-between items-center mt-1'>
            <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-gray-100 rounded-full">
                <AntDesign name='arrowleft' color="#064929" size={20} />
            </TouchableOpacity>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>My Orders</Text>

            <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                <AntDesign name='arrowleft' color="#fff" size={18} />
            </TouchableOpacity>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {
                !loading ? (
                    <View>
                        {
                            orders && orders.map((order: any, index: any) => (
                                // @ts-ignore
                                <Order order={order} key={index} />
                            ))

                        }
                    </View>
                ) : (
                    <View className='w-full'>
                      <ActivityIndicator color="#064929" size={'small'} />
                    </View>
                )
            }
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderScreen