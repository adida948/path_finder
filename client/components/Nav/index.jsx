import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectFloor, selectDestination } from '../../actions/grid';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(floor) {
    return () => {
      this.props.selectFloor(floor);
    };
  }

  render() {
    return (
      <div className="nav">
        <button className="nav__btn--cafe" onClick={this.handleClick('cafe')}>
          Restroom
        </button>

        <button className="nav__btn--floor" onClick={this.handleClick('floor')}>
          Snack Room
        </button>

        <button className="nav__btn--aud" onClick={this.handleClick('aud')}>
          Table Tennis
        </button>
      </div>
    );
  }
}

Nav.propTypes = {
  selectFloor: PropTypes.func.isRequired,
  selectDestination: PropTypes.func.isRequired,
};

export default connect(null, {
  selectFloor,
  selectDestination
})(Nav);
