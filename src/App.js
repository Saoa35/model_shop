import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

const url = 'https://63540251e64783fa827d56c7.mockapi.io';

function App() {

  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [serchValue, setSerchValue] = useState('');
  const [favorites, setFavorites] =useState([]);

  useEffect(() => {
    async function fetchData () {
      const cartResponse = await fetch(`${url}/cart`);
      const favoritesResponse = await fetch(`${url}/favorites`);
      const itemsResponse = fetch(`${url}/items`);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
  },[]);

  const onAddToCart = (obj) => {
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))) {
        fetch(`${url}/cart/${obj.id}`, {
          method: 'DELETE',
          })
          .then(response => response.json())
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        fetch(`${url}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(obj)
      });
      setCartItems(prev => [...prev, obj]);
    // setCartItems([...cartItems, obj]);
      }
    } catch (error) {
      console.log();
    }
  };


  const onRemoveFromCart = (id) => {
    fetch(`${url}/cart/${id}`, {
      method: 'DELETE',
      })
      .then(response => response.json())

    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const onChangeInput = (event) => {
    setSerchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find(object => object.id === obj.id)) {
        fetch(`${url}/favorites/${obj.id}`, {
          method: 'DELETE',
          })
          .then(response => response.json());
          setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const {data} = await fetch(`${url}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(obj)
      });
      setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      console.log('Item could not be added to Favorites');
    }
  };

  return (
    <div className="wrapper">

      {cartOpened && <Cart onCloseCart={() => setCartOpened(false)} items={cartItems} onRemove={onRemoveFromCart} />}
      
      <Header onClickCart={() => setCartOpened(true)} />
        
      <Route path="/" exact>
        <Home 
          serchValue={serchValue} 
          items={items}
          cartItems={cartItems}
          onChangeInput={onChangeInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart} />
      </Route>

      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
      
    </div>
  );
}

export default App;
