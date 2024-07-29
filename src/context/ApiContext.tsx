import React, {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback
} from 'react'
import apiHelper from '../utils/apiHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from './AuthContext'

const ApiContext = createContext(null)

export const useApi = (): any => {
    return useContext(ApiContext)
}

const ApiContextProvider = ({ children }: any) => {
    const { token } = useAuth()
    const [user, setUser] = useState<any>(null)
    const [mostPopularPlaylist, setMostPopularPlaylist] = useState<any>()
    const [newReleasePlaylist, setNewReleasePlaylist] = useState<any>()
    const [currentUserPlaylist, setcurrentUserPlaylist] = useState<any>()
    const [categories, setCategories] = useState<any>()
    const [playlist, setPlaylist] = useState<any>()
    const [currentPlayingSong, setCurrentPlayingSong] = useState<any>()

    //these are general apis that i called across the app
    const fetchUserData = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                '/me',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setUser(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
        }
    }
    const fetchMostPopularPlaylist = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/featured-playlists',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setMostPopularPlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
        }
    }

    const fetchNewReleasePlaylist = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/new-releases',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setNewReleasePlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        } finally {
        }
    }
    const fetchCurrentUserPlaylist = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                '/me/playlists',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setcurrentUserPlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    const fetchCategories = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                '/browse/categories',
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setCategories(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }
    const fetchIndividualPlaylist = async (playlistId: string) => {
        if (!playlistId) {
            console.error('Invalid playlistId')
            return
        }
        try {
            const result = await apiHelper<string>(
                'get',
                `/playlists/${playlistId}`,
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setPlaylist(result.data)
        } catch (error) {
            console.error('Request Error:', error)
        }
    }

    //every api related to player
    const fetchCurrentPlayingSong = async () => {
        try {
            const result = await apiHelper<string>(
                'get',
                `/me/player/currently-playing`,
                undefined,
                undefined,
                token
            ) // GET request with Bearer token
            setCurrentPlayingSong(result.data)
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
        categories,
        setCategories,
        playlist,
        setPlaylist,
        currentPlayingSong,
        setCurrentPlayingSong,
        fetchUserData,
        fetchMostPopularPlaylist,
        fetchNewReleasePlaylist,
        fetchCurrentUserPlaylist,
        fetchCategories,
        fetchIndividualPlaylist,
        fetchCurrentPlayingSong
    }

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
