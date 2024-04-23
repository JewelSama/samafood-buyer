// @ts-nocheck
import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native' 
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../Providers/CartProvider'
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { CreateOrderAPI, PaystackKey } from '../endpoints'
import { AppContext } from '../Providers/AppProvider'




const BasketScreen = ({ navigation, route }: any) => {
	const paystackWebViewRef = useRef<paystackProps.PayStackRef>(); 
  const { user } = useContext<any>(AppContext)
  const { totalCartItems, cartItems, totalAmount, removeFromCart } = useCart();
  
  const { vendor_id } = route.params;
  // console.log('vendor_id: ', vendor_id)

  const items = cartItems.map(item => {
      return {
        "vendor_id": vendor_id,
        "menu_id": item.id,
        'quantity': item.quantity,
        "price": item.price
      }
  })
  
console.log("itemssss ", items)


    const handleRemoveFromCart = (id) => {
      removeFromCart(id);
    };



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#064929] bg-white shadow-xs">
            <View>
              <Text className="text-lg text-center" style={{fontFamily: 'Bold'}}>Cart</Text>
              <Text className="text-gray-400 text-center" style={{fontFamily: 'SemiBold'}}>
                Chillout Restaurant
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full bg-gray-100 absolute top-3 right-5">
              <FontAwesome name='times' color="#064929" size={30} />
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}} className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
          <Text className="flex-1" style={{fontFamily: 'Regular'}}>Delivery in 20-50 minutes</Text>
          <TouchableOpacity>
            {/* <Text className="text-[#064929]">Change</Text> */}
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {
            cartItems && cartItems.map((item, index) => (

              <View key={index} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                  <Text className="text-[#064929]" style={{fontFamily: 'Regular'}}>{item?.quantity} x</Text>
                  <Image 
                    source={{ uri: item?.image }}
                    className="h-12 w-12 rounded-full"
                  />
                  <Text className="flex-1" style={{fontFamily: 'SemiBold'}}>{item.name}</Text>
                  <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>
                    ₦{item.price}
                  </Text>
                  <TouchableOpacity className='p-1' onPress={() => handleRemoveFromCart(item.id)}>
                    <Text className="text-[#064929] text-xs" style={{fontFamily: 'Bold'}}>
                      Remove
                    </Text>
                  </TouchableOpacity>
              </View>

            ))
          }
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>Subtotal</Text>
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>
              ₦{totalAmount}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>Delivery Fee</Text>
            <Text className="text-gray-600" style={{fontFamily: 'SemiBold'}}>
              ₦500
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text style={{fontFamily: 'SemiBold'}}>Order Total</Text>
            <Text className="font-extrabold">
              ₦{totalAmount + 500}
            </Text>
          </View>

          <TouchableOpacity disabled={cartItems.length < 1} onPress={()=> paystackWebViewRef?.current?.startTransaction()} className={`rounded-lg ${cartItems.length < 1 ? 'bg-gray-400' : 'bg-[#064929]'} p-4`}>
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>

        </View> 
        <Paystack
				paystackKey={PaystackKey}
				billingEmail={user?.email}
				billingName={user?.username}
				amount={totalAmount + 500}
				// activityIndicatorColor={"#064929"}
				onCancel={(e) => {
				// handle response here
					alert('Transaction cancelled.');
				}}
				onSuccess={(res) => {
          // setTimeout(() => {
            console.log(res.data?.transactionRef?.trxref)

            const data = {
              "trx_ref": res.data?.transactionRef?.trxref,
              "delivery_address": user?.address,
              "items": items
            }
            console.log('ITEMS: ', items);
        
            fetch(`${CreateOrderAPI}`, {
              method: 'POST',
              headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(resp => {
              if(resp?.errors){
                return alert(resp?.message)
              }
              console.log("resp", resp);
              navigation.navigate('PreparingOrderScreen')
          })

        // }, 1000)
          
				}}
				// @ts-ignore
				ref={paystackWebViewRef}
			/>

      </View> 
    </SafeAreaView>
  )
}

export default BasketScreen