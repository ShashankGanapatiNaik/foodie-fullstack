import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({ id, name, price, description, delivery, image }) => {
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-img" src={url + "/images/" + image} alt={name} />

                {!cartItem[id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove"
                        />
                        <p>{cartItem[id]}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add more"
                        />
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-description">{description}</p>
                <div className="food-item-style">
                    <p className="food-item-price">${price}</p>
                    <p className="food-item-delivery">{delivery}Km</p>
                </div>

            </div>
        </div>
    );
};

export default FoodItem;
