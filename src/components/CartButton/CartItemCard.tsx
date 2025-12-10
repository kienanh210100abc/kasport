import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../../utils/cart";

type CartItemCardProps = {
  item: CartItem;
  onQuantityChange: (productId: string, size: string, quantity: number) => void;
  onRemove: (productId: string, size: string) => void;
  formatPrice: (price: string | number) => string;
};

const CartItemCard = ({
  item,
  onQuantityChange,
  onRemove,
  formatPrice,
}: CartItemCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        pb: 2,
        borderBottom: "1px solid #eee",
      }}
    >
      <Box
        component="img"
        src={`/assets/${item.image}`}
        alt={item.name}
        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("cart.size")}: {item.size}
        </Typography>
        <Typography variant="body1" sx={{ color: "#ff4d4f", mt: 1 }}>
          {formatPrice(item.price)}đ
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <IconButton
            size="small"
            onClick={() =>
              onQuantityChange(item.productId, item.size, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
          >
            -
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton
            size="small"
            onClick={() =>
              onQuantityChange(item.productId, item.size, item.quantity + 1)
            }
          >
            +
          </IconButton>
        </Box>
      </Box>
      <IconButton
        onClick={() => onRemove(item.productId, item.size)}
        sx={{ color: "error.main" }}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default CartItemCard;
