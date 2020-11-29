import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

function SkeletonMedia({ num }) {

  return (
    <Grid container wrap="nowrap">
      {Array.from(new Array(num)).map((item, index) => (
        <Box key={index} width={315} marginRight={5} my={5}>
            <Skeleton variant="rect" width={315} height={200} />
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default SkeletonMedia;