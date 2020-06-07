import React from 'react';
import MUIDataTable, {MUIDataTableColumn, MUIDataTableOptions} from 'mui-datatables';

export interface Student {
  email: string,
}

export interface StudentDataTableProps {
  data: Array<Student>
}

const StudentDataTable: React.FC<StudentDataTableProps> = ({data}) => {
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
  };

  return (
    <MUIDataTable
      title="Student List"
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default StudentDataTable;
