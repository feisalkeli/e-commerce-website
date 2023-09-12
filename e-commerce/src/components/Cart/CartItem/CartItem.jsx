import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const CartItem = ({ item, onUpdateCartQty, onRemoveCartQty }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={item.name}
        height="500"
        image={item.image.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h3">
          {item.name}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
        >
          <RemoveIcon />
        </Button>
        <Typography variant="h5">{item.quantity}</Typography>
        <Button
          size="small"
          onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
        >
          <AddIcon />
        </Button>
        <div>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => onRemoveCartQty(item.id)}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
