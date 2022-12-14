import { useContext } from "react";
import AppContext from "../context";


export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((prev, obj) => obj.price + prev, 0 );

  return { cartItems, setCartItems, totalPrice };
};