import React from 'react'
import Button from '../Button/button'
import './cart.css'
import {totalPrice} from '../../units/total-price'

const Cart = ({cartItems, onChekout}) => {
  return (
    <div className='cart__container'>
        <p>Umumiy narx:{totalPrice(cartItems).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })}</p>

        <Button title={`${cartItems == 0 ? 'Buyurtma breish' : "To'lov"}`} type={'checkout'} disable={cartItems.length == 0 ? true : false} onClick={onChekout}/>
    </div>
  )
}

export default Cart