import React from 'react'
import { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetChannelsQuery } from '../api/channelsApi'
import { useGetMessagesQuery } from '../api/messagesApi'
import { useDispatch, useSelector } from 'react-redux'
import { setChannels, addChannel, removeChannel } from '../store/slices/channelsSlice'
import { setMessages, addMessage } from '../store/slices/messagesSlice'
import { ModalContext } from '../contexts/ModalContext'
import { ChannelContext } from '../contexts/ChannelContext'
import MessageForm from '../components/MessageForm'
import Modal from '../components/Modal'
import ChannelButton from '../components/chat/channels/ChanelButton'



const Chat = ({ socket }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null)
    const lastChannelRef = useRef(null)

    const token = localStorage.getItem('token')
    // const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)
    const { data: channels } = useGetChannelsQuery();
    const { data: messages } = useGetMessagesQuery();

    const allChannels = useSelector(state => state.allChannels)
    const allMessages = useSelector(state => state.allMessages)
    const { setIsModal, isModal, modalMode, setModalMode, setModalData } = useContext(ModalContext)
    const { activeChannelId, setActiveDropdownId } = useContext(ChannelContext)

    const handlerAddChannelModal = (e) => {
        setModalMode('add')

        setModalData({
            name: 'Добавить канал',
            submit: 'Отправить',
            cancel: 'Отменить',
            channelName: '',
            channelId: '',
        })
        setActiveDropdownId(null)
        setIsModal(true)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        lastChannelRef.current?.scrollIntoView({ behavior: 'smooth' })
    }



    useEffect(() => {
        const handleNewMessage = (payload) => {
            dispatch(addMessage(payload));
        }

        const handleNewChannel = (payload) => {
            dispatch(addChannel(payload));
        }

        const handleRemoveChannel = (payload) => {
            dispatch(removeChannel(payload));
        }

        socket.on('newMessage', handleNewMessage);
        socket.on('newChannel', handleNewChannel);
        socket.on('removeChannel', handleRemoveChannel);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('newChannel', handleNewChannel);
            socket.off('removeChannel', handleRemoveChannel);
        }
    }, [dispatch, socket]);


    useEffect(() => {
        scrollToBottom()
    }, [allMessages, activeChannelId, allChannels])

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        if (channels) dispatch(setChannels(channels))
        if (messages) dispatch(setMessages(messages))

    }, [token, navigate, dispatch, channels, messages])


    const activeChannelName = allChannels.filter(ch => ch.id === activeChannelId).map(ch => ch.name)

    const channelsList = allChannels
        ?.map(channel => (<li className='nav-item w-100' ref={channel.id === activeChannelId ? lastChannelRef : null} key={channel.id}><ChannelButton channel={channel} /></li>))

    const messagesList = allMessages
        ?.filter(channel => channel.channelId === activeChannelId)
        .map(message => (<div key={message.id} className="text-break mb-2"><b>{message.username}</b>: {message.body}</div>))

    return (
        <>
            <div className='container h-100 my-4 overflow-hidden rounded shadow'>
                <div className="row h-100 bg-white flex-md-row">

                    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex" >
                        <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                            <b>Каналы</b>
                            <button onClick={handlerAddChannelModal} type='button' className='p-0 text-primary btn btn-group-vertical'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path></svg>
                                <span className="visually-hidden">+</span>
                            </button>
                        </div>
                        <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block' >
                            {/* каналы */}
                            {channelsList}
                        </ul>
                    </div>
                    <div className="col p-0 h-100">
                        <div className='d-flex flex-column h-100'>
                            <div className='bg-light mb-4 p-3 shadow-sm small'>
                                <p className="m-0"><b># {activeChannelName}</b></p>
                                <span className="text-muted">{messagesList.length} сообщений</span>
                            </div>
                            {/* сообщения */}
                            <div id="messages-box" className="chat-messages overflow-auto px-5 d-flex flex-column  flex-grow-1 ">
                                {messagesList}
                                <div ref={messagesEndRef} />
                            </div>
                            <MessageForm channelId={activeChannelId} username={user} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal />
        </>
    )
}
export default Chat
