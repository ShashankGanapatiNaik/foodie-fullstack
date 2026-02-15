import React, { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import { assets } from '../../assets/assets'
import './cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cartItem, addToCart, removeFromCart, food_list, getTotalCartAmount, url } = useContext(StoreContext)
    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div className="cart-item">
                <div className="cart-item-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItem[item._id] > 0) {
                        return (

                            <div>
                                <div className="cart-item-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>${item.price * cartItem[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                                </div>
                                <hr />
                            </div>



                        )
                    }

                })}
            </div>
            <div className="cart-bottom">
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
                            <p className="delivery-para">
                                $
                                {
                                    getTotalCartAmount() === 0 ? 0 : 2}

                            </p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                $
                                {getTotalCartAmount() + 2}

                            </b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>Proceed to checkout</button>
                </div>
                <div className="cart-promo-code">
                    <div>
                        <p>If you have a promo code enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Cart
