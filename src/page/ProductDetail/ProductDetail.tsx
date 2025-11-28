import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type Product = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://kasport-be-production.up.railway.app/api/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to fetch product");
      })
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

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4, px: 2 }}>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
        {t("products.back")}
      </Button>
      <Card
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <CardMedia
          component="img"
          image={`/assets/accessory/football/${product.image}`}
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
            {product.price.toLocaleString("vi-VN")}đ
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>{t("products.brand")}: </b> {product.brand}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>{t("products.category")}: </b> {product.category} /{" "}
            {product.subCategory}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Chip
            label={
              product.inStock ? t("products.inStock") : t("products.outOfStock")
            }
            color={product.inStock ? "success" : "error"}
            size="medium"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
