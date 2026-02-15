import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import "./MyOrder.css"
import { StoreContext } from '../../context/storeContext'
import { assets } from '../../assets/assets'
const MyOrder = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setdata] = useState([])
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setdata(response.data.data)
        console.log(response.data.data);

    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-order-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + "X" + item.quantity
                                } else {
                                    return item.name + "X" + item.quantity + ","
                                }
                            })}</p>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default MyOrder
