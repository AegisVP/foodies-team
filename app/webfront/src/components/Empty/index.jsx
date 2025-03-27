import PropTypes from 'prop-types';
import css from './Empty.module.css';

const Empty = ({ message }) => {
    return (
        <div className={css.component}>
            <p className={css.message}>{message}</p>
        </div>
    );
};

PropTypes.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Empty;
