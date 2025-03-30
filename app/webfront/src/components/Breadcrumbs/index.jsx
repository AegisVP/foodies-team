// src/components/Breadcrumbs/index.jsx
import { Link } from 'react-router-dom';
import css from './Breadcrumbs.module.css';

const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav className={css.breadcrumbsContainer} aria-label="Breadcrumbs">
            <ol className={css.breadcrumbsList}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.path + index} className={css.breadcrumbItem}>
                            {isLast ? (
                                <span className={css.currentPage}>{item.label}</span>
                            ) : (
                                <>
                                    <Link to={item.path} className={css.breadcrumbLink}>
                                        {item.label}
                                    </Link>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
