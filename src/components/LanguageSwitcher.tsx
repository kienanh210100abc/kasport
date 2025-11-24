import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const items: MenuProps["items"] = [
    {
      label: t("navbar.vi"),
      key: "vi",
      onClick: () => handleLanguageChange("vi"),
    },
    {
      label: t("navbar.en"),
      key: "en",
      onClick: () => handleLanguageChange("en"),
    },
  ];

  const currentLanguage =
    i18n.language === "vi" ? t("navbar.vi") : t("navbar.en");

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()} style={{ color: "white" }}>
        <Space>
          <GlobalOutlined />
          {currentLanguage}
        </Space>
      </a>
    </Dropdown>
  );
};

export default LanguageSwitcher;
