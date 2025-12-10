export type CartItem = {
  productId: string;
  name: string;
  price: string | number;
  image: string;
  size: string;
  quantity: number;
};

export class CartService {
  private static CART_KEY = "cart";

  static getCart(): CartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  static addToCart(
    item: Omit<CartItem, "quantity"> & { quantity: number }
  ): void {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      (cartItem) =>
        cartItem.productId === item.productId && cartItem.size === item.size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item as CartItem);
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  static removeFromCart(productId: string, size: string): void {
    const cart = this.getCart().filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  static updateQuantity(
    productId: string,
    size: string,
    quantity: number
  ): void {
    const cart = this.getCart();
    const index = cart.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (index >= 0) {
      if (quantity <= 0) {
        this.removeFromCart(productId, size);
      } else {
        cart[index].quantity = quantity;
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      }
    }
  }

  static clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  static getCartCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  static getCartTotal(): number {
    return this.getCart().reduce((total, item) => {
      const price =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      return total + price * item.quantity;
    }, 0);
  }
}
