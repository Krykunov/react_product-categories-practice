import FilterUsers from './FilterUsers';
import FilterSearch from './FilterSearch';
import FilterCategories from './FilterCategories';

const Filters = ({
  activeUser,
  handleSetUser,
  query,
  handleClearQuery,
  activeCategories,
  handleQueryChange,
  handleClearFilters,
  handleSelectCategory,
  handleClearCategories,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterUsers activeUser={activeUser} handleSetUser={handleSetUser} />

      <FilterSearch
        query={query}
        handleQueryChange={handleQueryChange}
        handleClearQuery={handleClearQuery}
      />

      <FilterCategories
        activeCategories={activeCategories}
        handleSelectCategory={handleSelectCategory}
        handleClearCategories={handleClearCategories}
      />

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={handleClearFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

export default Filters;
