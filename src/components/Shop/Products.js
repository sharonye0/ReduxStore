import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import axios from "axios";

const Products = (props) => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      axios
         .get(
            "https://someproductsforastore-default-rtdb.europe-west1.firebasedatabase.app/products.json"
         )
         .then((res) => setProducts(res.data));
   }, []);

   const productsItems = products.map((product) => (
      <ProductItem
         id={product.id}
         title={product.title}
         price={product.price}
         description={product.description}
         key={product.id}
      />
   ));
   return (
      <section className={classes.products}>
         <h2>Buy your favorite products</h2>
         <ul>{productsItems}</ul>
      </section>
   );
};

export default Products;
