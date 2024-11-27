import cn from 'classnames';

import categoriesFromServer from '../api/categories';

const FilterCategories = ({
  activeCategories,
  handleSelectCategory,
  handleClearCategories,
}) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6', {
          'is-outlined': activeCategories.length !== 0,
        })}
        onClick={handleClearCategories}
      >
        All
      </a>

      {categoriesFromServer.map(category => (
        <a
          key={category.id}
          data-cy="Category"
          className={cn('button mr-2 my-1', {
            'is-info': activeCategories.includes(category.title),
          })}
          href="#/"
          onClick={() => handleSelectCategory(category.title)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};

export default FilterCategories;
