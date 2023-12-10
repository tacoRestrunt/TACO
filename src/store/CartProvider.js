import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const existedCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existedCartItem = state.items[existedCartItemIndex];
    let updateItem;
    if (existedCartItem) {
      const updateCart = {
        ...existedCartItem,
        amount: existedCartItem.amount + action.item.amount,
      };
      updateItem = [...state.items];
      updateItem[existedCartItemIndex] = updateCart;
    } else {
      updateItem = state.items.concat(action.item);
    }
    return {
      items: updateItem,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};
function CartProvider(props) {
  const [currentCart, dispatchCurrentCart] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCurrentCart({ type: "ADD", item: item });
  };
  const removeFromCartHandler = (id) => {
    dispatchCurrentCart({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCurrentCart({ type: "CLEAR" });
  };
  const CartDynamic = {
    items: currentCart.items,
    totalAmount: currentCart.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={CartDynamic}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
