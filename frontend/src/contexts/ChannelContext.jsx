import { createContext, useState } from 'react'

export const ChannelContext = createContext({})

export const ChannelProvider = ({ children }) => {
  const [activeChannelId, setActiveChannelId] = useState('1')
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  return (
    <ChannelContext.Provider value={{ activeChannelId, setActiveChannelId, setActiveDropdownId, activeDropdownId }}>
      {children}
    </ChannelContext.Provider>
  )
}
