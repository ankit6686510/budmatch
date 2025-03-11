import { Card, CardMedia, CardContent, Typography, Button, Rating } from '@mui/material';

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card sx={{ height: '100%', position: 'relative', '&:hover': { boxShadow: 3 } }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>{product.name}</Typography>
        <Rating value={product.rating} precision={0.5} readOnly sx={{ my: 1 }} />
        <Typography variant="h5" color="primary">₹{product.price}</Typography>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>Quick View</Button>
      </CardContent>
    </Card>
  );
};