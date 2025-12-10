import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../../utils/cart";
import CartItemCard from "./CartItemCard";

type CartDialogProps = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onQuantityChange: (productId: string, size: string, quantity: number) => void;
  onRemove: (productId: string, size: string) => void;
  onCheckout: () => void;
  formatPrice: (price: string | number) => string;
  totalPrice: number;
};

const CartDialog = ({
  open,
  onClose,
  cart,
  onQuantityChange,
  onRemove,
  onCheckout,
  formatPrice,
  totalPrice,
}: CartDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 24 }}>
        {t("cart.title")}
      </DialogTitle>
      <DialogContent>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
            {t("cart.empty")}
          </Typography>
        ) : (
          <>
            {cart.map((item) => (
              <CartItemCard
                key={`${item.productId}-${item.size}`}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
                formatPrice={formatPrice}
              />
            ))}
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {t("cart.total")}:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#ff4d4f" }}
              >
                {formatPrice(totalPrice)}đ
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined" size="large">
          {t("cart.continueShopping")}
        </Button>
        {cart.length > 0 && (
          <Button
            onClick={onCheckout}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#ff4d4f",
              "&:hover": { bgcolor: "#ff7875" },
              fontWeight: "bold",
            }}
          >
            {t("cart.checkout")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
