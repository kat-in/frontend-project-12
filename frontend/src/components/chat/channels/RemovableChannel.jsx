import { useContext } from 'react'
import { ChannelContext } from '../../../contexts/ChannelContext'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'

const RemovableChannel = ({ channel, handleActiveChannel, children }) => {
  const { activeChannelId, activeDropdownId, setActiveDropdownId } = useContext(ChannelContext)

  const isActive = id => id === activeChannelId ? 'secondary' : 'light'

  const handleDropdown = (e) => {
    const dropdownId = e.target.id.split('-')
    const id = dropdownId[1]
    if (id === activeDropdownId) {
      setActiveDropdownId(null)
    }
    else {
      setActiveDropdownId(id)
    }
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button variant={isActive(channel.id)} onClick={handleActiveChannel} id={channel.id} className="flex-grow-1 text-start">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        onClick={handleDropdown}
        split
        variant={isActive(channel.id)}
        id={`dropdown-${channel.id}`}
        className="flex-grow-0"
      />
      {children}
    </Dropdown>
  )
}

export default RemovableChannel
