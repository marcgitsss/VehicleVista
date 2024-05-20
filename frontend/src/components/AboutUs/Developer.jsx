import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import irishImage from '../../assets/Irish.png'; // Ensure this path is correct
import ziaImage from '../../assets/Ziaa.png'; // Ensure this path is correct
import ludiImage from '../../assets/Ludi.png'; // Ensure this path is correct
import robertImage from '../../assets/Robert.png'; // Ensure this path is correct
import jessreyImage from '../../assets/Jessrey.png'; // Ensure this path is correct
import marcImage from '../../assets/Marc.jpg'; // Ensure this path is correct

const people = [
  { name: 'Irish Leight San Juan', role: 'Project Manager', image: irishImage },
  { name: 'Christzia Marie Atay', role: 'Front End Developer', image: ziaImage },
  { name: 'Robert Amaba', role: 'Front End Developer', image: robertImage },
  { name: 'Ludivico Balatero', role: 'Back End Developer', image: ludiImage},
  { name: 'Jessrey Garrido', role: 'Back End Developer', image: jessreyImage },
  { name: 'Marc Gomolon', role: 'Front End Developer', image: marcImage }
];

export default function Developer() {
  return (
    <div style={{ backgroundColor: '#5d1a1f', padding: '20px' }}>
      <Container maxWidth="md">
        <Typography variant='h4' align='center' style={{ marginTop: "50px", color: 'white' }}>
          Developers Behind the Vehicle Vista
        </Typography>
        <Grid container spacing={5} style={{ marginTop: "15px", marginBottom: "25px" }} justifyContent="center">
          {people.map((person, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  alt={person.name}
                  height="160"
                  image={person.image}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.role}
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
