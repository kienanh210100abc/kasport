import { Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CartService, type CartItem } from "../../utils/cart";
import type { CustomerInfo } from "../../CheckoutDialog/CheckoutDialog";
import CartDialog from "./CartDialog";
import CheckoutFormDialog from "./CheckoutFormDialog";
import { useFormValidation } from "./useFormValidation";

type CartButtonProps = {
  onCheckout?: (cart: CartItem[], customerInfo: CustomerInfo) => void;
};

const CartButton = ({ onCheckout }: CartButtonProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const { validateForm } = useFormValidation();

  useEffect(() => {
    cartOpen && setCart(CartService.getCart());
  }, [cartOpen]);

  const formatPrice = (price: string | number) =>
    (typeof price === "string" ? parseFloat(price) : price).toLocaleString(
      "vi-VN"
    );

  const handleQuantityChange = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    CartService.updateQuantity(productId, size, quantity);
    setCart(CartService.getCart());
  };

  const handleRemove = (productId: string, size: string) => {
    CartService.removeFromCart(productId, size);
    setCart(CartService.getCart());
  };

  const getTotalPrice = () =>
    cart.reduce(
      (total, item) =>
        total +
        (typeof item.price === "string" ? parseFloat(item.price) : item.price) *
          item.quantity,
      0
    );

  const handleCheckoutSubmit = () => {
    const validationErrors = validateForm(customerInfo);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onCheckout?.(cart, customerInfo);
      console.log("Order placed:", {
        cart,
        customer: customerInfo,
        total: getTotalPrice(),
      });
      CartService.clearCart();
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      setCustomerInfo({ name: "", address: "", email: "", phone: "" });
      setErrors({});
    }
  };

  const cartCount = CartService.getCartCount();

  return (
    <>
      <IconButton onClick={() => setCartOpen(true)} sx={{ color: "white" }}>
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <CartDialog
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={() => (setCartOpen(false), setCheckoutOpen(true))}
        formatPrice={formatPrice}
        totalPrice={getTotalPrice()}
      />

      <CheckoutFormDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        customerInfo={customerInfo}
        errors={errors}
        onCustomerInfoChange={setCustomerInfo}
        onSubmit={handleCheckoutSubmit}
        totalItems={cart.reduce((sum, item) => sum + item.quantity, 0)}
        totalPrice={getTotalPrice()}
        formatPrice={formatPrice}
      />
    </>
  );
};

export default CartButton;
