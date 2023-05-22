import "./HomePage.css";
import { Link, useLocation } from "react-router-dom";
import LatestProducts from "../../components/LatestProducts/LatestProducts"
import FollowerWardrobe from "../../components/FollowerWardrobe/FollowerWardrobe";
import StickyButton from "../../components/StickyButton/StickyButton";

const HomePage = () => {
  return (
    <div>
      <div className="background-image"></div>\

        <div className="overlay">
          <div className="text">
            <span>Give a second life<br />to your clothes</span>
            <Link to="/new-product">
            <button className="buttonOverlay"><span>Sell now</span></button>
            </Link>
          </div>
        </div>
      <div className="container">

        <h1 className="latestProductsText">Recommended for you</h1>
        <LatestProducts />

        <FollowerWardrobe />
      </div>
    </div>
  );
};

export default HomePage;