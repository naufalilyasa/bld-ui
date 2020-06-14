import React, {useEffect, useContext} from 'react';
import {useObserver} from 'mobx-react';

import DocumentDataTable from '../../components/DocumentDataTable';
import {DocumentsContext} from '../../components/DocumentDataTable/Context';

const HomePage: React.FC<{}> = (props) => {
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
        title="Latest Document List"
        isLoading={documentContext.loading}
        data={documentContext.data.data}
        sortByCreatedAt
      />
    </div>
  ));
};

export default HomePage;
