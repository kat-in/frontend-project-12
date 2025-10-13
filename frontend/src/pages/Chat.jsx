import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetChannelsQuery } from '../api/channelsApi'
import { useGetMessagesQuery } from '../api/messagesApi'
import { useDispatch, useSelector } from 'react-redux'
import { setChannels, addChannel, removeChannel, renameChannel } from '../store/slices/channelsSlice'
import { setMessages, addMessage } from '../store/slices/messagesSlice'
import { ModalContext } from '../contexts/ModalContext'
import { ChannelContext } from '../contexts/ChannelContext'
import Channels from '../components/chat/channels/Channels'
import MessageForm from '../components/chat/messages/MessageForm'
import Messages from '../components/chat/messages/Messages'
import modalType from '../utils/modalMode'
import { useTranslation } from 'react-i18next'

const Chat = ({ socket }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  // const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const { data: channels } = useGetChannelsQuery()
  const { data: messages } = useGetMessagesQuery()

  const { setIsModal, modalMode, setModalMode, setModalData } = useContext(ModalContext)
  const { activeChannelId, setActiveDropdownId } = useContext(ChannelContext)

  const allChannels = useSelector(state => state.allChannels)
  const allMessages = useSelector(state => state.allMessages)

  const handlerAddChannelModal = () => {
    setModalMode('add')
    setModalData({
      name: t('chat.addChannel'),
      submit: t('chat.submit'),
      cancel: t('chat.cancel'),
      channelName: '',
      channelId: '',
    })
    setActiveDropdownId(null)
    setIsModal(true)
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    if (channels) dispatch(setChannels(channels))
    if (messages) dispatch(setMessages(messages))
  }, [token, navigate, dispatch, channels, messages])

  useEffect(() => {
    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload))
    }

    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload))
    }

    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload))
    }

    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload))
    }

    socket.on('newMessage', handleNewMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
    }
  }, [dispatch, socket])

  const Modal = modalType(modalMode)

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels allChannels={allChannels} handlerAddChannelModal={handlerAddChannelModal} />
          <Messages allChannels={allChannels} allMessages={allMessages}>
            <MessageForm channelId={activeChannelId} username={user} />
          </Messages>
        </div>
      </div>
      <Modal />
    </>
  )
}
export default Chat
