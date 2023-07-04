import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "./products";
import { BiArrowBack } from "react-icons/bi";
import "./cart.css";

function Cart() {
  const [productInCart, setProductInCart] = useState<Product[]>([]);
  const [itemNumber] = useState(1);

  const DisplayCart = () => {
    const item: any = localStorage.getItem("product");
    setProductInCart(JSON.parse(item));
  };

  useEffect(() => {
    DisplayCart();
  }, []);

  const removeItemInCart = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let remainingProduct = [];
    if (listOfProducts !== null) {
      remainingProduct = listOfProducts.filter(
        (item: Product) => item.id !== ItemId
      );
      localStorage.setItem("product", JSON.stringify(remainingProduct));
      DisplayCart();
    }
  };

  const incrementProducts = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let getNewList: any = [];
    if (listOfProducts !== null) {
      for (let item of listOfProducts) {
        if (item.id === ItemId) {
          let currentCount = item?.count || 1;
          item.count = Number(currentCount) + 1;
        }
        getNewList.push(item);
      }

      localStorage.setItem("product", JSON.stringify(getNewList));
      DisplayCart();
    }
  };

  const decrementProducts = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let getNewList: any = [];
    if (listOfProducts !== null) {
      for (let item of listOfProducts) {
        if (item.id === ItemId) {
          let currentCount = item?.count || 1;
          if (currentCount === 1) {
            removeItemInCart(ItemId);
            return;
          }
          item.count = Number(currentCount) - 1;
        }
        getNewList.push(item);
      }

      localStorage.setItem("product", JSON.stringify(getNewList));
      DisplayCart();
    }
  };

  const [total, setTotal] = useState("");
  useEffect(() => {
    const sum = productInCart.reduce(
      (acc, item) => acc + (item.count || 1) * item.price,
      0
    );
    setTotal(sum.toString());
  }, [productInCart]);

  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <p className="back-home">
        <Link to="/">
          <BiArrowBack />
        </Link>
      </p>

      <div className="all-cart-products">
        <p className="cart-title">CART</p>
        <input
          className="search-field"
          type="search"
          placeholder="Search any product"
          onChange={(e) => setSearch(e.target.value)}
        />
        {productInCart
          .filter((detail) => {
            return search.toLowerCase() === ""
              ? detail
              : detail.title.toLowerCase().includes(search);
          })
          .map((detail) => (
            <div className="product-cart-detail" key={detail.id}>
              <div className="section-one">
                <img src={detail.image} alt="product" />
              </div>
              <div className="both-sections">
                <div className="section-two">
                  <div className="title-price-cart">
                    <h1 className="title">{detail.title}</h1>
                    <h5 className="price">${detail.price}</h5>
                  </div>
                  <div className="total-price">
                    <span>${(detail?.count || 1) * detail?.price}</span>
                  </div>
                </div>

                <div className="section-three">
                  <div className="add-remove">
                    <button onClick={() => decrementProducts(detail.id)}>
                      -
                    </button>
                    <p className="updated-number">
                      {detail?.count || itemNumber}
                    </p>
                    <button onClick={() => incrementProducts(detail.id)}>
                      +
                    </button>
                  </div>
                  <div className="remove-btn">
                    <button onClick={() => removeItemInCart(detail.id)}>
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="final-amount">
          <p className="total-title">Total:</p>
          <p className="total-amounts"> ${parseFloat(total).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
