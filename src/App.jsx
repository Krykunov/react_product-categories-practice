/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { filterProducts, getProducts } from './utils/services';
import ProductTable from './components/ProductTable';
import NoMatchingMessage from './components/NoMatchingMessage';
import Filters from './components/Filters';

const productsFull = getProducts(
  productsFromServer,
  categoriesFromServer,
  usersFromServer,
);

const columns = ['ID', 'Product', 'Category', 'User'];

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getSearchParam = (param, defaultValue) =>
    searchParams.get(param) ?? defaultValue;

  const [activeUser, setActiveUser] = useState(getSearchParam('user', 'all'));
  const [query, setQuery] = useState(getSearchParam('query', ''));
  const [activeCategories, setActiveCategories] = useState(
    getSearchParam('categories', '').split('-').filter(Boolean),
  );
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    setSearchParams(
      `?user=${activeUser}&query=${query}&categories=${activeCategories.join('-')}`,
    );
  }, [activeUser, query, activeCategories, searchParams, setSearchParams]);

  const preparedProducts = filterProducts(productsFull, {
    user: activeUser,
    query,
    categories: activeCategories,
    sortBy,
    sortOrder,
  });

  const handleSetUser = user => {
    setActiveUser(user);
  };

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleSelectCategory = cat => {
    setActiveCategories(prevCats => {
      if (prevCats.includes(cat)) {
        return prevCats.filter(item => item !== cat);
      }

      return [...prevCats, cat];
    });
  };

  const handleClearCategories = () => {
    setActiveCategories([]);
  };

  const handleClearFilters = () => {
    setActiveUser('all');
    setQuery('');
    setActiveCategories([]);
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
          <Filters
            activeUser={activeUser}
            handleSetUser={handleSetUser}
            query={query}
            activeCategories={activeCategories}
            handleQueryChange={handleQueryChange}
            handleClearQuery={handleClearQuery}
            handleClearFilters={handleClearFilters}
            handleSelectCategory={handleSelectCategory}
            handleClearCategories={handleClearCategories}
          />
        </div>

        <div className="box table-container">
          {preparedProducts.length !== 0 ? (
            <ProductTable
              columns={columns}
              preparedProducts={preparedProducts}
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleClickSort={handleClickSort}
            />
          ) : (
            <NoMatchingMessage />
          )}
        </div>
      </div>
    </div>
  );
};
