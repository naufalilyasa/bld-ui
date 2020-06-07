/* eslint-disable camelcase */
import React from 'react';
import MUIDataTable, {MUIDataTableColumn, MUIDataTableOptions, MUIDataTableState} from 'mui-datatables';
import {Typography, CircularProgress} from '@material-ui/core';

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
  isLoading: boolean,
  data: Array<Document>,
  page: number,
  count: number;
  onTableChange: (action: string, tableState: MUIDataTableState) => void
}

const DocumentDataTable: React.FC<DocumentDataTableProps> = ({isLoading, data, page, count, onTableChange}) => {
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
      name: 'actions',
      label: 'Actions',
    },
  ];
  const options: MUIDataTableOptions = {
    serverSide: true,
    serverSideFilterList: [],
    print: false,
    rowsPerPage: 15,
    page,
    count,
    onTableChange,
  };

  return (
    <MUIDataTable
      title={
        <Typography variant="h6">
          Document List
          {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
        </Typography>
      }
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DocumentDataTable;
