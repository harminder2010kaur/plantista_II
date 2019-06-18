import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import close from '../../assets/images/cross.png';
import PropTypes from "prop-types";

class Search extends Component{
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
      };
    
      static defaultProps = {
        suggestions: []
      };

    state = {        
        // The active selection's index
        activeSuggestion: 0,
      // The suggestions that match the user's input
        filteredSuggestions: [],
      // Whether or not the suggestion list is shown
        showSuggestions: false,
      // What the user has entered
        userInput: ""
    }

    // Event fired when the input value is changed
    onChange = e => {
        const suggestions  = this.props.suggestions;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
        suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

    clear = (e) => {
        e.target.value = "";
    }
    
    render()    
    {           
        
        const search_div = this.props.display === true ? "search-menu true" : "search-menu false";     
        
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
              activeSuggestion,
              filteredSuggestions,
              showSuggestions,
              userInput
            }
          } = this;
      
          let suggestionsListComponent;
      
          if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
              suggestionsListComponent = (
                <ul className="suggestions">
                  {filteredSuggestions.map((suggestion, index) => {
                    let className;      
                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) {
                      className = "suggestion-active";
                    }
      
                    return (
                      <li
                        className={className}
                        key={suggestion}
                        onClick={onClick}>
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              suggestionsListComponent = (
                <div className="no-suggestions">
                  <em>No plant with this name was found</em>
                </div>
              );
            }
          }

        return(
            
            <div className={search_div}>  
                
                    <form ref={form => this.form = form} autoComplete="off">
                        <div className="search-menu-content">
                            <div className="search-menu-content__close">
                                <img src={close} alt="close" onClick={this.props.close}/>
                            </div>
                            <div className="search-menu-content__inputBox">
                                <input type="text" name="plant" onFocus={this.clear}  
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={userInput}
                                className="search-menu-content__inputBox--in"/>
                                {suggestionsListComponent}
                            </div>  
                            <div className="search-menu-content__button">
                                <Link to={'/name/'+this.state.userInput}><button type="submit" name="publish" className="search-menu-content__button--submit" onClick={this.props.close}>Search</button></Link>                
                            </div>
                        </div>   
                    </form>                                           
            </div>            
        )
    }
}

export default Search;