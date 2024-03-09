import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Reserve from './Reserve';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../apiServices/AuthContext';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const DynamicGrid = ({ photoURLs, IDs }) => {
  const {isLoggedIn} = useAuth();
  const navigate=useNavigate();
  const columns = 3; // Set your desired number of columns here
  const rows = Math.ceil(photoURLs.length / columns);

  const handleReserveClick = (id) => {
    console.log(id);
    //navigate('/reserve', { state: { id } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {photoURLs.map((url, index) => (
          <Grid key={index} item xs={12 / columns}>
            <Item>
              <div style={{ position: 'relative', paddingBottom: '75%', maxWidth: '100%' }}>
                {/* Image */}
                <img
                  src={url}
                  alt={`Car ${index + 1}`}
                  style={{
                    marginBottom: '0',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    // Maintain aspect ratio and cover the entire container
                  }}
                />
                 {isLoggedIn && (
                  <Link to="/reserve">
                    <Button
                      variant="contained"
                      style={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '30%', // Adjust the relative size using percentage or vw/vh units
                        backgroundColor: '#4CAF50',
                        color: 'white',
                      }}
                      onClick={() => handleReserveClick(IDs[index])}
                    >
                      Reserve
                    </Button>
                  </Link>
                  )}

                {!isLoggedIn && (
                  <Link to="/login">
                  <Button
                    variant="contained"
                    style={{
                      position: 'absolute',
                      bottom: '5%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30%', // Adjust the relative size using percentage or vw/vh units
                      backgroundColor: '#4CAF50',
                      color: 'white',
                    }}
                  >
                    Reserve
                  </Button>
                </Link>
                )}
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function Home() {
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVehicles()
      .then(data => setVehicleData(data))
      .catch(error => setError(error));
  }, []);

  const getVehicles = async () => {
    try {
      const response = await fetch('http://localhost:9000/vehicles/getCars');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      setError(error);
      return null;
    }
  };

  if (error) {
    // Handle error state, e.g., display an error message
    return <div>Error fetching data</div>;
  }

  if (!vehicleData) {
    // Loading state, you can display a loading spinner or message
    return <div>Loading...</div>;
  }


  // Ensure that vehicleData is not null before calculating rows
  const columns = 3;
  const rows = Math.ceil(vehicleData.length / columns);

  // Assuming vehicleData has a property named 'photoURL'
  const photoURLs = vehicleData.map(vehicle => vehicle.photoURL);

  const IDs = vehicleData.map(vehicle => vehicle._id);

  return <DynamicGrid rows={rows} cols={columns} photoURLs={photoURLs} IDs={IDs}/>;
}

export default Home;