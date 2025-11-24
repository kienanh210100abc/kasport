import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { products, type Product } from "../../data/products";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ProductList.css";
import TablePagination from "@mui/material/TablePagination";
import React from "react";

type ProductListProps = {
  category?: string;
};

const ProductList = ({ category }: ProductListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

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

  // Filter by category
  let filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  // Filter by search query
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Box className="product-list-container" sx={{ padding: 0 }}>
      <Typography
        sx={{ color: "black", fontSize: "30px", fontWeight: "bold", mb: 2 }}
      >
        {searchQuery
          ? `${t("products.searchResults")}: "${searchQuery}"`
          : t("products.title")}
      </Typography>
      {searchQuery && (
        <Typography sx={{ color: "gray", fontSize: "16px", mb: 2 }}>
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
                image={product.image}
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
