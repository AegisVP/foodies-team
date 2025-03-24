import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from './UserMenu.module.css';
import defaultAvatar from 'src/images/default-avatar.svg';
import spriteArrow from 'src/images/icons.svg#arrow';
import spriteChevronDown from 'src/images/icons.svg#chevron-down';
import spriteChevronUp from 'src/images/icons.svg#chevron-up';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.component} ref={menuRef}>
      <button
        type="button"
        className={css.button}
        onClick={toggleMenu}>
        {/* TODO replace with data from redux */}
        <img
          alt="User avatar"
          className={css.avatar}
          src={defaultAvatar} />

        {/* TODO replace with data from redux */}
        <span className={css.name}>victoria</span> 

        <svg className={css.chevron}>
          <use href={isOpen ?spriteChevronUp : spriteChevronDown } />
        </svg>
      </button>

      {isOpen &&
        <div className={css.menu}>
          <ul>
            <li>
              {/* TODO replace with data from redux */}
              <NavLink to={`/user/${1}`}>Profile</NavLink>
            </li>

            <li>
              <NavLink to="/logout">
                Logout
                <svg>
                  <use href={spriteArrow} />
                </svg>
              </NavLink>
            </li>
          </ul>
        </div>
      }
    </div>
  );
};

export default UserMenu;
