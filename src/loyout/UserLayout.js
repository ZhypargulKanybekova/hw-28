import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/header/Header'
import { Basket } from '../components/basket/Basket'

export const UserLayout = () => {

    const [toggle, setToggle] = useState(false)

    const toggleHandler = useCallback(() => {
      setToggle((prev) => !prev)
    }, [])

  return (
    <div>
       <Header toggleHandler={toggleHandler} />
      {toggle && <Basket toggleHandler={toggleHandler} />}
      <div style={{marginTop:'100px'}}>

       <Outlet/>
      </div>
    </div>
  )
}
