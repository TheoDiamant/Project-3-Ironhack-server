import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

import SearchPreview from "../SearchPreview/SearchPreview"
import CartSideBar from "../CartSideBar/CartSideBar";

const API_URL = "http://localhost:5005";     

function Navbar() {
    
  const location = useLocation()
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext)
  
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [showCart, setShowCart] = useState(false)

  const [navSelection, setNavSelection] = useState("products")
  const [optionsShown, setOptionsShown] = useState(false)
  const navSelector = useRef(null)
  const navOptions = useRef(null)

  // If the user changes location we set products/users to an empty array to remove the preview to avoid ugly overflows
  useEffect(() => {
    setProducts([])
    setUsers([])
  }, [location])

  function previewProducts(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setProducts([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/preview?q=${e.target.value}`)
        .then(response => {
          setProducts(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  function previewUsers(e) {
    if (e.target.value === "") {
      setTimeout(() => {
        setUsers([])
      }, 500);
    }
    else {
      axios.get(`${API_URL}/api/member-preview?q=${e.target.value}`)
        .then(response => {
          setUsers(response.data)
        })
        .catch(err => console.log(err))
    }
  }

  

  function showOptions() {
    navSelector.current.style.borderBottomLeftRadius = "0"
    navOptions.current.style.zIndex = 12;
    setOptionsShown(true)
  }

  function navSelect(option) {
    navOptions.current.style.zIndex = -1;
    navSelector.current.style.borderBottomLeftRadius = "3px"
    setNavSelection(option)
    setProducts([])
    setUsers([])
    setOptionsShown(false)
  }

  function showCartSideBar() {
    setShowCart(true)
  }

  function retractCart() {
    setShowCart(false)
  }

  return (
    <nav className="projectNavbar">

      <div className="logoDiv">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Vinted_logo.png" alt=""/>
      </div>

      <div className="searchDiv">
        <div className="searchDivWrapper">

          <div className="navSelection" ref={navSelector} onClick={showOptions}>
            <p>Products</p>
            <svg className="navSelectionArrow" viewBox="0 0 16 16"><path d="M8 12L2 6h12z"></path></svg>
          </div>

          <div className="navOptions" ref={navOptions}>
            <div className="navOption firstOption" onClick={() => navSelect("products")}>
              <p>Products</p>
            </div>

            <div className="navOption secondOption" onClick={() => navSelect("members")}>
              <p>Members</p>
            </div>
          </div>

          {optionsShown && <button className="closeNavSelectorButton" onClick={() => navSelect(navSelection)}></button>}

          <form className="searchBarForm">
            <div className="searchBar">

              <div className="glassDiv">
                <img className="glass" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/magnifying-glass-icon.png" alt=""/>
              </div>
            
              {navSelection === "products"
              
              ?
              
              <input type="text" className="searchBarInput" placeholder="Search for products" onChange={previewProducts} /> 

              :

              <input type="text" className="searchBarInput" placeholder="Search for users" onChange={previewUsers} />

              }

            </div>
              
            {products.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={products}/>
            </>
            
            }

            {users.length === 0 ? <></> :
            

            <>
              <hr className="previewDivider"/>
              <SearchPreview data={users}/>
            </>
            
            }            

          </form>
        </div>
      </div>
     
      <div className="buttonsDiv">

       

        {isLoggedIn && (
          <>
            <Link to={`/`}>
             <button className="navbarButton normalColors">Home</button>
           </Link>
           
            <Link to="/new-product">
              <button className="navbarButton invertedColors">Sell</button>
            </Link>
         
            <Link to={`/member/${user._id}`}>
             <button className="navbarButton normalColors">Profile</button>
            </Link>

            <button className="navbarButton logOutButton invertedColors" onClick={logOutUser}>Logout</button>

            <button onClick={showCartSideBar} className="shoppingCartButton normalColors">
              <img className="shoppingCartIcon" src="https://i.imgur.com/yRpFRV5.png" alt="" />
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="navbarButton invertedColors">Sign Up</button>
            </Link>
            
            <Link to="/login">
              <button className="navbarButton normalColors">Login</button>
            </Link>
          </>
        )}


      </div>

      <div className={showCart ? "cartSideBarDiv slideCartIn" : "cartSideBarDiv"}>
        <CartSideBar />
        <div className="cartSideBarDivider"></div>
      </div>

      <div className={showCart ? "dimmerDiv dimming" : "dimmerDiv"}></div>

      {showCart && <button className="retractCartSideBarButton" onClick={retractCart}></button>}
    </nav>
  );
}

export default Navbar;
