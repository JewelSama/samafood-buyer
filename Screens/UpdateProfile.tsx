import { TouchableOpacity, Text, View, ScrollView, Image, Alert, ActivityIndicator, TextInput } from 'react-native'
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Providers/AppProvider';
import { isEmpty } from '../utils';
import { UpdateProfileAPI } from '../endpoints';


const UpdateProfile = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false)
    const { setUser, user } = useContext<any>(AppContext)
  
  
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirPassword, setConfirPassword] = useState('')

    useEffect(() => {
        setUsername(user?.username)
        setEmail(user?.email)
        setPhone(user?.phone_number)
        setAddress(user?.address)
    }, [])
  
  
    const validateForm = () => {
          if(
              isEmpty(username) || isEmpty(email) || isEmpty(phone) || isEmpty(address)
          ){
              alert('All input fields are required.');
              return false;
          }
          
          return true;
      }
  
    const formData = {
      'username': username,
      'email': email.trim(),
      'address': address.trim(),
      'phone_number': phone.trim(),
    }


    const Update = () => {
        // console.log(user?.token)
        if(!validateForm()) return;
    
        setLoading(true)
    
        fetch(`${UpdateProfileAPI}/${user?.id}`, {
          method: 'PUT',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          }),
          body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(resp => {
          setLoading(false)
          console.log(resp)
          if(resp?.errors){
            return alert(resp?.message)
          }
    
        setUser(resp)
                    
        const userResponse = {
            id: resp.user.id,
            username: resp.user.username,
            phone_number: resp.user.phone_number,
            email: resp.user.email,
            token: user.token,
            address: resp.user.address,
    
        }
                
            setUser(userResponse);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            navigation.goBack()
            alert("Profile updated successfuly.")
        })
        
        .catch(err => {
          setLoading(false)
          console.log(err)
          alert('Something went wrong')
        })
    
    
        
    }
  


  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='px-5 h-full'>
        <View className='flex flex-row pb-2 justify-between items-center mt-1'>
            <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-white rounded-full">
                <AntDesign name='arrowleft' color="#00cc88" size={20} />
            </TouchableOpacity>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Update Profile</Text>

            <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                <AntDesign name='arrowleft' color="#fff" size={18} />
            </TouchableOpacity>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Username</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter username'
              textAlignVertical='center'
              selectionColor='#064929'
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular'}}
              editable={!loading}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Email Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter email address'
            textAlignVertical='center'
            selectionColor='#064929'
            textContentType='emailAddress'
			keyboardType='email-address'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={email}
            onChangeText={setEmail}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Phone Number</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter phone number'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            keyboardType='phone-pad'
            editable={!loading}
            value={phone}
            onChangeText={setPhone}
            />
        </View>

      <View className="space-y-1 mb-10">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter address'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={address}
            onChangeText={setAddress}
            />
        </View>

        <TouchableOpacity
        className="h-14  w-full bg-[#064929] items-center justify-center rounded-md"
        disabled={loading} onPress={Update}
        >
          {
            !loading ? (
              <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Update</Text>
            ) : (
              <ActivityIndicator size={'small'} color={"white"} />
            )
          }
      </TouchableOpacity>
        </>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default UpdateProfile