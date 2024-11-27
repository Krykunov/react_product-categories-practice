import cn from 'classnames';

import ProductItem from './ProductItem';

const ProductTable = ({
  columns,
  preparedProducts,
  sortBy,
  sortOrder,
  handleClickSort,
}) => {
  return (
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
                        'fa-sort-up': sortBy === column && sortOrder === 'asc',
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
          <ProductItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
