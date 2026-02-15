import React, { useContext, useState, useEffect } from 'react'
import './PlaceHolder.css'
import axios from "axios"
import { StoreContext } from '../../context/storeContext'

const PlaceHolder = () => {
    const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext)
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItem && cartItem[item._id] && cartItem[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItem[item._id]
                orderItems.push(itemInfo)
            }
        })
        // console.log(orderItems)
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Error")
        }
    }
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }
    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return (
        <form onSubmit={placeOrder} className='place-order' action="">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
                    <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Adress' />
                <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Sub total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed to Payment</button>
                </div>
            </div>
        </form>


    )
}

export default PlaceHolder
