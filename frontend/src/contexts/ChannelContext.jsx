import { createContext, useState } from 'react';

export const ChannelContext = createContext({});

export const ChannelProvider = ({ children }) => {
  const [activeChannelId, setActiveChannelId] = useState('1')

  return (
    <ChannelContext.Provider value={{ activeChannelId, setActiveChannelId }}>
      {children}
    </ChannelContext.Provider>
    )
}