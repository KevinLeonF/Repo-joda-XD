import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Avatar, Stack } from '@mui/material';
import "./listSections.css";

interface Item {
  image: string;
  title: string;
  description: string;
  author: string;
  price: string;
  oldPrice?: string;
  category: string;
  duration: string;
}

const items: Item[] = [
  {
    image: '/image/images (1).jpeg',
    title: 'AWS Certified solutions Architect',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    author: 'Lina',
    price: '$80',
    oldPrice: '$100',
    category: 'Design',
    duration: '3 Month',
  },
  {
    image: '/image/images (2).jpeg',
    title: 'AWS Certified solutions Architect',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    author: 'Lina',
    price: '$80',
    oldPrice: '$100',
    category: 'Design',
    duration: '3 Month',
  },
  {
    image: '/image/images (3).jpeg',
    title: 'AWS Certified solutions Architect',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    author: 'Lina',
    price: '$80',
    oldPrice: '$100',
    category: 'Design',
    duration: '3 Month',
  },
  {
    image: '/image/images (4).jpeg',
    title: 'AWS Certified solutions Architect',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    author: 'Lina',
    price: '$80',
    oldPrice: '$100',
    category: 'Design',
    duration: '3 Month',
  },
];

const CardItem: React.FC<{ item: Item }> = ({ item }) => (
  <Card elevation={0} className="secciondl-card">
    <CardActionArea>
      <CardMedia component="img" height={180} image={item.image} alt={item.title} />
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Typography variant="caption" color="text.secondary">{item.category}</Typography>
          <Typography variant="caption" color="text.secondary">{item.duration}</Typography>
        </Stack>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {item.description}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24 }}>L</Avatar>
            <Typography variant="body2" color="text.secondary">{item.author}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="baseline">
            {item.oldPrice && (
              <Typography variant="body2" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                {item.oldPrice}
              </Typography>
            )}
            <Typography variant="body1" color="success.main" fontWeight={700}>
              {item.price}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);

const PersonalDevelopmentSection: React.FC = () => {
  return (
    <Box className="secciondl-wrapper">
      <Stack direction="row" justifyContent="space-between" alignItems="center" className="secciondl-header">
        <Typography variant="h6" fontWeight={700}>The course in personal development</Typography>
        <Typography component="a" href="#" className="secciondl-link">See all</Typography>
      </Stack>
      <Grid container spacing={3}>
        {items.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <CardItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonalDevelopmentSection;

