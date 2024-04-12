import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Categories from './components/Categories';
import FeaturedRow from './components/FeaturedRow';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigators/StackNavigator';

export default function App() {
  return (
		<NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
