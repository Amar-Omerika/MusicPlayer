import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { ThemeColors } from '../constants/ThemeColors'
//screens
import Login from '../screens/Login'
import Home from '../screens/Home'

//images
import { HomeActiveIcon, HomeInactiveIcon } from '../assets'
import { Image } from 'react-native'

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
        tabBarLabel: 'home'
    }
]

const TabNavigator = createBottomTabNavigator()
const TabNavigatorScreen = () => (
    <TabNavigator.Navigator
        initialRouteName={'Home'}
        screenOptions={({ route }) => ({
            ...defaultStackOptions,
            tabBarIcon: ({ focused }) => {
                const tab = TabBarConfig.find(
                    ({ tabBarLabel }) => tabBarLabel === route.name
                )
                if (tab) {
                    return (
                        <Image
                            source={focused ? tab.activeIcon : tab.inactiveIcon}
                            style={{ width: 24, height: 24 }} // Set the width and height as per your design
                        />
                    )
                }
            },
            tabBarStyle: {
                borderTopWidth: 0,
                elevation: 35,
                shadowColor: '#000',
                backgroundColor: ThemeColors.darkBlue
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'black'
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
