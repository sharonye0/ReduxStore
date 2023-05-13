import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
   const cartItems = useSelector((state) => state.cart.cartItems);
   const cartIsEmpty = useSelector((state) => state.cart.cartIsEmpty);

   console.log(cartItems);
   let CartItems;
   if (cartItems !== undefined) {
      CartItems = cartItems.map((item) => {
         return <CartItem item={item} key={item.id} />;
      });
   }

   console.log(CartItems);

   let content = cartIsEmpty ? (
      <p className={classes.emptyCartPara}>Your Cart is Empty.</p>
   ) : (
      CartItems
   );

   return (
      <Card className={classes.cart}>
         <h2>Your Shopping Cart</h2>
         <ul>{content}</ul>
      </Card>
   );
};

export default Cart;
