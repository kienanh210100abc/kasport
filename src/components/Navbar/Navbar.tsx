import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoKASproto from "../../assets/logoKASprot.png";
import LanguageSwitcher from "../LanguageSwitcher";

const menuItems = [
  { label: "navbar.products", path: "/" },
  { label: "navbar.shoes", path: "/shoes" },
  { label: "navbar.clothes", path: "/clothes" },
  { label: "navbar.racket", path: "/racket" },
  { label: "navbar.accessory", path: "/accessory" },
];

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <Box
        sx={{
          backgroundColor: "black",
          height: "100px",
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Logo PC */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <img
              src={logoKASproto}
              alt="logo"
              style={{ height: "80px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Menu Icon Mobile */}
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Search + Language */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginRight: "50px",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              "@media (min-width: 376px)": {
                display: "flex",
              },
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.1)",
              p: "6px 10px",
              borderRadius: "4px",
            }}
          >
            <input
              type="text"
              placeholder={t("navbar.search")}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                display: "block",
              }}
              onKeyPress={(e) => {
                if (e.key !== "Enter") return;
                const searchTerm = (e.target as HTMLInputElement).value.trim();
                navigate(searchTerm ? `/?search=${searchTerm}` : "/");
              }}
            />
          </Box>

          <LanguageSwitcher />
        </Box>
      </Box>

      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "100px",
            left: 0,
            width: "100%",
            bgcolor: "black",
            display: { xs: "block", sm: "none" },
            zIndex: 999,
          }}
        >
          {menuItems.map((item) => (
            <Box
              key={item.path}
              sx={{
                px: 3,
                py: 2,
                color: "white",
              }}
              onClick={() => handleNavigate(item.path)}
            >
              <Typography>{t(item.label)}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {open && (
        <Box
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            display: { xs: "block", sm: "none" },
            top: "100px",
          }}
        />
      )}
    </>
  );
}

export default Navbar;
