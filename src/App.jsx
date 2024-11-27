/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

import cn from 'classnames';

import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const productsAll = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );
  const user = usersFromServer.find(
    userItem => userItem.id === category.ownerId,
  );

  return {
    ...product,
    categoryName: category.title,
    categoryIcon: category.icon,
    user: user.name,
    userSex: user.sex,
  };
});

const filterProducts = (products, params) => {
  const { user, query, categories, sortBy, sortOrder } = params;

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    .filter(product => {
      if (user === 'all') return true;

      return product.user === user;
    })

    .filter(product => {
      if (categories.length === 0) return true;

      return categories.includes(product.categoryName);
    })
    .toSorted((product1, product2) => {
      switch (sortBy) {
        case 'ID': {
          if (sortOrder === 'asc') {
            return product1.id - product2.id;
          }

          if (sortOrder === 'desc') {
            return product2.id - product1.id;
          }

          break;
        }

        case 'Product': {
          if (sortOrder === 'asc') {
            return product1.name.localeCompare(product2.name);
          }

          if (sortOrder === 'desc') {
            return product2.name.localeCompare(product1.name);
          }

          break;
        }

        case 'Category': {
          if (sortOrder === 'asc') {
            return product1.categoryName.localeCompare(product2.categoryName);
          }

          if (sortOrder === 'desc') {
            return product2.categoryName.localeCompare(product1.categoryName);
          }

          break;
        }

        case 'User': {
          if (sortOrder === 'asc') {
            return product1.user.localeCompare(product2.user);
          }

          if (sortOrder === 'desc') {
            return product2.user.localeCompare(product1.user);
          }

          break;
        }

        default:
          return 0;
      }

      return 0;
    });

  return filteredProducts;
};

const columns = ['ID', 'Product', 'Category', 'User'];

export const App = () => {
  const [activeUser, setActiveUser] = useState('all');
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const preparedProducts = filterProducts(productsAll, {
    user: activeUser,
    query,
    categories: activeCategories,
    sortBy,
    sortOrder,
  });

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleClearFilters = () => {
    setActiveUser('all');
    setQuery('');
    setActiveCategories([]);
  };

  const handleSelectCategory = cat => {
    setActiveCategories(prevCats => {
      if (prevCats.includes(cat)) {
        return prevCats.filter(item => item !== cat);
      }

      return [...prevCats, cat];
    });
  };

  const handleClickSort = param => {
    setSortBy(param);

    if (param === sortBy) {
      setSortOrder(prevOrder => {
        if (prevOrder === null) return 'asc';

        if (prevOrder === 'asc') return 'desc';

        return null;
      });
    } else {
      setSortOrder('asc');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': activeUser === 'all',
                })}
                onClick={() => setActiveUser('all')}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({
                    'is-active': user.name === activeUser,
                  })}
                  onClick={() => setActiveUser(user.name)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleQueryChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': activeCategories.length !== 0,
                })}
                onClick={() => setActiveCategories([])}
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
        </div>

        <div className="box table-container">
          {preparedProducts.length !== 0 ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columns.map(column => (
                    <th key={column}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {column}
                        <a href="#/">
                          <button
                            type="button"
                            className="icon"
                            onClick={() => handleClickSort(column)}
                          >
                            <i
                              data-cy="SortIcon"
                              className={cn('fas', {
                                'fa-sort': sortBy !== column || !sortOrder,
                                'fa-sort-up':
                                  sortBy === column && sortOrder === 'asc',
                                'fa-sort-down':
                                  sortBy === column && sortOrder === 'desc',
                              })}
                            />
                          </button>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {preparedProducts.map(product => (
                  <tr data-cy="Product" key={product.id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>
                    <td data-cy="ProductCategory">{`${product.categoryIcon} - ${product.categoryName}`}</td>

                    <td
                      data-cy="ProductUser"
                      className={cn({
                        'has-text-link': product.userSex === 'm',
                        'has-text-danger': product.userSex === 'f',
                      })}
                    >
                      {product.user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
