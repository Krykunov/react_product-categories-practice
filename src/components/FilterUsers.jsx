import cn from 'classnames';

import usersFromServer from '../api/users';

const FilterUsers = ({ activeUser, handleSetUser }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={cn({
          'is-active': activeUser === 'all',
        })}
        onClick={() => handleSetUser('all')}
      >
        All
      </a>
      {usersFromServer.map(user => (
        <a
          href="#/"
          key={user.id}
          data-cy="FilterUser"
          className={cn({
            'is-active': user.name === activeUser,
          })}
          onClick={() => handleSetUser(user.name)}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};

export default FilterUsers;
