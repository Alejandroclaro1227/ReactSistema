import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  CircularProgress,
  TextField,
  IconButton,
  Box,
  Tabs,
  Tab,
  InputAdornment,
  Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getPlanetData } from '../services/nasaApi';
import '../styles/Planets.css';

function PlanetList() {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritePlanets") || "[]");
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const data = await getPlanetData();
        setPlanets(data);
      } catch (error) {
        console.error('Error fetching planets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritePlanets", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSort = () => {
    if (sortCriteria === "name") {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria("name");
      setSortDirection("asc");
    }
  };

  const toggleFavorite = (event, planetId) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = prev.includes(planetId)
        ? prev.filter(id => id !== planetId)
        : [...prev, planetId];
      localStorage.setItem("favoritePlanets", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPlanets = planets
    .filter(planet => 
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? compareResult : -compareResult;
    });

  const favoritePlanets = planets.filter(planet => favorites.includes(planet.id));
  const displayPlanets = tabValue === 0 ? filteredPlanets : favoritePlanets;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="planets-container">
      <div className="planets-header">
        <Typography 
          variant="h2" 
          component="h1" 
          className="planets-title"
        >
          Sistema Solar
          <span className="title-accent">Explorer</span>
        </Typography>

        <Box className="planets-tabs">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            className="custom-tabs"
          >
            <Tab 
              label="Todos los Planetas" 
              className="tab-label"
            />
            <Tab 
              label={`Favoritos (${favorites.length})`}
              className="tab-label"
              icon={<FavoriteIcon className="tab-icon" />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box className="search-container">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar planeta..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title={`Ordenar ${sortDirection === "asc" ? "Z-A" : "A-Z"}`}>
              <IconButton 
                onClick={toggleSort} 
                className={`sort-button ${sortDirection === "desc" ? "active" : ""}`}
              >
                <SortIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </div>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {displayPlanets.map((planet) => (
            <Grid item key={planet.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                className="planet-card"
                onClick={() => navigate(`/planet/${planet.id}`)}
              >
                <Box className="planet-image-container">
                  <CardMedia
                    component="img"
                    className="planet-image"
                    image={planet.image}
                    alt={planet.name}
                  />
                  <IconButton 
                    onClick={(e) => toggleFavorite(e, planet.id)}
                    className={`favorite-button ${favorites.includes(planet.id) ? 'active' : ''}`}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>
                <CardContent className="planet-content">
                  <Typography className="planet-name">
                    {planet.name}
                  </Typography>
                  <Typography className="planet-description">
                    {planet.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default PlanetList;
