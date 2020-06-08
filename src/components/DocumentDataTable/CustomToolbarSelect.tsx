import React from 'react';
import {Tooltip, IconButton, Box} from '@material-ui/core';
import {
  Edit as EditIcon,
  Assignment as AssignmentIcon,
  AssignmentReturn as AssignmentReturnIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

export interface CustomToolbarSelectProps {
  selectedRows: {
    data: Array<{ index: number; dataIndex: number }>;
    lookup: { [key: number]: boolean };
  };
  displayData: Array<{ data: any[]; dataIndex: number }>;
  setSelectedRows: (rows: number[]) => void;
}

const CustomToolbarSelect: React.FC<CustomToolbarSelectProps> = ({selectedRows, displayData, setSelectedRows}) => {
  return (
    <Box marginRight="24px">
      <Tooltip title="View document">
        <IconButton disabled={selectedRows.data.length > 1}>
          <VisibilityIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit document">
        <IconButton disabled={selectedRows.data.length > 1}>
          <EditIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Return document">
        <IconButton>
          <AssignmentReturnIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Borrow document">
        <IconButton>
          <AssignmentIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete document">
        <IconButton>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CustomToolbarSelect;
