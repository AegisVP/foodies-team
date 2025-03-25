import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from 'src/components/Button';
import iconArrow from 'src/images/icons.svg#arrow';
import css from './FollowerItem.module.css';

const FollowerItem = ({
  avatar,
  id,
  isFollowing,
  isMobile,
  isTablet,
  recipes,
  username,
}) => {
  function onButtonClick() {
    // TODO
  }

  function recipesToDisplay() {
    if (isMobile) {
      return [];
    }

    if (isTablet) {
      return recipes.slice(0, 3);
    }

    return recipes.slice(0, 4);
  }

  return (
    <div className={css.component}>
      <div className={css.user}>
        <NavLink
          className={css.avatar}
          to={`/user/${id}`}>
          <img
            alt={`${username} avatar`}
            height="60"
            src={avatar}
            width="60" />
        </NavLink>

        <div>
          <h3 className={css.username}>
            <NavLink to={`/user/${id}`}>
              {username}
            </NavLink>
          </h3>
          

          <p className={css['recipes-count']}>Own recipes: {recipes.length}</p>

          <Button
            ariaLabel={isFollowing ? `Unfollow ${username}` : `Follow ${username}`}
            label={isFollowing ? 'Following' : 'Follow'}
            onClick={onButtonClick} />
        </div>
      </div>

      <div className={css.recipes}>
        {recipesToDisplay().map((recipe) => (
          <NavLink
            className={css.recipe}
            key={recipe.id}
            to={`/recipe/${recipe.id}`}>
            <img
              alt="Thumbnail"
              className={css.thumbnail}
              height="100"
              src={recipe.thumbnail}
              width="100" />
          </NavLink>
        ))}
      </div>

      <Button
        className={css.action}
        ariaLabel="View full recipe"
        icon={iconArrow}
        to={`/recipes/${id}`} />
    </div>
  );
};

FollowerItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  })),
  username: PropTypes.string.isRequired,
};

export default FollowerItem;
