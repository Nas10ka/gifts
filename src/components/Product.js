import { connect } from 'react-redux';
import { useState } from 'react';
import Skeleton from './Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 300,
  },
});

const Product = props => {
  const classes = useStyles();
  const { products, id } = props;
  const [product, setProduct] = useState(null);
  if (!product && products && id){
    const p = products.filter(i => i._id === id)[0];
    setProduct(p)
  }

  const video = product?.media.filter(i => i.type === 'video')[0];

  return (
    <div>
      {product ? 
        <Grid container>
          <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            title={product?.name}
          >
            <video className='player' src={video?.url} alt='video' controls />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {product.vendor}
            </Typography>
          </CardContent>
          </Card>
        </Grid>
        : <Skeleton num={1} />}
    </div>
  )};

const mapStateToProps = (state, props) => ({
  products: state.data.products,
  id: props?.match?.params?.id,
});

export default connect(mapStateToProps)(Product);