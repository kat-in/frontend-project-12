import { ChannelContext } from '../../../contexts/ChannelContext'
import { useContext } from 'react'
import CustomChannel from './CustomChannel'
import RemovableChannel from './removableChannel'
import DropdownMenu from './DropdownMenu'



const ChannelButton = ({ channel }) => {
    const { setActiveChannelId, setActiveDropdownId } = useContext(ChannelContext)

    const handleActiveChannel = (e) => {
        setActiveChannelId(e.target.id)
        setActiveDropdownId(null)
    }

    return (channel.removable ?
        <RemovableChannel channel={channel} handleActiveChannel={handleActiveChannel} >
            <DropdownMenu channel={channel} />
        </RemovableChannel> :
        <CustomChannel channel={channel} handleActiveChannel={handleActiveChannel} />)
}

export default ChannelButton