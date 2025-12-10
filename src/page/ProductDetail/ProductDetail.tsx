import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Count from "./Count";
import { CartService } from "../../utils/cart";

type Product = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: string | number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  sizes?: { size: string; stock: number }[];
  colors?: any[];
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPrice = (price: string | number) =>
    (typeof price === "string" ? parseFloat(price) : price).toLocaleString(
      "vi-VN"
    );

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    CartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    setShowSuccess(true);
    setSelectedSize(null);
    setQuantity(1);
  };

  const handleSizeSelect = (size: string, stock: number) =>
    stock > 0 && (setSelectedSize(size), setQuantity(1));

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`)
      )
      .then(setProduct)
      .catch(
        (err) =>
          err.name !== "AbortError" &&
          setError(err.message || "Failed to fetch product")
      )
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!product) return null;

  const maxStock =
    product.sizes?.find((s) => s.size === selectedSize)?.stock || 999;

  return (
    <Box>
      <Typography
        sx={{ color: "black", fontSize: 20, mb: 1, fontWeight: "bold" }}
      >
        <span
          onClick={() => (
            navigate(-1), setTimeout(() => window.scrollTo(0, 0), 0)
          )}
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <ArrowBack sx={{ fontSize: 20 }} />
          {t("products.title")}
        </span>
      </Typography>

      <Card
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <CardMedia
          component="img"
          image={`/assets/${product.image}`}
          alt={product.name}
          sx={{
            width: { xs: "100%", md: 400 },
            height: 400,
            objectFit: "cover",
          }}
        />

        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "#ff4d4f", mb: 2 }}>
            {formatPrice(product.price)}đ
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>{t("products.brand")}: </b>
            {product.brand}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          {product.sizes && product.sizes.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                {t("products.sizes")}:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {product.sizes.map(({ size, stock }) => (
                  <Chip
                    key={size}
                    label={`${size} (${stock} ${t("products.available")})`}
                    disabled={stock === 0}
                    onClick={() => handleSizeSelect(size, stock)}
                    variant="outlined"
                    sx={{
                      cursor: stock > 0 ? "pointer" : "not-allowed",
                      bgcolor:
                        selectedSize === size ? "primary.main" : "transparent",
                      color: selectedSize === size ? "white" : "inherit",
                      "&:hover": {
                        bgcolor:
                          selectedSize === size
                            ? "primary.dark"
                            : stock > 0
                            ? "action.hover"
                            : "transparent",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {selectedSize && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                  {t("productDetail.quantity")}:
                </Typography>
                <Count
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={maxStock}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{
                  mt: 2,
                  bgcolor: "#ff4d4f",
                  "&:hover": { bgcolor: "#ff7875" },
                  fontWeight: "bold",
                  py: 1.5,
                }}
              >
                {t("productDetail.addToCart")}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message={t("productDetail.addToCart") + " thành công!"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ProductDetail;
