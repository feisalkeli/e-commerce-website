import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";

const Product = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345, mt: 12 }}>
      <CardMedia sx={{ height: 500 }} image={product.image.url} title="shoes" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography>Price : {product.price.formatted_with_symbol}</Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <div className="flex justify-end">
          <IconButton
            aria-label="Add to cart"
            sx={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => onAddToCart(product.id, 1)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default Product;
