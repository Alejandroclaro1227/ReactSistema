import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, Card, CardMedia, Typography, Box, 
  IconButton, Tabs, Tab, Grid, List, ListItem, 
  ListItemText, Divider, CircularProgress 
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublicIcon from '@mui/icons-material/Public';
import ScienceIcon from '@mui/icons-material/Science';
import AirIcon from '@mui/icons-material/Air';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { getPlanetData } from '../services/nasaApi';

function PlanetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        const planets = await getPlanetData();
        const currentPlanet = planets.find(p => p.id === id);
        setPlanet(currentPlanet);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanetDetail();
  }, [id]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!planet) {
    return (
      <Box className="error-container">
        <Typography variant="h5" color="error">
          Planeta no encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <div className="planet-detail-container">
      <Container maxWidth="lg">
        <IconButton 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowBackIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="planet-image-card">
              <CardMedia
                component="img"
                image={planet.image}
                alt={planet.name}
                className="detail-image"
              />
            </Card>
            <Typography variant="h2" className="planet-detail-title">
              {planet.name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="planet-detail-card">
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)} 
                className="detail-tabs"
                variant="fullWidth"
              >
                <Tab icon={<PublicIcon />} label="General" />
                <Tab icon={<ScienceIcon />} label="Datos Físicos" />
                <Tab icon={<AirIcon />} label="Atmósfera" />
                <Tab icon={<LightbulbIcon />} label="Curiosidades" />
              </Tabs>

              <Box className="tab-content">
                {activeTab === 0 && (
                  <div className="detail-section">
                    <Typography variant="body1" className="planet-description">
                      {planet.description}
                    </Typography>
                    <Typography variant="h6" className="section-title">
                      Datos Orbitales
                    </Typography>
                    <List className="data-list">
                      {Object.entries(planet.orbitalData).map(([key, value]) => (
                        <ListItem key={key} className="data-item">
                          <ListItemText
                            primary={formatLabel(key)}
                            secondary={value}
                            className="data-text"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="detail-section">
                    <List className="data-list">
                      {Object.entries(planet.physicalData).map(([key, value]) => (
                        <ListItem key={key} className="data-item">
                          <ListItemText
                            primary={formatLabel(key)}
                            secondary={value}
                            className="data-text"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="detail-section">
                    <Typography variant="h6" className="section-title">
                      Composición Atmosférica
                    </Typography>
                    <Typography className="atmosphere-text">
                      {planet.atmosphere.composition}
                    </Typography>
                    <Divider className="detail-divider" />
                    <Typography variant="h6" className="section-title">
                      Presión Atmosférica
                    </Typography>
                    <Typography className="atmosphere-text">
                      {planet.atmosphere.pressure}
                    </Typography>
                    <Typography className="atmosphere-details">
                      {planet.atmosphere.details}
                    </Typography>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="detail-section">
                    <Typography variant="h6" className="section-title">
                      Datos Interesantes
                    </Typography>
                    <List className="curiosities-list">
                      {planet.curiosities.map((curiosity, index) => (
                        <ListItem key={index} className="curiosity-item">
                          <ListItemText 
                            primary={curiosity}
                            primaryTypographyProps={{
                              style: { 
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 400
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const formatLabel = (key) => {
  const labels = {
    mass: "Masa",
    diameter: "Diámetro",
    gravity: "Gravedad",
    density: "Densidad",
    distanceFromSun: "Distancia al Sol",
    orbitalPeriod: "Período Orbital",
    rotationPeriod: "Período de Rotación",
    avgTemp: "Temperatura Media"
  };
  return labels[key] || key;
};

export default PlanetDetail; 