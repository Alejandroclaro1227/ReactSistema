import { Outlet } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";

function Layout() {
  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema Solar
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout; 