import { createContext } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null)
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
const StoreContextProvider = ({ children }) => {
    const [cartItem, setcartItem] = useState({})
    const [food_list, setfood_list] = useState([])
    const [token, settoken] = useState("")
    const url = "http://localhost:4000"

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setcartItem((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setfood_list(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setcartItem(response.data.cartData)
    }
    useEffect(() => {

        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        food_list,
        cartItem,
        setcartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider