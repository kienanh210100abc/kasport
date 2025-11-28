import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ProductList.css";

import React, { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";

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

type ProductListProps = {
  category?: string;
};

const ProductList = ({ category }: ProductListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch("https://kasport-be-production.up.railway.app/api/products", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setProducts)
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to fetch products");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!subCategory || p.subCategory === subCategory) &&
      (!searchQuery ||
        [p.name, p.brand, p.description].some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="product-list-container" sx={{ padding: 0 }}>
      <Typography
        sx={{ color: "black", fontSize: "20px", mb: 1, fontWeight: "bold" }}
      >
        {category ? (
          subCategory ? (
            <>
              {t("products.title")} &gt;{" "}
              <b>
                {t(
                  `sidebar.${subCategory}${
                    category === "shoes" ? "shoes" : "clothes"
                  }`
                )}
              </b>
            </>
          ) : (
            <>
              {t("products.title")} &gt; <b>{t(`sidebar.${category}`)}</b>
            </>
          )
        ) : (
          t("products.title")
        )}
      </Typography>
      {searchQuery && (
        <Typography sx={{ color: "gray", fontSize: "20px", mb: 2 }}>
          {t("products.foundResults", { count: filteredProducts.length })}
        </Typography>
      )}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {displayedProducts.map((product: Product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleProductClick(product)}
                className="product-card"
              >
                <CardMedia
                  component="img"
                  height="350"
                  image={`/assets/${product.image}`}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    sx={{
                      minHeight: "48px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#ff4d4f", fontWeight: "bold", mb: 1 }}
                  >
                    {product.price.toLocaleString("vi-VN")}đ
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {product.brand}
                  </Typography>
                  <Chip
                    label={
                      product.inStock
                        ? t("products.inStock")
                        : t("products.outOfStock")
                    }
                    color={product.inStock ? "success" : "error"}
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[8, 12, 16, 24]}
          labelRowsPerPage={t("products.itemsPerPage")}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${t("products.of")} ${count}`
          }
        />
      </Box>
    </Box>
  );
};

export default ProductList;
