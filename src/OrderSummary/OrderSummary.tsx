import { Loader } from "../shared/Loader";
import { Link, useSearchParams } from "react-router-dom";
import { useOrder } from "./useOrder";

interface OrderSummaryProps {
  useOrderHook?: typeof useOrder;
}

export const OrderSummary = ({
  useOrderHook = useOrder,
}: OrderSummaryProps) => {
  const [searchParams] = useSearchParams();
  const { isLoading, order } = useOrderHook(
    searchParams.get("orderId") || "-1"
  );
  console.log(searchParams.get);
  if (isLoading) {
    return <Loader />;
  }

  if (!order) {
    return <div>Couldn't load order info.</div>;
  }

  return (
    <section className="nes-container with-title">
      <h1 className="title">Order Summary</h1>
      <div className="nes-container is-rounded order-summary-container">
        <ul className="nes-list is-circle">
          {order.products.map((product) => {
            return <li key={product.name}>{product.name}</li>;
          })}
        </ul>
      </div>
      <Link to="/">
        <button className="nes-btn is-primary">Back to the store</button>
      </Link>
    </section>
  );
};
