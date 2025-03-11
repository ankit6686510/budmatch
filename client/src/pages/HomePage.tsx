// src/pages/HomePage.tsx
import { Grid } from '@mui/material';
import { Navbar } from '../components/Navbar/Navbar';
import { FiltersSidebar } from '../components/FiltersSidebar/FiltersSidebar';
import { ProductListing } from '../components/ProductListing/ProductListing';

// Changed from named export to default export
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={3}>
          <FiltersSidebar />
        </Grid>
        <Grid item xs={9}>
          <ProductListing />
        </Grid>
      </Grid>
    </div>
  );
}