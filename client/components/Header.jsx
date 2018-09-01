import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleFloors } from '../actions/grid';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(floor) {
    return () => {
      this.props.toggleFloors(floor);
    };
  }

  render() {
    return (
      <div className="header">
        <h1 className="header__title">Path Finder</h1>
        <div className="header__about">
          <button onClick={this.handleClick('cafe')} className="header__about--what">
            Cafeteria
          </button>
          <button onClick={this.handleClick('floor')} className="header__about--who">
            Floor
          </button>
          <button onClick={this.handleClick('aud')} className="header__about--why">
            Auditorium
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Header.propTypes = {
  toggleFloors: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    toggleFloors,
  },
)(Header);
