import css from './Testimonial.module.css';
import spriteQuotes from '../../images/icons.svg#quotes';

const Testimonial = ({ item }) => {
    return (
        <div className={css.testimonialContainer}>
            <svg className={css.quotesIcon}>
                <use href={spriteQuotes}></use>
            </svg>
            <div className={css.reviewHeaderContainer}>
                <span className={css.reviewSubHeader}>What our customer say</span>
                <span className={css.reviewHeader}>Testimonials</span>
            </div>
            <span className={css.reviewContent}>{item.testimonial}</span>
            <span className={css.reviewer}>{item.owner.name}</span>
        </div>
    );
};

export default Testimonial;
