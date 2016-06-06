import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import $ from 'jquery';
import { checkAuthentication } from '../actions.js';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    // UI state 
    this.state = {
      search: ''
    };
  }

  onInputChange(e) {
    this.setState({
      search: e.target.value
    });
  };

  onFormSubmit() {
    console.log('submitted', this.state.search);
    // ###################### SEARCH STRING MUST NOT BE EMPTY OR SEARCH WILL BE WRONG ###################
    if (this.state.search) {
      $.post('/search', { search: this.state.search }, data => {
        this.props.updateSearchResults(data);
      });
      this.setState({ search: '' });
    }
    // browserHistory.push('/searchresults');
  }

  render() {
    return (
      <form className='searchbar pure-form' onSubmit={this.onFormSubmit.bind(this)}>
        <input type='text' 
               onChange={this.onInputChange.bind(this)} 
               className='search-input pure-input-2-3' 
               value={this.state.search} />
        <button type='submit' className='submit-search pure-button pure-button-primary'>
          <Link to='/searchresults'><img src='http://www.gardenbenches.com/assets/search_mob-4e31f0d049c237cff0aa0f66fc77efc1.png' className='search-icon' /></Link>
        </button>
      </form>
    ) 
  }

}

var mapDispatchToProps = function(dispatch){
  return {
    // use this information to populate search results page
    updateSearchResults: (results) => {
      dispatch({
        type: 'CLEAR_SEARCH_RESULTS'
      })
      dispatch({
        type: 'UPDATE_SEARCH_RESULTS',
        results
      })
    }
  }
};

module.exports = connect(null, mapDispatchToProps)(SearchBar);
