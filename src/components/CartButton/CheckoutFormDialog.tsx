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
import { useTranslation } from "react-i18next";
import type { CustomerInfo } from "../../CheckoutDialog/CheckoutDialog";

type CheckoutFormDialogProps = {
  open: boolean;
  onClose: () => void;
  customerInfo: CustomerInfo;
  errors: Partial<CustomerInfo>;
  onCustomerInfoChange: (info: CustomerInfo) => void;
  onSubmit: () => void;
  totalItems: number;
  totalPrice: number;
  formatPrice: (price: string | number) => string;
};

const CheckoutFormDialog = ({
  open,
  onClose,
  customerInfo,
  errors,
  onCustomerInfoChange,
  onSubmit,
  totalItems,
  totalPrice,
  formatPrice,
}: CheckoutFormDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 24 }}>
        {t("checkout.title")}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("checkout.orderSummary")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("cart.totalItems")}: {totalItems}
          </Typography>
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
              onCustomerInfoChange({ ...customerInfo, name: e.target.value })
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
              onCustomerInfoChange({ ...customerInfo, email: e.target.value })
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
              onCustomerInfoChange({ ...customerInfo, phone: e.target.value })
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
              onCustomerInfoChange({ ...customerInfo, address: e.target.value })
            }
            error={!!errors.address}
            helperText={errors.address}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined" size="large">
          {t("checkout.cancel")}
        </Button>
        <Button
          onClick={onSubmit}
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

export default CheckoutFormDialog;
