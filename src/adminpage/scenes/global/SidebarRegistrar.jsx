// Import statements...
import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  BarChartOutlined,
  MapsUgcOutlined,
  PieChartOutlined,
  ViewTimelineOutlined,
} from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ role, name, privateImage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    // Retrieve the image path from local storage when the component is mounted
    const storedImagePath = localStorage.getItem("imagePath");

    // Check if the storedImagePath exists or fetch it from your source
    if (storedImagePath) {
      setImagePath(storedImagePath);
    } else {
      // Fetch the image path from your desired source (replace this comment with your actual code)
      // For example, if you are fetching it from an API:
      // fetchImage().then((path) => {
      //   setImagePath(path);
      //   localStorage.setItem("imagePath", path);
      // });

      // For demonstration purposes, let's set a default image path if fetching fails
      const defaultImagePath = "path/to/default/image.jpg";
      setImagePath(defaultImagePath);
      localStorage.setItem("imagePath", defaultImagePath);
    }
  }, []);

  const handleChoosePicture = () => {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Limit image size to 5MB
          const maxSize = 5 * 1024 * 1024; // 5MB in bytes
          if (reader.result.length < maxSize) {
            // Update the image path with the selected image
            setImagePath(reader.result);
            // Store the image path in local storage
            localStorage.setItem("imagePath", reader.result);
          } else {
            console.error("Image size exceeds the allowed limit (5MB).");
            // You can show an error message to the user if needed.
          }
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  };

  // Define different items for admin, judge, and registrar
  const sidebarItems = {
    admin: [
      { title: "Dashboard", to: "", icon: <HomeOutlinedIcon /> },
      { title: "Manage Team", to: "team", icon: <PeopleOutlinedIcon /> },
      { title: "Profile Form", to: "form", icon: <PersonOutlinedIcon /> },
      {
        title: "Contact Information",
        to: "contacts",
        icon: <ContactsOutlinedIcon />,
      },
    ],
    judge: [
      { title: "Dashboard", to: "", icon: <HomeOutlinedIcon /> },
      {
        title: "Contact Information",
        to: "contacts",
        icon: <ContactsOutlinedIcon />,
      },
      {
        title: "Calendar",
        to: "calendar",
        icon: <CalendarTodayOutlinedIcon />,
      },
      { title: "FAQ Page", to: "faq", icon: <HelpOutlineOutlinedIcon /> },
    ],
    registrar: [
      { title: "Dashboard", to: "", icon: <HomeOutlinedIcon /> },
      { title: "Manage Team", to: "team", icon: <PeopleOutlinedIcon /> },
      { title: "Profile Form", to: "form", icon: <PersonOutlinedIcon /> },
      {
        title: "Invoices Balances",
        to: "invoices",
        icon: <ReceiptOutlinedIcon />,
      },
      {
        title: "Contact Information",
        to: "contacts",
        icon: <ContactsOutlinedIcon />,
      },
      {
        title: "Calendar",
        to: "calendar",
        icon: <CalendarTodayOutlinedIcon />,
      },
      { title: "FAQ Page", to: "faq", icon: <HelpOutlineOutlinedIcon /> },
      { title: "Bar Chart", to: "bar", icon: <BarChartOutlined /> },
      { title: "Pie Chart", to: "pie", icon: <PieChartOutlined /> },
      { title: "Line Chart", to: "line", icon: <ViewTimelineOutlined /> },
      { title: "Geography Chart", to: "geography", icon: <MapsUgcOutlined /> },
      { title: "Add case", to: "addcase", icon: <MapsUgcOutlined /> },
    ],
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="0px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={imagePath}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  onClick={handleChoosePicture}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role === "admin" ? "Administrator" : ""}
                  {role === "judge" ? "Judge" : ""}
                  {role === "registrar" ? "Registrar" : ""}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {sidebarItems[role].map((item, index) => (
              <Item
                key={index}
                title={item.title}
                to={item.to}
                icon={item.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
