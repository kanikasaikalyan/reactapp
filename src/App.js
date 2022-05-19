import { useState } from "react";
import Header from "./Components/Layout/Header.js";
import Meals from "./Components/Meals/Meals.js";
import Cart from "./Components/Cart/Cart.js";
import CartProvider from "./Store/CartProvider.js";

function App() {
  const [isClosed, setisClosed] = useState(false);

  function onShow() {
    setisClosed(true);
  }
  function onHide() {
    setisClosed(false);
  }

  return (
    <CartProvider>
      {isClosed && <Cart onClick={onShow} onClose={onHide} />}
      <Header onClick={onShow} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
