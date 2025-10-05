import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
 const navigate = useNavigate()
  const token = localStorage.getItem('userId')

  useEffect(() => {
  if (!token) {
  navigate('/login')
}


}, [] )
return (
    <><h3 className="text-center">Секретная страница</h3></>
 )
}

export default HomePage