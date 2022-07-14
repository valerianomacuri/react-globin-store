import { createContext, PropsWithChildren, useContext } from "react";
import { useCart } from "./useCart";

type CartContextValue = ReturnType<typeof useCart>;

export const CartContext = createContext({} as CartContextValue);

interface CartProdiverProps {
  useCartHook?: typeof useCart;
}

export const CartProvider = ({
  children,
  useCartHook = useCart,
}: PropsWithChildren<CartProdiverProps>) => {
  const value = useCartHook();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
