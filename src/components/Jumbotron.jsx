import React from "react";
import Iphone from "../assets/images/iphone-14.jpg";
import HoldingIphone from "../assets/images/iphone-hand.png";

function Jumbotron() {
  const handleLearnMore = () => {
    //for the scrolling of learn more
    const element = document.querySelector(".sound-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().top, // this fn will return the position, nd we wana access the top position
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="jumbotron-section wrapper">
      <h2 className="tile">New</h2>
      <img src={Iphone} alt="Iphone 14 pro" />
      <p className="text">Big and Bigger</p>
      <span className="description">
        From $49/mo. for 24 mo. or $999 before trade-in
      </span>
      <ul className="links">
        <li>
          <button className="button">Buy</button>
        </li>
        <li>
          <a className="link" onClick={handleLearnMore}>
            Learn More
          </a>
          <img src={HoldingIphone} alt="iphone" className="iphone-img" />
        </li>
      </ul>
    </div>
  );
}

export default Jumbotron;
