import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from 'src/components/Button';
import iconArrow from 'src/images/icons.svg#arrow';
import { followUser, unfollowUser } from 'src/redux/user/operations.js';
import css from './FollowerItem.module.css';

const FollowerItem = ({ avatar, id, isFollowing, isMobile, isTablet, recipes, recipesCount, username }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const dispatch = useDispatch();
    function onButtonClick() {
        setButtonDisabled(true);

        if (isFollowing) {
            dispatch(unfollowUser(id));
            return;
        }

        dispatch(followUser(id));
    }

    function recipesToDisplay() {
        if (isMobile) {
            return [];
        }

        if (isTablet) {
            return recipes?.slice(0, 3);
        }

        return recipes?.slice(0, 4);
    }

    return (
        <li className={css.component}>
            <div className={css.user}>
                <NavLink className={css.avatar} to={`/user/${id}`}>
                    <img alt={`${username} avatar`} height="60" src={avatar} width="60" />
                </NavLink>

                <div>
                    <h3 className={css.username}>
                        <NavLink to={`/user/${id}`}>{username}</NavLink>
                    </h3>

                    <p className={css['recipes-count']}>Own recipes: {recipesCount}</p>

                    <Button
                        ariaLabel={isFollowing ? `Unfollow ${username}` : `Follow ${username}`}
                        label={isFollowing ? 'Following' : 'Follow'}
                        size="small"
                        disabled={buttonDisabled}
                        onClick={onButtonClick}
                    />
                </div>
            </div>

            <div className={css.recipes}>
                {recipesToDisplay()?.map(recipe => (
                    <NavLink className={css.recipe} key={recipe.id} to={`/recipe/${recipe.id}`}>
                        <img
                            alt="Thumbnail"
                            className={css.thumbnail}
                            height="100"
                            src="https://www.foodandwine.com/thmb/kuakUXBI867NCXNKErdjriQTkDM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/FAW-recipes-pasta-sausage-basil-and-mustard-ingredients-1b50ce143bb74823a1622d738da10b66.jpg"
                            width="100"
                        />
                    </NavLink>
                ))}
            </div>

            <Button className={css.action} ariaLabel="View profile" icon={iconArrow} to={`/user/${id}`} />
        </li>
    );
};

FollowerItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    isTablet: PropTypes.bool.isRequired,
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
        })
    ),
    recipesCount: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
};

export default FollowerItem;
