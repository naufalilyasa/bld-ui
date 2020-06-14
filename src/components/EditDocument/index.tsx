import React, {useContext} from 'react';
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
  TextField,
  CircularProgress,
} from '@material-ui/core';
import documents from '../../apis/documents';
import {Document} from '../DocumentDataTable';
import {AxiosResponse} from 'axios';
import {useFormik} from 'formik';
import {DocumentsContext} from '../DocumentDataTable/Context';

export interface EditDocumentProps {
  open: boolean;
  documentId?: number;
  onClose: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  author: {
    fontWeight: 'bold',
  },
  updating: {
    color: theme.palette.common.white,
  },
}));

const EditDocument: React.FC<EditDocumentProps> = ({open, documentId, onClose}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [document, setDocument] = React.useState({} as Document);

  const documentsContext = useContext(DocumentsContext);

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

  const formikOnSubmit = (data: any) => {
    if (documentId) {
      setUpdating(true);
      documents.updateDocument(documentId, data)
          .then((response: AxiosResponse) => {
            documentsContext.refresh();
            setUpdating(false);
            onClose();
          })
          .catch(() => {
            setUpdating(false);
          });
    }
  };

  const formik = useFormik({
    initialValues: {
      author: document.author,
      category: document.category,
      publisher: document.publisher,
      published_at: document.published_at,
      created_at: document.created_at,
      items_available: document.items_available,
    },
    enableReinitialize: true,
    onSubmit: formikOnSubmit,
  });

  return (
    <Dialog open={open}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Document</DialogTitle>
        <DialogContent>
          <Box minWidth="200px">
            <TextField
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
            <TextField
              name="category"
              label="Kategori"
              value={formik.values.category}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
            <TextField
              name="publisher"
              label="Penerbit"
              value={formik.values.publisher}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
            <TextField
              name="published_at"
              label="Diterbitkan pada"
              value={formik.values.published_at}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
            <TextField
              name="created_at"
              label="Dibuat pada"
              value={formik.values.created_at}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
            <TextField
              name="items_available"
              label="Item tersedia"
              value={formik.values.items_available}
              onChange={formik.handleChange}
              type="text"
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            {updating ? <CircularProgress className={classes.updating} size={24}/> : 'Simpan'}
          </Button>
          <Button onClick={onClose} color="primary" variant="outlined">
            Batal
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDocument;
