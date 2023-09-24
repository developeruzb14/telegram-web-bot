import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { getData } from './constants/db'
import Card from './components/Card/card'
import Cart from './components/cart/cart'

const courses = getData()

const App = () => {

  const telegram = window.Telegram.WebApp;

  useEffect(() => {
    telegram.ready()
  })

  const [cartItems, setCartItems] = useState([])

  const onAddItem = item => {

    const existItem = cartItems.find(c => c.id == item.id)

    if(existItem) {
      const newData = existItem.map(c => c.id == item.id ? {...existItem, quantity: existItem.quantity + 1} : c)
      setCartItems(newData)
    } else {
      const newData = [...cartItems, {...item, quantity: 1}]
      setCartItems(newData)
    }
  }

  const onRemoveItem = item => {
    const existItem = cartItems.find(c => c.id == item.id)

    if(existItem) {
      const newData = cartItems.filter(c => c.id != existItem.id)
      setCartItems(newData)
    } else {
      const newData = existItem.map(c => c.id == existItem.id ? {...existItem, quantity: - 1} : c)
      setCartItems(newData)
    }
  }

  const onChekout = () => {
    telegram.MainButton.text = 'Sotib olish :)'
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)
    return () => telegram.onEvent('mainButtonClicked', onSendData)
  }, [onSendData])

  return (
    <>
      <h1 className='heading'>Frontend kurslari</h1>
      <Cart cartItems={cartItems} onChekout={onChekout} />
      <div className='cards__container'>
        {courses.map(course => (
          <Card key={course.id} course={course} onAddItem={onAddItem} onRemoveItem={onRemoveItem}/>
        ))}
      </div>
    </>
  )
}

export default App

