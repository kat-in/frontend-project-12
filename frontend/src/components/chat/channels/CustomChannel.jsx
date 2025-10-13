import cn from 'classnames'
import { useContext } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'

const CustomChannel = ({ channel, handleActiveChannel }) => {
  const { activeChannelId } = useContext(ChannelContext)

  const channelClassList = (id, removable) => {
    return cn('w-100', 'rounded-0', 'text-start', 'btn',
      {
        'btn-secondary': id === activeChannelId,
        'dropdown-toggle': removable,
        'dropdown-toggle-split': removable,
      },
    )
  }
  return (
    <button onClick={handleActiveChannel} type="button" id={channel.id} className={channelClassList(channel.id, channel.removable)}>
      <span className="me-1">#</span>
      {channel.name}
    </button>
  )
}

export default CustomChannel
