import {
  BrowserRouter,
  HashRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Cart } from "./Cart";
import { CartProvider } from "./CartContext";
import { Checkout } from "./Checkout";
import { Home } from "./Home";
import { OrderSummary } from "./OrderSummary";
import { Header } from "./shared/Header";

const App = () => {
  return (
    <CartProvider>
      <HashRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<OrderSummary />} />
            <Route path="*" element={<>Page not found</>} />
          </Routes>
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
