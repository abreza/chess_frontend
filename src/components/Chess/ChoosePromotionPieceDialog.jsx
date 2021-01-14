import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const PieceCard = ({ name, img, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const pieces = [
  {
    name: 'اسب',
    code: 'n',
    wImg: process.env.PUBLIC_URL + '/images/wn.png',
    bImg: process.env.PUBLIC_URL + '/images/bn.png',
  },
  {
    name: 'فیل',
    code: 'b',
    wImg: process.env.PUBLIC_URL + '/images/wb.png',
    bImg: process.env.PUBLIC_URL + '/images/bb.png',
  },
  {
    name: 'قلعه',
    code: 'r',
    wImg: process.env.PUBLIC_URL + '/images/wr.png',
    bImg: process.env.PUBLIC_URL + '/images/br.png',
  },
  {
    name: 'وزیر',
    code: 'q',
    wImg: process.env.PUBLIC_URL + '/images/wq.png',
    bImg: process.env.PUBLIC_URL + '/images/bq.png',
  },
];

const ChoosePromotionPieceDialog = ({ open, color, handleClose, onSelect }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography gutterBottom variant="h3" align="center">
          انتخاب مهره
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} alignItems="center" justify="center">
          {pieces.map((piece) => (
            <Grid item xs={6} sm={3} key={piece.code}>
              <PieceCard
                name={piece.name}
                img={color === 'b' ? piece.bImg : piece.wImg}
                onClick={() => onSelect(piece.code)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ChoosePromotionPieceDialog;
