export default {
  addProductToCart(state, productData) {
    
    const cart = state.cart;
    console.log(productData );
     const productInCartIndex = cart.items.findIndex(
      (ci) => ci.productId === productData.id
    );

    if (productInCartIndex >= 0) {
      cart.items[productInCartIndex].qty++;
    } else {
      const newItem = {
        productId: productData.id,
        title: productData.title,
        image: productData.image,
        price: productData.price,
        qty: 1,
      };
      cart.items.push(newItem);
    }
    cart.qty++;
    cart.total += productData.price;

  },
  removeProductFromCart(state,prodId) {
    const productInCartIndex = state.cart.items.findIndex(
      (cartItem) => cartItem.productId === prodId
    );
    const prodData = state.cart.items[productInCartIndex];
    state.cart.items.splice(productInCartIndex, 1);
    state.cart.qty -= prodData.qty;
    state.cart.total -= prodData.price * prodData.qty;
  },
};
