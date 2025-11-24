import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, IconButton, Chip, Grid } from "@mui/material";
import { Add, Remove, ArrowBack } from "@mui/icons-material";
import { getProductById } from "../../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState("");

  const product = getProductById(id || "");

  useEffect(() => window.scrollTo(0, 0), [id]);

  // Auto-select "Không size" if it's the only size
  useEffect(() => {
    if (
      product &&
      product.sizes.length === 1 &&
      product.sizes[0] === "Không size"
    ) {
      setSelectedSize("Không size");
      setQuantity(0);
    }
  }, [product]);

  const sizeStock = selectedSize ? product?.sizeStock[selectedSize] || 0 : 0;
  const hasMultipleSizes =
    product &&
    !(product.sizes.length === 1 && product.sizes[0] === "Không size");
  const priceBlock = useMemo(
    () => (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ color: "red", fontWeight: "bold" }}>
          {product?.price.toLocaleString("vi-VN")}đ
        </Typography>
        {product?.originalPrice && (
          <Typography
            sx={{ color: "#999", textDecoration: "line-through", ml: 2 }}
          >
            {product.originalPrice.toLocaleString("vi-VN")}đ
          </Typography>
        )}
      </Box>
    ),
    [product]
  );

  const handleQuantity = (val: any) => {
    const newQuantity = Math.max(1, Math.min(quantity + val, sizeStock));
    setQuantity(newQuantity);
    if (newQuantity <= sizeStock) {
      setQuantityError("");
    }
  };

  if (!product)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4">{t("productDetail.notFound")}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          {t("productDetail.backToHome")}
        </Button>
      </Box>
    );

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ color: "black" }}
      >
        {t("productDetail.back")}
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            {product.discount && (
              <Chip
                label={`-${product.discount}%`}
                color="error"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />
            )}
            {!product.inStock && (
              <Chip
                label="Pre-Order"
                color="info"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{ fontWeight: "bold", mb: 2, color: "black", fontSize: "30px" }}
          >
            {product.name}
          </Typography>

          {priceBlock}
          <Box sx={{ mb: 2 }}>
            {[
              [t("productDetail.sku"), product.id],
              [
                t("productDetail.category"),
                product.category === "shoes"
                  ? t("header.shoes")
                  : t("header.clothes"),
              ],
              [t("productDetail.brand"), product.brand],
            ].map(([label, value]) => (
              <Typography sx={{ color: "black" }} key={label}>
                {label}: <strong>{value}</strong>
              </Typography>
            ))}
          </Box>

          {hasMultipleSizes && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, fontWeight: "bold", color: "black" }}>
                {t("productDetail.chooseSize")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {product.sizes.map((size) => {
                  const isOut = product.sizeStock[size] === 0;
                  const isActive = selectedSize === size;
                  return (
                    <Button
                      key={size}
                      variant={isActive ? "contained" : "outlined"}
                      disabled={isOut}
                      onClick={() => {
                        setSelectedSize(size);
                        setQuantity(0);
                        setQuantityError("");
                      }}
                      sx={{
                        minWidth: 60,
                        bgcolor: isOut ? "#f5f5f5" : isActive ? "#000" : "#fff",
                        color: isOut ? "#999" : isActive ? "#fff" : "#000",
                        textDecoration: isOut ? "line-through" : "none",
                        borderColor: isOut
                          ? "#ddd"
                          : isActive
                          ? "#000"
                          : "#ccc",
                        "&:hover": {
                          bgcolor: isOut
                            ? "#f5f5f5"
                            : isActive
                            ? "#333"
                            : "#f5f5f5",
                        },
                      }}
                    >
                      {size}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}

          {selectedSize && (
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: sizeStock < 10 ? "red" : "green",
              }}
            >
              {t("productDetail.stockAvailable")}: {sizeStock}{" "}
              {t("productDetail.items")}
            </Typography>
          )}

          {selectedSize && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                {t("productDetail.quantity")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton
                    onClick={() => handleQuantity(-1)}
                    sx={{ border: "1px solid #ccc" }}
                  >
                    <Remove />
                  </IconButton>

                  <input
                    type="text"
                    max={sizeStock}
                    value={quantity === 0 ? "" : quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === "") {
                        setQuantity(0);
                        setQuantityError("");
                        return;
                      }

                      const value = parseInt(inputValue);
                      if (isNaN(value) || value < 0) {
                        setQuantity(0);
                        setQuantityError("");
                      } else if (value > sizeStock) {
                        setQuantity(value);
                        setQuantityError(
                          t("productDetail.exceedsStock", { max: sizeStock })
                        );
                      } else {
                        setQuantity(value);
                        setQuantityError("");
                      }
                    }}
                    style={{
                      width: "60px",
                      textAlign: "center",
                      border: quantityError
                        ? "1px solid red"
                        : "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "8px",
                      fontSize: "16px",
                      color: "black",
                      backgroundColor: "white",
                    }}
                  />

                  <IconButton
                    onClick={() => handleQuantity(1)}
                    disabled={quantity >= sizeStock}
                    sx={{ border: "1px solid #ccc" }}
                  >
                    <Add />
                  </IconButton>
                </Box>
                {quantityError && (
                  <Typography sx={{ color: "red", fontSize: "12px" }}>
                    {quantityError}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              bgcolor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#FFC700" },
            }}
            onClick={() => {
              if (!selectedSize) return alert(t("productDetail.selectSize"));
              console.log("Add to cart:", { product, selectedSize, quantity });
            }}
          >
            {t("productDetail.addToCart")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
