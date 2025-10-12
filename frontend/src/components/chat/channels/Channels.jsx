import { useTranslation } from 'react-i18next'
import { useRef, useContext, useEffect } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'
import ChannelButton from './ChanelButton'
import PlusIcon from '../../icons/PlusIcon'

const Channels = ({ allChannels, handlerAddChannelModal }) => {
  const lastChannelRef = useRef(null)
  const { t } = useTranslation()
  const { activeChannelId } = useContext(ChannelContext)

  const channelsList = allChannels
    ?.map(channel => (
      <li className="nav-item w-100" ref={channel.id === activeChannelId ? lastChannelRef : null} key={channel.id}>
        <ChannelButton channel={channel} />
      </li>
    ))

  useEffect(() => {
    lastChannelRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allChannels])

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button onClick={handlerAddChannelModal} type="button" className="p-0 text-primary btn btn-group-vertical">
          <PlusIcon />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {/* каналы */}
        {channelsList}
      </ul>
    </div>
  )
}

export default Channels
