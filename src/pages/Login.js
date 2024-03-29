/* eslint-disable no-lone-blocks */
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import { useTheme } from "@mui/material";
import Ap from "../image/court/ff.png";

const Logo = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <img
      src={Ap}
      alt="Logo"
      style={{
        width: "299px",
        height: "167px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    />
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
  </div>
);

const LoginForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {};
  const colorMode = useContext(ColorModeContext);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "85vh",
      marginTop: "0px",
      backgroundColor: colors.primary ? colors.primary[700] : "#000",
    },
    form: {
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "400px",
      width: "100%",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: colors.primary ? colors.blueAccent[900] : "#000",
      color: colors.primary[100],
    },
    // ... (rest of your styles)
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (formData.username === "") {
      newErrors.username = "Username is required";
    }
    if (formData.password === "") {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    // If there are no errors, navigate to the admin page
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission logic here
      console.log("Form submitted:", formData);

      // Navigate to the admin page
      navigate(formData.username === "ad" ? "/admin" : formData.username === "res" ? "/registrar" : "/judge");
    }
  };

  return (
    <>
      <MainNavbar />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ ...styles.container }}>
            <form
              style={{
                ...styles.form,
              }}
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginTop: "1px",
                  color: colors.grey[200],
                  fontFamily: '"Trirong", serif',
                }}
              >
                <Logo />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="username">Username</label>
                <input
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    backgroundColor: colors.primary[700],
                    color: colors.primary[200],
                    borderRadius: "5px",
                  }}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.username}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      boxSizing: "border-box",
                      paddingRight: "30px",
                      backgroundColor: colors.primary[700],
                      color: colors.primary[200],
                      borderRadius: "5px",
                    }}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <FaEye
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={handleTogglePassword}
                    />
                  )}
                </div>
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.password}
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: colors.blueAccent
                    ? colors.blueAccent[600]
                    : "#000",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      <Footer />
    </>
  );
};

export default LoginForm;
