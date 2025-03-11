import { List, ListItemButton, ListItemText, Checkbox, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

export const FiltersSidebar = () => {
  const [openPrice, setOpenPrice] = useState(true);
  const [openBrand, setOpenBrand] = useState(true);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handlePriceToggle = (price: string) => {
    setSelectedPrices(prev => 
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <List>
      {/* Price Filter */}
      <ListItemButton onClick={() => setOpenPrice(!openPrice)}>
        <ListItemText primary="Price" />
        {openPrice ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPrice} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000"].map((price) => (
            <ListItemButton key={price} sx={{ pl: 4 }}>
              <Checkbox 
                size="small" 
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceToggle(price)}
              />
              <ListItemText primary={price} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      {/* Brand Filter */}
      <ListItemButton onClick={() => setOpenBrand(!openBrand)}>
        <ListItemText primary="Brand" />
        {openBrand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBrand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {["Apple", "Samsung", "Sony"].map((brand) => (
            <ListItemButton key={brand} sx={{ pl: 4 }}>
              <Checkbox 
                size="small" 
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              <ListItemText primary={brand} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
