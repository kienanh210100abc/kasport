import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

type SidebarProps = {
  onToggle?: (expanded: boolean) => void;
};

const Sidebar = ({ onToggle }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (onToggle) {
      onToggle(isExpanded);
    }
  }, [isExpanded, onToggle]);

  const menuItems = [
    { text: t("header.products"), icon: <HomeIcon />, path: "/" },
    { text: t("header.shoes"), icon: <SecurityIcon />, path: "/shoes" },
    { text: t("header.clothes"), icon: <BuildIcon />, path: "/clothes" },
    { text: t("header.accessorys"), icon: <CloudIcon />, path: "/" },
    { text: t("header.contact"), icon: <MailIcon />, path: "/" },
    { text: t("header.about"), icon: <SettingsIcon />, path: "/" },
  ];

  return (
    <Box
      sx={{
        width: isExpanded ? "240px" : "70px",
        height: "calc(100vh - 100px)",
        backgroundColor: "black",
        position: "fixed",
        top: "100px",
        left: 0,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 999,
        display: { xs: "none", sm: "block" },
        "@media (max-width: 875px)": {
          display: "none",
        },
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "white",
            border: "none",
            outline: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:focus": {
              outline: "none",
            },
            "&:active": {
              outline: "none",
            },
          }}
          disableRipple
        >
          {isExpanded ? (
            <>
              <Typography
                sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              >
                KA Sport
              </Typography>
              <ChevronLeftIcon />
            </>
          ) : (
            <>
              <MenuIcon />
            </>
          )}
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, paddingTop: "20px" }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={!isExpanded ? item.text : ""}
            placement="right"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "16px 0",
                paddingLeft: isExpanded ? "24px" : "20px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  paddingLeft: isExpanded ? "28px" : "24px",
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <Box
                sx={{
                  minWidth: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </Box>
              {isExpanded && (
                <Box
                  sx={{
                    marginLeft: "16px",
                    fontSize: "15px",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.text}
                </Box>
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
