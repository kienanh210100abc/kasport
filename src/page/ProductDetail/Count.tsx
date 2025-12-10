import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

type CountProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const Count = ({
  value,
  onChange,
  min = 1,
  max = 999,
  disabled = false,
}: CountProps) => {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      onChange(min);
      return;
    }
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    if (num < min) onChange(min);
    else if (num > max) onChange(max);
    else onChange(num);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          width: 36,
          height: 36,
          "&:disabled": { opacity: 0.5 },
        }}
      >
        <Remove fontSize="small" />
      </IconButton>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        style={{
          width: "60px",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      />
      <IconButton
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          width: 36,
          height: 36,
          "&:disabled": { opacity: 0.5 },
        }}
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Count;
