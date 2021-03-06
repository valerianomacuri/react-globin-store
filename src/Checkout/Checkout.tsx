import { useNavigate } from "react-router-dom";
import { useCartContext } from "../CartContext/CartContext";
import { postCheckout } from "../utils/api";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutList } from "./CheckoutList";

interface CheckoutProps {
  useCartHook?: typeof useCartContext;
}

export const Checkout = ({ useCartHook = useCartContext }: CheckoutProps) => {
  const { products, totalPrice, clearCart } = useCartHook();
  const navigate = useNavigate();
  const submitCheckout = async () => {
    const { orderId } = await postCheckout({
      products,
    });
    clearCart();
    navigate(`/order?orderId=${orderId}`);
  };

  return (
    <section className="nes-container with-title">
      <h1 className="title">Checkout</h1>
      <div className="nes-container is-rounded checkout-list-wrapper">
        <p>You are going to buy:</p>
        <CheckoutList products={products} />
        <p>Total: {totalPrice()} Zm</p>
      </div>
      <p>Enter your payment credentials:</p>
      <CheckoutForm submit={submitCheckout} />
    </section>
  );
};
