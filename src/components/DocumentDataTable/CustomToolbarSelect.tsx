import React from 'react';
import {Tooltip, IconButton, Box} from '@material-ui/core';
import {
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  AssignmentReturn as AssignmentReturnIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';
import documentApi from '../../apis/documents';
import Swal from 'sweetalert2';
import {Document} from '.';
import ViewDocument from '../ViewDocument';
import EditDocument from '../EditDocument';

export interface CustomToolbarSelectProps {
  data: Array<Document>;
  selectedRows: {
    data: Array<{ index: number; dataIndex: number }>;
    lookup: { [key: number]: boolean };
  };
  displayData: Array<{ data: any[]; dataIndex: number }>;
  setSelectedRows: (rows: number[]) => void;
}

const CustomToolbarSelect: React.FC<CustomToolbarSelectProps> = ({data, selectedRows, displayData, setSelectedRows}) => {
  const handleBorrowDocuments = () => {
    const selectedRowsIdx: number[] = selectedRows.data.map(({dataIndex}) => dataIndex);
    const ids: string = data
        .filter((_, index) => selectedRowsIdx.includes(index))
        .map((doc: Document) => doc.id)
        .join(',');

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to borrow all selected documents?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        documentApi.borrowDocuments(ids)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Successfully borrowed all documents',
              });
            });
      }
    });
  };

  const handleReturnDocuments = () => {
    const selectedRowsIdx: number[] = selectedRows.data.map(({dataIndex}) => dataIndex);
    const ids: string = data
        .filter((_, index) => selectedRowsIdx.includes(index))
        .map((doc: Document) => doc.id)
        .join(',');

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to return all selected documents?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        documentApi.returnDocuments(ids)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Successfully returned all documents',
              });
            });
      }
    });
  };

  const handleConfirmDocuments = () => {
    const selectedRowsIdx: number[] = selectedRows.data.map(({dataIndex}) => dataIndex);
    const ids: string = data
        .filter((_, index) => selectedRowsIdx.includes(index))
        .map((doc: Document) => doc.id)
        .join(',');

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to confirm all selected documents?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        documentApi.confirmDocuments(ids)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Successfully returned all documents',
              });
            });
      }
    });
  };

  const handleDeleteDocuments = () => {
    const selectedRowsIdx: number[] = selectedRows.data.map(({dataIndex}) => dataIndex);
    const ids: string = data
        .filter((_, index) => selectedRowsIdx.includes(index))
        .map((doc: Document) => doc.id)
        .join(',');

    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure want to delete all selected documents?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        documentApi.deleteDocuments(ids)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Successfully deleted all documents',
              });
            });
      }
    });
  };

  const [viewDocumentOpen, setViewDocumentOpen] = React.useState(false);
  const [editDocumentOpen, setEditDocumentOpen] = React.useState(false);

  const toggleViewDocument = () => {
    setViewDocumentOpen(!viewDocumentOpen);
  };

  const toggleEditDocument = () => {
    setEditDocumentOpen(!editDocumentOpen);
  };

  return (
    <Box marginRight="24px">
      <ViewDocument
        open={viewDocumentOpen}
        onClose={toggleViewDocument}
        documentId={data[selectedRows.data[0].dataIndex].id}
      />
      <EditDocument
        open={editDocumentOpen}
        onClose={toggleEditDocument}
        documentId={data[selectedRows.data[0].dataIndex].id}
      />
      {selectedRows.data.length > 1 ? (
        <React.Fragment>
          <IconButton disabled onClick={toggleViewDocument}>
            <VisibilityIcon/>
          </IconButton>
          <IconButton disabled>
            <EditIcon/>
          </IconButton>
        </React.Fragment>

      ): (
        <React.Fragment>
          <Tooltip title="View document">
            <IconButton onClick={toggleViewDocument}>
              <VisibilityIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit document">
            <IconButton onClick={toggleEditDocument}>
              <EditIcon/>
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}
      <Tooltip title="Borrow document(s)">
        <IconButton onClick={handleBorrowDocuments}>
          <AssignmentIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Return document(s)">
        <IconButton onClick={handleReturnDocuments}>
          <AssignmentReturnIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Confirm document(s)">
        <IconButton onClick={handleConfirmDocuments}>
          <AssignmentTurnedInIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete document(s)">
        <IconButton onClick={handleDeleteDocuments}>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CustomToolbarSelect;
