import { useState, useEffect } from "react";
import { Box, Tooltip, Typography, Collapse } from "@mui/material";
import {
  Home as HomeIcon,
  Mail as MailIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import soccer from "../../../public/assets/icons/soccericon.png";
import shoes from "../../../public/assets/icons/shoeIC.png";
import clothes from "../../../public/assets/icons/clothes.png";
import badminton from "../../../public/assets/icons/badminton.png";

type SidebarProps = {
  onToggle?: (expanded: boolean) => void;
};

const ImgIcon = ({
  src,
  alt,
  size = 30,
}: {
  src: string;
  alt: string;
  size?: number;
}) => <img src={src} alt={alt} style={{ width: size, height: size }} />;

const Sidebar = ({ onToggle }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => onToggle?.(isExpanded), [isExpanded, onToggle]);

  const menuItems = [
    { text: t("sidebar.products"), icon: <HomeIcon />, path: "/" },
    {
      text: t("sidebar.shoes"),
      icon: <ImgIcon src={shoes} alt="shoes" />,
      dropdown: "shoes",
      subItems: [
        {
          text: t("sidebar.footballshoes"),
          path: "/shoes?subCategory=football",
          icon: <ImgIcon src={soccer} alt="football" />,
        },
        {
          text: t("sidebar.badmintonshoes"),
          path: "/shoes?subCategory=badminton",
          icon: <ImgIcon src={badminton} alt="badminton" />,
        },
      ],
    },
    {
      text: t("sidebar.clothes"),
      icon: <ImgIcon src={clothes} alt="clothes" />,
      dropdown: "clothes",
      subItems: [
        {
          text: t("sidebar.footballclothes"),
          path: "/clothes?subCategory=football",
          icon: <ImgIcon src={soccer} alt="football" size={24} />,
        },
        {
          text: t("sidebar.badmintonclothes"),
          path: "/clothes?subCategory=badminton",
          icon: <ImgIcon src={badminton} alt="badminton" size={24} />,
        },
      ],
    },
    {
      text: t("sidebar.accessorys"),
      icon: <MoreHorizIcon />,
      path: "/accessory",
    },
    { text: t("sidebar.contact"), icon: <MailIcon />, path: "/" },
    { text: t("sidebar.about"), icon: <SettingsIcon />, path: "/" },
  ];

  const toggleDropdown = (type: string) =>
    setOpenDropdowns((prev) => ({ ...prev, [type]: !prev[type] }));

  const commonTransition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

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
        display: { xs: "none", sm: "none", md: "block" },
        "@media (max-width: 875px)": { display: "none" },
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
        transition: `width 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            display: "flex",
            cursor: "pointer",
            mr: isExpanded ? 1.5 : 0,
            p: 0.5,
            borderRadius: "50%",
            transition: commonTransition,
            "&:hover": {
              background: "rgba(255,255,255,0.08)",
              transform: isExpanded
                ? "scale(1.1)"
                : "scale(1.1) rotate(180deg)",
            },
          }}
        >
          <ChevronLeftIcon
            sx={{
              color: "white",
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Box>
        {isExpanded && (
          <Typography
            sx={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              opacity: 1,
              transition: "opacity 0.3s ease",
            }}
          >
            KA Sport
          </Typography>
        )}
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1, paddingTop: "20px" }}>
        {menuItems.map((item, index) => (
          <Box
            key={item.text}
            sx={{
              animation: `slideIn 0.3s ease forwards`,
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              "@keyframes slideIn": {
                from: { opacity: 0, transform: "translateX(-20px)" },
                to: { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Tooltip title={!isExpanded ? item.text : ""} placement="right">
              <Box
                onClick={() =>
                  item.dropdown
                    ? toggleDropdown(item.dropdown)
                    : item.path && navigate(item.path)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  paddingLeft: isExpanded ? "24px" : "20px",
                  paddingRight: isExpanded ? "16px" : "0",
                  color: "white",
                  cursor: "pointer",
                  transition: commonTransition,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    paddingLeft: isExpanded ? "28px" : "24px",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      minWidth: "30px",
                      display: "flex",
                      justifyContent: "center",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.15)" },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "15px",
                      fontWeight: 400,
                      whiteSpace: "nowrap",
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      transition: commonTransition,
                    }}
                  >
                    {item.text}
                  </Box>
                </Box>
                {item.dropdown && (
                  <ExpandMoreIcon
                    sx={{
                      transform: openDropdowns[item.dropdown]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
                      opacity: isExpanded ? 1 : 0,
                    }}
                  />
                )}
              </Box>
            </Tooltip>

            {/* Dropdown */}
            {item.dropdown && isExpanded && (
              <Collapse in={openDropdowns[item.dropdown]} timeout={500}>
                <Box>
                  {item.subItems?.map((subItem, subIndex) => (
                    <Box
                      key={subItem.path}
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        height: "48px",
                        padding: "0 16px 0 40px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "14px",
                        opacity: 0.7,
                        transition: commonTransition,
                        animation: openDropdowns[item.dropdown]
                          ? `slideInSubmenu 0.4s ease forwards ${
                              subIndex * 0.1
                            }s`
                          : "none",
                        "@keyframes slideInSubmenu": {
                          from: { opacity: 0, transform: "translateX(-15px)" },
                          to: { opacity: 0.7, transform: "translateX(0)" },
                        },
                        "&:hover": {
                          opacity: 1,
                          background: "rgba(255, 255, 255, 0.05)",
                          paddingLeft: "44px",
                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        {subItem.icon}
                      </Box>
                      <Box>{subItem.text}</Box>
                    </Box>
                  ))}
                </Box>
              </Collapse>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
