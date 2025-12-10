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
  TablePagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductList.css";

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
};

const ProductList = ({ category }: { category?: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const formatPrice = (price: string | number) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return num.toLocaleString("vi-VN");
  };
  const searchQuery = searchParams.get("search") || "";
  const sport = searchParams.get("sport") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const page = parseInt(searchParams.get("page") || "0");
  const rowsPerPage = parseInt(searchParams.get("rowsPerPage") || "12");

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => params.set(key, val));
    setSearchParams(params);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/api/products")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`)
      )
      .then(setProducts)
      .catch(
        (err) =>
          err.name !== "AbortError" &&
          setError(err.message || "Failed to fetch products")
      )
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (!category || p.subCategory === category) &&
      (!sport || p.category === sport) &&
      (!searchQuery ||
        [p.name, p.brand, p.description].some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box className="product-list-container" sx={{ p: 0 }}>
      <Typography
        sx={{ color: "black", fontSize: 20, mb: 1, fontWeight: "bold" }}
      >
        {category ? (
          <>
            <span
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {t("products.title")}
            </span>{" "}
            &gt; {t(`sidebar.${category}`)}
          </>
        ) : (
          t("products.title")
        )}
      </Typography>
      {searchQuery && (
        <Typography sx={{ color: "gray", fontSize: 20, mb: 2 }}>
          {t("products.foundResults", { count: filteredProducts.length })}
        </Typography>
      )}

      <Grid container spacing={2}>
        {displayedProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
              onClick={() => navigate(`/product/${product.id}`)}
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
                    minHeight: 48,
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
                  {formatPrice(product.price)}đ
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          onPageChange={(_, newPage) =>
            updateParams({ page: newPage.toString() })
          }
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            updateParams({ rowsPerPage: e.target.value, page: "0" })
          }
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
