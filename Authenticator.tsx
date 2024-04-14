import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AppContext } from './Providers/AppProvider';
import StackNavigator from './Navigators/StackNavigator';
import AuthStack from './Navigators/AuthStack';


const Authenticator = () => {
	const { user, setUser } = useContext<any>(AppContext)
	// const [ loading, setLoading ] = useState<boolean>(true);
	const [ loading, setLoading ] = useState<boolean>(false);

	useEffect(() => {
		// SecureStore.getItemAsync('user')
		// .then(userString => {
		// 	if (userString) {
		// 		let userObject = JSON.parse(userString)
		// 		setUser(userObject);
		// 	}
		// 	setLoading(false);
		// })
		// .catch(err => {
		// 	setLoading(false);
		//   	console.log(err);
		// })
	}, []);

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" color={"#064929"} />
			</View>
		)
	}

	if(user !== null && user !== undefined && user?.length > 1) return <StackNavigator />;
	else return <AuthStack />;
}

export default Authenticator