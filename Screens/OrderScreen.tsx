import { TouchableOpacity, Text, View, ScrollView, Image, useColorScheme } from 'react-native'
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Order from '../Components/Order';


const OrderScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='px-5 h-full'>
        <View className='flex flex-row pb-2 justify-between items-center mt-1'>
            <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-gray-100 rounded-full">
                <AntDesign name='arrowleft' color="#00cc88" size={20} />
            </TouchableOpacity>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>My Orders</Text>

            <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                <AntDesign name='arrowleft' color="#fff" size={18} />
            </TouchableOpacity>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <>
                <Order />
                <Order />
                <Order />
            </>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderScreen