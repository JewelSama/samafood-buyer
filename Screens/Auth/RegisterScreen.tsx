import { ScrollView, TouchableOpacity, Image, Text, View, TextInput, useColorScheme, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { isEmpty } from '../../utils';
import { RegisterAPI } from '../../endpoints';

const RegisterScreen = ( {navigation}: any ) => {
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirPassword, setConfirPassword] = useState('')


  const validateForm = () => {
		if(
			isEmpty(username) || isEmpty(email) || isEmpty(phone) || isEmpty(address) || isEmpty(password) || isEmpty(confirPassword)
		){
			alert('All input fields are required.');
			return false;
		}
		
		return true;
	}

  const formData = {
    'username': username.trim(),
    'email': email.trim(),
    'address': address.trim(),
    'phone_number': phone.trim(),
    'password': password.trim(),
    'password_confirmation': confirPassword.trim()
  }


  const Register = () => {
    if(!validateForm()) return;

    if(!isEmpty(password) && !isEmpty(confirPassword) && password !== confirPassword){
      return alert("Passwords do not match.")
    }

    setLoading(true)

    fetch(`${RegisterAPI}`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json'
      }),
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(resp => {
      setLoading(false)
      console.log(resp)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })


    
  }

  return (
    <SafeAreaView className='h-full'>
    <View className="px-4 h-full">
      <TouchableOpacity disabled={loading} className='mt-3' onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={'#000'} size={20} />
      </TouchableOpacity>
      <View className="mt-5 space-y-2">
        <Text className="text-3xl" style={{fontFamily: 'Bold'}}>Set up your account</Text>
        <Text className="text-slate-500 text-base" style={{fontFamily: 'SemiBold'}}>Set up your account to begin deliveries</Text>
      </View>
      <ScrollView className="mt-7 space-y-3 h-full bg-red-30" showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets  contentContainerStyle={{paddingBottom: 60}}>
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

      <View className="space-y-1">
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

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={password}
            onChangeText={setPassword}
			      secureTextEntry={true}
            />
        </View>
        <View className="space-y-1 mb-5">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Confirm Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={confirPassword}
            onChangeText={setConfirPassword}
			      secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
        className="h-14  w-full bg-[#064929] items-center justify-center rounded-md"
        disabled={loading} onPress={Register}
        >
          {
            !loading ? (
              <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Continue</Text>
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

export default RegisterScreen