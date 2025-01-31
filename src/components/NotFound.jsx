import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Volver al inicio
      </Button>
    </Container>
  );
}

export default NotFound; 