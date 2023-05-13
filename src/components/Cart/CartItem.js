import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
   console.log(props);
   const { title, quantity, total, price, id, description } = props.item;

   const dispatch = useDispatch();
   const removeOneItemHandler = () =>
      dispatch(cartActions.removeOneItem({ id }));
   const addItemHandler = () =>
      dispatch(
         cartActions.addToCart({
            id: id,
            title: title,
            description: description,
            price: price,
         })
      );

   return (
      <li className={classes.item}>
         <header>
            <h3>{title}</h3>
            <div className={classes.price}>
               ${total.toFixed(2)}{" "}
               <span className={classes.itemprice}>
                  (${price.toFixed(2)}/item)
               </span>
            </div>
         </header>
         <div className={classes.details}>
            <div className={classes.quantity}>
               x <span>{quantity}</span>
            </div>
            <div className={classes.actions}>
               <button onClick={removeOneItemHandler}> - </button>
               <button onClick={addItemHandler}> + </button>
            </div>
         </div>
      </li>
   );
};

export default CartItem;
