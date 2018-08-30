import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleFloors } from '../actions/grid';

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(floor) {
    return (e) => {
      this.props.toggleFloors(floor);
    }
  }
  
  render() {
    return (
      <div className="header">
        <h1 className="header__title">Amex Connect</h1>
        <div className="header__rightNav">
          <div className="header__auth">
            <button className="header__auth--login">
              Log in
            </button>
            <button className="header__auth--signup">
              Sign up
            </button>
          </div>
          <div className="header__about">
            <button onClick={this.handleClick('cafe')} className="header__about--what">Cafeteria</button>
            <button onClick={this.handleClick('floor')}  className="header__about--who">Floor</button>
            <button onClick={this.handleClick('aud')}  className="header__about--why">Auditorium</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
  toggleFloors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  toggleFloors,
})(Header);

