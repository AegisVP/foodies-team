import css from './TestimonialCard.module.css';
import spriteQuotes from '../../images/icons.svg#quotes';

const TestimonialCard = ({ item }) => {
    return (
        <div className={css.testimonialContainer}>
            <svg className={css.quotesIcon}>
                <use href={spriteQuotes}></use>
            </svg>
            <div className={css.reviewHeaderContainer}>
                <p className={css.reviewSubHeader}>What our customer say</p>
                <h2 className={css.reviewHeader}>Testimonials</h2>
            </div>
            <p className={css.reviewContent}>{item.testimonial}</p>
            <p className={css.reviewer}>{item.owner.name}</p>
        </div>
    );
};

export default TestimonialCard;
