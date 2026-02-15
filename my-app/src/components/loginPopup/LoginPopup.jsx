import React, { useContext } from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"
const LoginPopup = ({ setshowLogin }) => {
    const { url, settoken } = useContext(StoreContext)
    const [currentState, setcurrentState] = useState("Sign up")
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }
    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (currentState == "Login") {
            newUrl += "/api/user/login"

        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            settoken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setshowLogin(false)
        } else {
            alert(response.data.message)
        }

    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container' >
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currentState === "Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currentState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continueing, i agree to the terms and condition</p>
                </div>
                {currentState === "Login" ? <p>Create a new account <span onClick={() => setcurrentState("Sign up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setcurrentState("Login")} > Login here</span></p>}


            </form>
        </div >
    )
}

export default LoginPopup
