import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Input, Divider } from 'antd';
import './index.css';
import { getSearchRecipes, getOneRecipe } from '../../actions/recipes.actions';
import GlobalCard from '../../components/GlobalCard';

const Search = Input.Search;

class GlobalRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      name: [],
      instructions: [],
      imageUrl: ''
    };
  }

  componentDidMount() {
    this.props.getSearchRecipes('featured');
  }

  showRecipe(id) {
    this.props.getOneRecipe(id);
  }

  renderCards() {
    if (this.props.loadingGlobalRecipes) {
      return (
        <div className="global__search">
          <div className="search__bar">
            <Search
              placeholder="Search for Tasty Recipes"
              onSearch={value => this.props.getSearchRecipes(value)}
            />
          </div>
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className="global__search">
          <div className="search__bar">
            <Search
              size="large"
              placeholder="Search for Tasty Recipes"
              onSearch={value => this.props.getSearchRecipes(value)}
            />
          </div>

          <div className="cards">
            {this.props.globalRecipes.map((el, i) => (
              <GlobalCard
                key={i}
                id={el.RecipeID}
                imageUrl={el.PhotoUrl}
                name={el.Title}
              />
            ))}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="global__recipes--container">
        <div className="list__title">
          <h2>Search for tasty recipes</h2>
        </div>
        <Divider />
        {this.renderCards()}
      </div>
    );
  }
}

GlobalRecipes.propTypes = {
  loadingGlobalRecipes: PropTypes.bool,
  loadingOneGlobalRecipes: PropTypes.bool,
  getSearchRecipes: PropTypes.func,
  getOneRecipe: PropTypes.func,
  globalRecipes: PropTypes.array,
  globalRecipe: PropTypes.object
};

const mapStateToProps = state => ({
  loadingGlobalRecipes: state.pages.loadingGlobalRecipes,
  globalRecipes: state.pages.globalRecipes,
  globalRecipe: state.pages.globalRecipe,
  loadingOneGlobalRecipe: state.pages.loadingOneGlobalRecipe
});

const mapDispatchToProps = dispatch => ({
  getSearchRecipes: keyWord => dispatch(getSearchRecipes(keyWord)),
  getOneRecipe: RecipeID => dispatch(getOneRecipe(RecipeID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalRecipes);
