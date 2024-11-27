export const getProducts = (products, categories, users) =>
  products.map(product => {
    const category = categories.find(cat => cat.id === product.categoryId);
    const user = users.find(userItem => userItem.id === category.ownerId);

    return {
      ...product,
      categoryName: category.title,
      categoryIcon: category.icon,
      user: user.name,
      userSex: user.sex,
    };
  });

export const filterProducts = (products, params) => {
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
