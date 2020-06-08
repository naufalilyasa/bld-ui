import React, {useState, useEffect} from 'react';
import {AxiosResponse} from 'axios';

import DocumentDataTable from '../../components/DocumentDataTable';


import {DocumentResource} from '../DocumentsPage';

import documentApi from '../../apis/documents';

const HomePage: React.FC<{}> = (props) => {
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
        title="Latest Document List"
        isLoading={isLoading}
        data={data.data}
        sortByCreatedAt
      />
    </div>
  );
};

export default HomePage;
