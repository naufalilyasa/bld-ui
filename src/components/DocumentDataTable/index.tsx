/* eslint-disable camelcase */
import React from 'react';
import MUIDataTable, {MUIDataTableColumn, MUIDataTableOptions, MUIDataTableState} from 'mui-datatables';
import {Typography, CircularProgress} from '@material-ui/core';
import CustomToolbarSelect from './CustomToolbarSelect';

export interface Document {
  id: number;
  user_id: number;
  title: string;
  author: string;
  publisher: string;
  category: string;
  items_available: number;
  location: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface DocumentDataTableProps {
  title: string;
  isLoading: boolean;
  data: Array<Document>;
  page?: number;
  count?: number;
  onTableChange?: (action: string, tableState: MUIDataTableState) => void;
  options?: MUIDataTableOptions;
  sortByCreatedAt?: boolean;
}

const DocumentDataTable: React.FC<DocumentDataTableProps> = ({title, isLoading, data, options = {}, sortByCreatedAt = false}) => {
  const columns: Array<MUIDataTableColumn> = [
    {
      name: 'title',
      label: 'Title',
    },
    {
      name: 'author',
      label: 'Author',
    },
    {
      name: 'publisher',
      label: 'Publisher',
    },
    {
      name: 'items_available',
      label: 'Items Available',
    },
    {
      name: 'location',
      label: 'Location',
    },
    {
      name: 'created_at',
      label: 'Created At',
    },
  ];

  if (sortByCreatedAt) {
    columns[5].options = {
      sort: true,
      sortDirection: 'desc',
    };
  }

  const extendedOptions: MUIDataTableOptions = {
    print: false,
    rowsPerPage: 15,
    // eslint-disable-next-line react/display-name
    customToolbarSelect: (
        selectedRows: {
        data: Array<{ index: number; dataIndex: number }>;
        lookup: { [key: number]: boolean };
      },
        displayData: Array<{ data: any[]; dataIndex: number }>,
        setSelectedRows: (rows: number[]) => void,
    ) => (
      <CustomToolbarSelect data={data} selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
    ),
    ...options,
  };

  return (
    <MUIDataTable
      title={
        <Typography variant="h6">
          {title}
          {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
        </Typography>
      }
      data={data}
      columns={columns}
      options={extendedOptions}
    />
  );
};

export default DocumentDataTable;
