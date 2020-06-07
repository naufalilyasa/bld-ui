import React from 'react';
import PropTypes from 'prop-types';

const HomePage: React.FC<{}> = (props) => {
  return (
    <div>
      Hello from HomePage
    </div>
  );
};

HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;
