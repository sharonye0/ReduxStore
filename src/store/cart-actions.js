import { uiActions } from "./ui-store";
import { cartActions } from "./cartSlice";

export const sendCartData = (cart) => {
   return async (dispatch) => {
      dispatch(
         uiActions.showNotification({
            status: "pending",
            title: "sending...",
            message: "sending cart data",
         })
      );

      const sendRequest = async () => {
         const response = await fetch(
            "https://react-8812a-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
            {
               method: "PUT",
               body: JSON.stringify({
                  cartItems: cart.cartItems,
                  totalOfItemsInCart: cart.totalOfItemsInCart,
               }),
            }
         );
         if (!response.ok) throw new Error("Sending Cart Data Failed");
      };

      try {
         await sendRequest();
         dispatch(
            uiActions.showNotification({
               status: "success",
               title: "success!",
               message: "sent cart data successfully!",
            })
         );
      } catch (error) {
         dispatch(
            uiActions.showNotification({
               status: "error",
               title: "Error!",
               message: "sending cart data failed!",
            })
         );
      }
   };
};

export const fetchCartData = () => {
   return async (dispatch) => {
      const fetchData = async () => {
         const response = await fetch(
            "https://react-8812a-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
         );
         if (!response.ok) throw new Error("Could not fetch cart data!");

         const cartData = await response.json();
         return cartData;
      };
      try {
         const cartData = await fetchData();
         dispatch(
            cartActions.replaceCart({
               cartItems: cartData.cartItems || [],
               totalOfItemsInCart: cartData.totalOfItemsInCart,
            })
         );
      } catch (error) {
         dispatch(
            uiActions.showNotification({
               status: "error",
               title: "Error!",
               message: "fetching cart data failed!",
            })
         );
      }
   };
};
