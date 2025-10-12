import { useTranslation } from 'react-i18next'
import { useRef, useContext, useEffect } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'

const Messages = ({ children, allMessages, allChannels }) => {
  const messagesEndRef = useRef(null)
  const { t } = useTranslation()
  const { activeChannelId } = useContext(ChannelContext)

  const messagesList = allMessages
    ?.filter(channel => channel.channelId === activeChannelId)
    .map(message => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        :
        {' '}
        {message.body}
      </div>
    ))

  const activeChannelName = allChannels.filter(ch => ch.id === activeChannelId).map(ch => ch.name)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages, activeChannelId])

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">{t('chat.message', { count: messagesList.length })}</span>
        </div>
        {/* сообщения */}
        <div id="messages-box" className="chat-messages overflow-auto px-5 d-flex flex-column  flex-grow-1 ">
          {messagesList}
          <div ref={messagesEndRef} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Messages
