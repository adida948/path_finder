import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectFloor } from '../../actions/grid';

class Header extends Component {
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
      <div className="header">
        <button
          className="header__btn--cafe"
          onClick={this.handleClick('cafe')}
        >Cafeteria
        </button>

        <button
          className="header__btn--floor"
          onClick={this.handleClick('floor')}
        >Floor
        </button>

        <button
          className="header__btn--aud"
          onClick={this.handleClick('aud')}
        >Auditorium
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  selectFloor: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    selectFloor,
  },
)(Header);
