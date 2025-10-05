import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetChannelsQuery } from '../services/channelsApi'
import { useAddMessageMutation, useGetMessagesQuery } from '../services/messagesApi'
import { useDispatch, useSelector } from 'react-redux'
import { setChannels } from '../store/slices/channelsSlice'
import { setMessages } from '../store/slices/messagesSlice'
import MessageForm from '../components/MessageForm'

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const { data: channels } = useGetChannelsQuery();
    const { data: messages } = useGetMessagesQuery();

    const allChannels = useSelector(state => state.allChannels)

    const allMessages = useSelector(state => state.allMessages)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        if (channels) {
            dispatch(setChannels(channels))
        }
         if (messages) {
            dispatch(setMessages(messages))
        }

    }, [token, navigate, dispatch, channels])

    return (
        <>
            <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>Каналы</b>
                        <button type='button' className='p-0 text-primary btn btn-group-vertical'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path></svg>
                            <span className="visually-hidden">+</span>
                        </button>
                    </div>
                    <ul id='channels-box' className='nav flex-grow-1 flex-column nav-pills nav-fill px-2 mb-3 overflow-auto'>
                        {allChannels.map(channel => (<li className='nav-item w-100' key={channel.id}>
                            {/* для активного канала добавляем btn-secondary */}
                            <button type="button" className="w-100 rounded-0 text-start btn"><span className="me-1">#</span>{channel.name}</button>
                        </li>))}
                    </ul>
                </div>
                <div className="col p-0 h-100">
                    <div className='d-flex flex-column h-100'>
                        <div className='bg-light mb-4 p-3 shadow-sm small'>
                            <p className="m-0"><b># general</b></p>
                            <span className="text-muted">0 сообщений</span>
                        </div>
                        {/* сообщения */}
                        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                            {allMessages?.map(message => (
                                <div key={message.id} className="text-break mb-2"><b>{message.username}</b>: {message.body}</div>
                            ))}
                        </div>
                        <MessageForm/>
        
                    </div>

                </div>
            </div>
        </>
    )
}
export default HomePage