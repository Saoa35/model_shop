import React, { useEffect, useState } from "react";
import { Card } from "./components/Card";
import Cart from "./components/Cart";
import Header from "./components/Header";

const url = 'https://63540251e64783fa827d56c7.mockapi.io/items';

function App() {

  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [serchValue, setSerchValue] = useState('');

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.log(error.mesage));
  },[]);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
    // setCartItems([...cartItems, obj]);
  };

  const onChangeInput = (event) => {
    setSerchValue(event.target.value);
  }

  return (
    <div className="wrapper">

      {cartOpened && <Cart onCloseCart={() => setCartOpened(false)} items={cartItems} />}
      
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">

        <div className="content-header">
          <h1>{serchValue ? `Serching: ${serchValue}` : 'All Items'}</h1>
          <div className="search-block">
            <img src='/img/search.svg' alt='Search'/>
            <input onChange={onChangeInput} value={serchValue} placeholder="Searh..."/>
          </div>
        </div>
       
        <div className='goods'>

          {items
            .filter(item => item.title.toUpperCase().includes(serchValue.toUpperCase()))
            .map((item, index) => 
              <Card key={index} 
                    title={item.title} 
                    img={item.imgUrl} 
                    price={item.price} 
                    onFavorite={() => console.log('Clicked favorite')}
                    onPlus={obj => onAddToCart(obj)}
              />
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
