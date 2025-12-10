import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type CheckoutDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (customerInfo: CustomerInfo) => void;
  orderDetails: {
    productName: string;
    size: string;
    quantity: number;
    price: string | number;
    image: string;
  };
};

export type CustomerInfo = {
  name: string;
  address: string;
  email: string;
  phone: string;
};

const CheckoutDialog = ({
  open,
  onClose,
  onSubmit,
  orderDetails,
}: CheckoutDialogProps) => {
  const { t } = useTranslation();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const formatPrice = (price: string | number) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return num.toLocaleString("vi-VN");
  };

  const totalPrice = (() => {
    const num =
      typeof orderDetails.price === "string"
        ? parseFloat(orderDetails.price)
        : orderDetails.price;
    return num * orderDetails.quantity;
  })();

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = t("checkout.nameRequired");
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = t("checkout.addressRequired");
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = t("checkout.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = t("checkout.emailInvalid");
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = t("checkout.phoneRequired");
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone)) {
      newErrors.phone = t("checkout.phoneInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(customerInfo);
      setCustomerInfo({ name: "", address: "", email: "", phone: "" });
      setErrors({});
    }
  };

  const handleClose = () => {
    setCustomerInfo({ name: "", address: "", email: "", phone: "" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 24 }}>
        {t("checkout.title")}
      </DialogTitle>
      <DialogContent>
        {/* Order Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("checkout.orderSummary")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box
              component="img"
              src={`/assets/${orderDetails.image}`}
              alt={orderDetails.productName}
              sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {orderDetails.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("checkout.size")}: {orderDetails.size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("checkout.quantity")}: {orderDetails.quantity}
              </Typography>
              <Typography variant="body1" sx={{ color: "#ff4d4f", mt: 1 }}>
                {formatPrice(orderDetails.price)}đ × {orderDetails.quantity}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t("checkout.total")}:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ff4d4f" }}
            >
              {formatPrice(totalPrice)}đ
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Customer Information Form */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("checkout.customerInfo")}
          </Typography>
          <TextField
            fullWidth
            required
            label={t("checkout.name")}
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label={t("checkout.email")}
            type="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label={t("checkout.phone")}
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label={t("checkout.address")}
            multiline
            rows={3}
            value={customerInfo.address}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, address: e.target.value })
            }
            error={!!errors.address}
            helperText={errors.address}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" size="large">
          {t("checkout.cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#ff4d4f",
            "&:hover": { bgcolor: "#ff7875" },
            fontWeight: "bold",
          }}
        >
          {t("checkout.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog;
