import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SOCIAL_ICONS = [Facebook, LinkedIn, Twitter];
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    transition: "all 0.3s ease",
    "&:hover fieldset": { borderColor: "#667eea" },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(102, 126, 234, 0.2)",
    },
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, action: isSignIn ? "Sign In" : "Sign Up" });
  };

  const FormContent = ({ showFullName }: { showFullName: boolean }) => (
    <>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: "#333" }}>
        {showFullName ? "Create Account" : "Sign In"}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {SOCIAL_ICONS.map((Icon, idx) => (
          <IconButton
            key={idx}
            sx={{
              color: "#667eea",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                transform: "scale(1.1)",
              },
            }}
          >
            <Icon />
          </IconButton>
        ))}
      </Stack>
      <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
        Or use your email address
      </Typography>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {showFullName && (
          <TextField
            fullWidth
            placeholder="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            size="small"
            sx={inputStyles}
          />
        )}
        <TextField
          fullWidth
          placeholder="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          size="small"
          sx={inputStyles}
        />
        <TextField
          fullWidth
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          size="small"
          sx={inputStyles}
        />
        {!showFullName && (
          <Link
            href="#"
            sx={{
              fontSize: "14px",
              color: "#667eea",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline", color: "#764ba2" },
            }}
          >
            Forgot password?
          </Link>
        )}
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          textTransform: "uppercase",
          fontWeight: 600,
          padding: "10px",
          borderRadius: "5px",
          transition: "all 0.3s",
          "&:hover": {
            opacity: 0.9,
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
          },
        }}
      >
        {showFullName ? "SIGN UP" : "SIGN IN"}
      </Button>
    </>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          borderRadius: "10px",
          background: "white",
          position: "relative",
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
            position: "absolute",
            top: 0,
            left: isSignIn ? "50%" : "0",
            width: "42%",
            height: "100%",
            transition: "left 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            zIndex: 2,
          }}
        >
          <Box
            key={isSignIn ? "signin" : "signup"}
            sx={{
              animation: "fadeIn 0.6s ease-in-out 0.3s both",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "scale(0.9)" },
                to: { opacity: 1, transform: "scale(1)" },
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              {isSignIn ? "Welcome Back!" : "Hey There!"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              {isSignIn
                ? "Sign in to review your latest profit from investments."
                : "Begin your journey using this software, and start earning now."}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setIsSignIn(!isSignIn)}
              sx={{
                color: "white",
                borderColor: "white",
                textTransform: "uppercase",
                fontWeight: 600,
                paddingX: 3,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                  transform: "scale(1.05)",
                },
              }}
            >
              {isSignIn ? "SIGN UP" : "SIGN IN"}
            </Button>
          </Box>
        </Box>

        {/* Sign In Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: { xs: "30px", md: "40px" },
            gridColumn: { xs: "1", md: "1" },
            opacity: isSignIn ? 1 : 0,
            visibility: isSignIn ? "visible" : "hidden",
            pointerEvents: isSignIn ? "auto" : "none",
            transition: "opacity 0.4s ease 0.4s, visibility 0s linear 0.4s",
          }}
        >
          <FormContent showFullName={false} />
        </Box>

        {/* Sign Up Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: { xs: "30px", md: "40px" },
            gridColumn: { xs: "1", md: "2" },
            opacity: !isSignIn ? 1 : 0,
            visibility: !isSignIn ? "visible" : "hidden",
            pointerEvents: !isSignIn ? "auto" : "none",
            transition: "opacity 0.4s ease 0.4s, visibility 0s linear 0.4s",
          }}
        >
          <FormContent showFullName={true} />
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
