import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetChannelsQuery } from '../services/channelsApi'
import { useDispatch, useSelector } from 'react-redux'
import { setChannels } from '../store/slices/channelsSlice'

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const { data: channels, isLoading, error } = useGetChannelsQuery();

    const allChannels = useSelector(state => state.allChannels)

    useEffect(() => {
        if (!token) {
             navigate('/login')
        return
           
        } 
        if (channels) {
             dispatch(setChannels(channels))
        }
       
    }, [token, navigate, dispatch, channels])

    // useEffect(() => {
    //     if (channels) {
    //         dispatch(setChannels(channels))
    //     }
    // }, [channels, dispatch])

    return (
        <>
            <h3 className="text-center">Чаты</h3>
            <ul>
                {allChannels.map(channel => (<li key={channel.id}>{channel.name}</li>))}
            </ul>
        </>
    )
}
export default HomePage