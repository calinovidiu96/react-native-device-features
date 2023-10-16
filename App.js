import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
	const [dbInitialized, setDbInitialized] = useState();

	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (dbInitialized) {
		SplashScreen.hideAsync();
	}

	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerBackTitle: 'Back',
						headerStyle: { backgroundColor: Colors.primary500 },
						headerTintColor: Colors.gray700,
						contentStyle: { backgroundColor: Colors.gray700 },
					}}
				>
					<Stack.Screen
						name='AllPlaces'
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'Favorite Places',
							headerRight: ({ tintColor }) => (
								<IconButton
									icon='add'
									size={26}
									color={tintColor}
									onPress={() => navigation.navigate('AddPlace')}
								/>
							),
						})}
					/>
					<Stack.Screen
						name='AddPlace'
						component={AddPlace}
						options={{
							title: 'Add a new Place',
						}}
					/>
					<Stack.Screen name='Map' component={Map} />
					<Stack.Screen
						name='PlaceDetails'
						component={PlaceDetails}
						options={{
							title: 'Loading Place...',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
