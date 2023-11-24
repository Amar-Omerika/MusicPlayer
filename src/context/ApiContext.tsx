import React, { useContext, createContext, useState, useEffect } from 'react'
import apiHelper from '../utils/apiHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ApiContext = createContext(null)

export const useApi = (): any => {
    return useContext(ApiContext)
}

const ApiContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(true) // Set initial loading to true
    const [user, setUser] = useState<any>(null)
    const [mostPopularPlaylist, setMostPopularPlaylist] = useState<any>()
    const [newReleasePlaylist, setNewReleasePlaylist] = useState<any>()
    const [currentUserPlaylist, setcurrentUserPlaylist] = useState<any>()
    const [categories, setCategories] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // Fetch data for all APIs
                await Promise.all([
                    fetchUserData(),
                    fetchMostPopularPlaylist(),
                    fetchNewReleasePlaylist(),
                    fetchCurrentUserPlaylist(),
                    fetchCategories()
                ])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                // setLoading(false)
            }
        }
        fetchData()
    }, [])

    const fetchUserData = async () => {
        const token = await AsyncStorage.getItem('token')
        const accessTokenNonNull: string = token!
        setLoading(true)
        try {
            const result = await apiHelper<string>(
                'get',
                '/me',
                undefined,
                undefined,
                accessTokenNonNull
            ) // GET request with Bearer token
            setUser(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
            setLoading(false)
        }
    }
    const fetchMostPopularPlaylist = async () => {
        const token = await AsyncStorage.getItem('token')
        const accessTokenNonNull: string = token!
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/featured-playlists',
                undefined,
                undefined,
                accessTokenNonNull
            ) // GET request with Bearer token
            setMostPopularPlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
        }
    }

    const fetchNewReleasePlaylist = async () => {
        const token = await AsyncStorage.getItem('token')
        const accessTokenNonNull: string = token!
        setLoading(true)
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/new-releases',
                undefined,
                undefined,
                accessTokenNonNull
            ) // GET request with Bearer token
            setNewReleasePlaylist(result.data)
            setLoading(false)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
        }
    }
    const fetchCurrentUserPlaylist = async () => {
        const token = await AsyncStorage.getItem('token')
        const accessTokenNonNull: string = token!
        setLoading(true)
        try {
            const result = await apiHelper<string>(
                'get',
                '/me/playlists',
                undefined,
                undefined,
                accessTokenNonNull
            ) // GET request with Bearer token
            setcurrentUserPlaylist(result.data)
            setLoading(false)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    const fetchCategories = async () => {
        const token = await AsyncStorage.getItem('token')
        const accessTokenNonNull: string = token!
        setLoading(true)
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/categories',
                undefined,
                undefined,
                accessTokenNonNull
            ) // GET request with Bearer token
            setCategories(result.data)
            setLoading(false)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }

    const value: any = {
        user,
        setUser,
        mostPopularPlaylist,
        setMostPopularPlaylist,
        newReleasePlaylist,
        setNewReleasePlaylist,
        currentUserPlaylist,
        setcurrentUserPlaylist,
        loading,
        setLoading,
        categories,
        setCategories,
        fetchUserData,
        fetchMostPopularPlaylist,
        fetchNewReleasePlaylist,
        fetchCurrentUserPlaylist,
        fetchCategories
    }

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
