import FoodGrid from "./components/FoodGrid";
import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <FoodGrid />
      </CartContextProvider>
    </>
  );
}

export default App;
