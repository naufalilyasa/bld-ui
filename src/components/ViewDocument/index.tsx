import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  makeStyles,
  Theme,
  DialogContentText,
  Box,
} from '@material-ui/core';
import documents from '../../apis/documents';
import {Document} from '../DocumentDataTable';
import {AxiosResponse} from 'axios';

export interface ViewDocumentProps {
  open: boolean;
  documentId?: number;
  onClose: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  author: {
    fontWeight: 'bold',
  },
}));

const ViewDocument: React.FC<ViewDocumentProps> = ({open, documentId, onClose}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [document, setDocument] = React.useState({} as Document);

  React.useEffect(() => {
    if (documentId) {
      if (!document || document.id !== documentId) {
        setLoading(true);

        documents.getDocument(documentId)
            .then((response: AxiosResponse) => {
              const {data}: {data: Document} = response;
              setDocument(data);
              setLoading(false);
            });
      }
    }
  }, [document, documentId]);

  return (
    <Dialog open={open}>
      <DialogTitle>{document.title || 'No Title'}</DialogTitle>
      <DialogContent>
        <Box minWidth="200px">
          <Grid container direction="row">
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Penulis</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.author}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Kategori</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.category}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Publisher</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.publisher}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Dipublikasi pada</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.published_at}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Dibuat pada</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.created_at}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={classes.author}>Item tersedia</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{document.items_available}</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDocument;
