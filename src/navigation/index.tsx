import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import Login from '../screens/Login'
import Home from '../screens/Home'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

const defaultStackOptions = {
    headerShown: false
}
const AuthStack = createStackNavigator()
const AuthStackScreen = () => (
    <AuthStack.Navigator
        initialRouteName={'Login'}
        screenOptions={defaultStackOptions}
    >
        <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

const TabNavigator = createBottomTabNavigator()
const TabNavigatorScreen = () => (
    <TabNavigator.Navigator
        initialRouteName={'Home'}
        screenOptions={defaultStackOptions}
    >
        <AuthStack.Screen name="Home" component={Home} />
    </TabNavigator.Navigator>
)

const RootStack = createStackNavigator()
const RootStackScreen = () => {
    //   const userToken = useSelector((state) => state.login.userToken);

    // const navigation = useNavigation()

    // if (!userToken) {
    //     navigation.navigate('Auth')
    // }

    return (
        <RootStack.Navigator
            screenOptions={{
                ...defaultStackOptions
            }}
        >
            <RootStack.Screen name="Auth" component={AuthStackScreen} />
            <RootStack.Screen name="App" component={TabNavigatorScreen} />
        </RootStack.Navigator>
    )
}

export default function Navigator() {
    return <RootStackScreen />
}
