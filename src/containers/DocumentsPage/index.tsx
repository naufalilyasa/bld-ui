/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';

import DocumentDataTable, {Document} from '../../components/DocumentDataTable';
import documentApi from '../../apis/documents';
import {AxiosResponse} from 'axios';
// import {MUIDataTableState} from 'mui-datatables';

export interface DocumentLinks {
  self: string;
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface DocumentMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface DocumentResource {
  data: Document[],
  links: DocumentLinks,
  meta: DocumentMeta
}

const DocumentsPage: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({} as DocumentResource);

  useEffect(() => {
    if (!data.data) {
      setLoading(true);
      documentApi.getAll()
          .then((response: AxiosResponse) => {
            setData(response.data);
            setLoading(false);
          });
    }
  }, [data]);

  // const handleChangeRowsPerPage = (rows: number, page: number) => {
  //   setLoading(true);
  //   documentApi.getAll({rows, page})
  //       .then((response: AxiosResponse) => {
  //         setLoading(false);
  //         setData(response.data);
  //       });
  // };

  // const handleChangePage = (page: number) => {
  //   setLoading(true);
  //   documentApi.getAll({page})
  //       .then((response: AxiosResponse) => {
  //         setLoading(false);
  //         setData(response.data);
  //       });
  // };

  // const handleTableChange = (action: string, tableState: MUIDataTableState) => {
  //   console.log(action);
  // };

  return (
    <div>
      <DocumentDataTable
        title="Document List"
        isLoading={isLoading}
        data={data.data}
      />
    </div>
  );
};

export default DocumentsPage;
