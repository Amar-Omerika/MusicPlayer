import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ThemeColors } from '../constants/ThemeColors'
//screens
import Login from '../screens/Login'
import Home from '../screens/Home'

//images
import {
    HomeActiveIcon,
    HomeInactiveIcon,
    SearchActiveIcon,
    SearchInActiveIcon,
    LibraryActiveIcon,
    LibraryInActiveIcon
} from '../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'

const defaultStackOptions = {
    headerShown: false
}
const AuthStack = createStackNavigator()
const AuthStackScreen = () => (
    <AuthStack.Navigator
        initialRouteName={'Login'}
        screenOptions={{ ...defaultStackOptions }}
    >
        <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

/**
 * Tab bar configuration
 */
const TabBarConfig = [
    {
        screen: Home,
        activeIcon: HomeActiveIcon,
        inactiveIcon: HomeInactiveIcon,
        tabBarLabel: 'Home'
    },
    {
        screen: Home,
        activeIcon: SearchActiveIcon,
        inactiveIcon: SearchInActiveIcon,
        tabBarLabel: 'Search'
    },
    {
        screen: Home,
        activeIcon: LibraryActiveIcon,
        inactiveIcon: LibraryInActiveIcon,
        tabBarLabel: 'Your Library'
    }
]

const TabNavigator = createBottomTabNavigator()
const TabNavigatorScreen = () => (
    <TabNavigator.Navigator
        initialRouteName={'Home'}
        screenOptions={({ route }) => ({
            ...defaultStackOptions,
            tabBarIcon: ({ focused, size }) => {
                const tab = TabBarConfig.find(
                    ({ tabBarLabel }) => tabBarLabel === route.name
                )
                return (
                    tab &&
                    (focused ? (
                        <tab.activeIcon size={size} />
                    ) : (
                        <tab.inactiveIcon size={size} />
                    ))
                )
            },
            tabBarStyle: {
                borderTopWidth: 0,
                elevation: 35,
                shadowColor: '#000',
                height: 70,
                backgroundColor: ThemeColors.darkBlue
            },
            tabBarLabelStyle: {
                fontSize: 10,
                marginTop: -10,
                paddingBottom: 10
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: ThemeColors.lightGrey
        })}
    >
        {TabBarConfig.map(({ screen, tabBarLabel }) => (
            <TabNavigator.Screen
                key={tabBarLabel}
                name={tabBarLabel}
                options={{ headerShown: false }}
                component={screen}
            />
        ))}
    </TabNavigator.Navigator>
)

const RootStack = createStackNavigator()
const RootStackScreen = () => {
    const [token, setToken] = useState<any>()
    const [isNavigatorReady, setNavigatorReady] = useState(false)
    const navigation: any = useNavigation()

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem('token')
            const expirationDate = await AsyncStorage.getItem('expirationDate')
            setToken(accessToken)
            setNavigatorReady(true)
            // console.log('acess token', accessToken)
            // console.log('expiration date', expirationDate)

            if (accessToken && expirationDate) {
                const currentTime = Date.now()
                if (currentTime < parseInt(expirationDate)) {
                    // here the token is still valid
                    setNavigatorReady(true)
                } else {
                    // token would be expired so we need to remove it from the async storage
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('expirationDate')
                    setNavigatorReady(true)
                }
            }
        }

        checkTokenValidity()
    }, [token])

    if (!isNavigatorReady) {
        // Return a loading indicator or any other appropriate component
        return null
    }
    if (!token) {
        navigation.navigate('Auth')
    }

    return (
        <RootStack.Navigator screenOptions={{ ...defaultStackOptions }}>
            <RootStack.Screen name="App" component={TabNavigatorScreen} />
            <RootStack.Screen name="Auth" component={AuthStackScreen} />
        </RootStack.Navigator>
    )
}

export default function Navigator() {
    return <RootStackScreen />
}
