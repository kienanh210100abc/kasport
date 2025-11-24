import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoKASproto from "../../assets/logoKASprot.png";
import LanguageSwitcher from "../LanguageSwitcher";

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          minHeight: "100px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexDirection: "row",
          zIndex: 1000,
          position: "fixed",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Box
            sx={{
              "@media (max-width: 875px)": {
                display: "none",
              },
            }}
          >
            <img
              src={logoKASproto}
              alt="KASporto Logo"
              style={{ height: "80px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              "@media (max-width: 875px)": {
                display: "none",
              },
            }}
          >
            <Typography
              sx={{
                color: "white",
                cursor: "pointer",
                "&:hover": { color: "#1890ff", textDecoration: "underline" },
              }}
              onClick={() => navigate("/")}
            >
              {t("header.products")}
            </Typography>
            <Typography
              sx={{
                color: "white",
                cursor: "pointer",
                "&:hover": { color: "#1890ff", textDecoration: "underline" },
              }}
              onClick={() => navigate("/shoes")}
            >
              {t("header.shoes")}
            </Typography>
            <Typography
              sx={{
                color: "white",
                cursor: "pointer",
                "&:hover": { color: "#1890ff", textDecoration: "underline" },
              }}
              onClick={() => navigate("/clothes")}
            >
              {t("header.clothes")}
            </Typography>
          </Box>
          <IconButton
            sx={{
              display: "none",
              color: "white",
              "@media (max-width: 875px)": {
                display: "flex",
              },
            }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleNavigate("/")}>
              {t("header.products")}
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/shoes")}>
              {t("header.shoes")}
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/clothes")}>
              {t("header.clothes")}
            </MenuItem>
          </Menu>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              padding: { xs: "6px 10px", sm: "8px 12px" },
              "@media (max-width: 875px)": {
                display: "none",
              },
            }}
          >
            <input
              type="text"
              placeholder={t("header.search")}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "14px",
                width: "200px",
                transition: "width 0.3s ease",
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const searchTerm = (
                    e.target as HTMLInputElement
                  ).value.trim();
                  if (searchTerm) {
                    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
                  } else {
                    navigate("/");
                  }
                }
              }}
            />
            <style>
              {`
                @media (max-width: 1024px) {
                  input[placeholder="${t("header.search")}"] {
                    width: 150px !important;
                  }
                }
                @media (max-width: 768px) {
                  input[placeholder="${t("header.search")}"] {
                    width: 120px !important;
                    font-size: 13px !important;
                  }
                }
              `}
            </style>
          </Box>
          <LanguageSwitcher />
        </Box>
      </Box>
    </>
  );
}
export default Navbar;
