import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="header__title">AmexMeets</h1>
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
            <Link to="/what"><button className="header__about--what">Cafeteria</button></Link>
            <Link to="/who"><button className="header__about--who">All floors</button></Link>
            <Link to="/why"><button className="header__about--why">{'26th floor'}</button></Link>
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
};

export default connect(mapStateToProps, null)(Header);

