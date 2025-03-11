import {
  Grid,
  CircularProgress,
  Typography as MuiTypography,
} from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export const ProductListing = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  if (error)
    return (
      <MuiTypography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </MuiTypography>
    );

  return (
    <Grid container spacing={3}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))
      ) : (
        <MuiTypography sx={{ textAlign: "center", width: "100%", mt: 4 }}>
          No products available
        </MuiTypography>
      )}
    </Grid>
  );
};
