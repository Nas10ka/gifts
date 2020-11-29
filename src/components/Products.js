import { useState } from "react";
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Product from './Product';
import Skeleton from './Skeleton';
import actions from '../ducks/actions/index';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '20px auto',

  },
  media: {
    height: 340,
    backgroundSize: "contain",
  },
  active: {
    backgroundColor: "yellow",
  },
});

const MediaCard = (props) => {
  const { id, name, media = [], setCurrentProduct, openProduct } = props;
  const img = media.filter((i) => i.type === "image")[0];

  const classes = useStyles();

  const goToProductDetails = () => {
    setCurrentProduct(props);
    openProduct(id);
  }

  return (
    <Card className={classes.root} onClick={goToProductDetails}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img?.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h3">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        Learn More
      </CardActions>
    </Card>
  );
};
const Products = ({ products, vendors, setCurrentProduct, openProduct }) => {
  const classes = useStyles();

  const p = products ? Object.values(products) : null;

  const [data, setData] = useState(null);

  if (p && !data) setData(p);

  const [vendor, setVendor] = useState("");

  const filterByVendor = (vendorId) => () => {
    if (vendorId === vendor) {
      setVendor('')
      search ? makeSearch(search, p) : setData(p);
    } else {
      
      const filtered = search
        ? p.filter((p) => p?.vendor === vendorId && p?.name.toLowerCase().includes(search))
        : p.filter((p) => p?.vendor === vendorId);
      setVendor(vendorId);
      setData(filtered);
    }
  };

  const [search, setSearch] = useState('');

  const makeSearch = (string, p) => {
    const products = p || data;
    const str = string.toLowerCase();
    setSearch(str);
    const result = products.filter(i => i.name.toLowerCase().includes(str));
    setData(result);
  }

  return (
    <>
      <Grid container>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => makeSearch(e?.target?.value, p)}
        />
        {vendors
          ? vendors.map((i, index) => (
              <Paper
                key={index}
                onClick={filterByVendor(i?.name)}
                className={vendor === i?.name ? classes.active : ""}
              >
                {i?.name}
              </Paper>
            ))
          : null}
      </Grid>
      <Grid container>
        {data
          ? data.map((product, index) => {
              return (
                <Grid  key={product?.id} item xs={3}>
                  <MediaCard
                    id={product?.id}
                    name={product?.name}
                    media={product?.media}
                    order={product?.order}
                    promotion={product?.promotion}
                    vendor={product?.vendor}
                    setCurrentProduct={setCurrentProduct}
                    openProduct={openProduct}
                  />
                </Grid>
              );
            })
          : <Skeleton num={4} />}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.data.products,
  vendors: state.data.vendors,
});

const mapDispatchToProps = {
  setCurrentProduct: actions.setCurrentProduct,
  openProduct: (id) => push(`/product/${id}`)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
