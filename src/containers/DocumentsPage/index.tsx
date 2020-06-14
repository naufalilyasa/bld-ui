/* eslint-disable camelcase */
import React, {useState, useEffect, useContext} from 'react';

import DocumentDataTable, {Document} from '../../components/DocumentDataTable';
import {useObserver} from 'mobx-react';
import {DocumentsContext} from '../../components/DocumentDataTable/Context';
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
  const documentContext = useContext(DocumentsContext);

  useEffect(() => {
    if (!documentContext.data.data) {
      documentContext.refresh();
    }
  }, []);

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

  return useObserver(() => (
    <div>
      <DocumentDataTable
        title="Document List"
        isLoading={documentContext.loading}
        data={documentContext.data.data}
      />
    </div>
  ));
};

export default DocumentsPage;
