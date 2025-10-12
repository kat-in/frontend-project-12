import cn from 'classnames'
import { useContext } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'
import { useTranslation } from 'react-i18next'

const RemovableChannel = ({ channel, handleActiveChannel, children }) => {
  const { t } = useTranslation()

  const { activeChannelId, activeDropdownId, setActiveDropdownId } = useContext(ChannelContext)

  const channelRemovableClassList = (id) => {
    return cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-truncate',
      { 'btn-secondary': id === activeChannelId }
    )
  }

  const buttonRemovableClassList = (id, removable) => {
    return cn('flex-grow-0', 'btn',
      {
        'btn-secondary': id === activeChannelId,
        'dropdown-toggle': removable,
        'dropdown-toggle-split': removable,
      }
    )
  }

  const handleDropdown = (e) => {
    const id = e.target.id
    if (id === activeDropdownId) {
      setActiveDropdownId(null)
    }
    else {
      setActiveDropdownId(id)
    }
  }

  return (
    <div role="group" className="d-flex dropdown btn-group">
      <button onClick={handleActiveChannel} type="button" id={channel.id} className={channelRemovableClassList(channel.id)}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
      <button onClick={handleDropdown} type="button" id={channel.id} aria-expanded="false" className={buttonRemovableClassList(channel.id, channel.removable)}>
        <span className="visually-hidden">{t('chat.controlChannel')}</span>
      </button>
      {children}
    </div>
  )
}

export default RemovableChannel
