import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            style={{ height: "85px", width: "85px" }}
            src={assets.logo}
            alt=""
          />
          <p>
            Lorem Ipsum text hello whre a re you and writtent not be a shshank
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GEt in touch</h2>
          <ul>
            <li>2132323244</li>
            <li>shashan@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-cpoyright">Copyright 2025 c All right reserved</p>
    </div>
  );
};

export default Footer;
