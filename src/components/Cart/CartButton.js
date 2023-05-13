import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../store/ui-store";

const CartButton = (props) => {
   const totalOfItemsInCart = useSelector(
      (state) => state.cart.totalOfItemsInCart
   );
   const dispatch = useDispatch();
   const toggleCartHandler = () => dispatch(uiActions.toggle());

   return (
      <button className={classes.button} onClick={toggleCartHandler}>
         <span> My Cart </span>
         <span className={classes.badge}>{totalOfItemsInCart}</span>
      </button>
   );
};

export default CartButton;
