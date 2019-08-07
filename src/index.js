import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span>Hello, World!</span>
    )
  }
}
RootComponent.propTypes = {
};

ReactDOM.render(
    <RootComponent />,
    document.getElementById('root')
);
