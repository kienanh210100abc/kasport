import { useTranslation } from "react-i18next";
import type { CustomerInfo } from "../../CheckoutDialog/CheckoutDialog";

export const useFormValidation = () => {
  const { t } = useTranslation();

  const validateForm = (customerInfo: CustomerInfo): Partial<CustomerInfo> => {
    const errors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) errors.name = t("checkout.nameRequired");
    if (!customerInfo.address.trim())
      errors.address = t("checkout.addressRequired");

    if (!customerInfo.email.trim()) {
      errors.email = t("checkout.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = t("checkout.emailInvalid");
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = t("checkout.phoneRequired");
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone)) {
      errors.phone = t("checkout.phoneInvalid");
    }

    return errors;
  };

  return { validateForm };
};
