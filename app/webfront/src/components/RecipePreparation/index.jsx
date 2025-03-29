import Button from '../Button';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ instructions, isFavorite, onFavoriteToggle }) => {
    return (
        <section className={css.instructionsBlock}>
            <h2 className={css.sectionTitle}>Recipe Preparation</h2>
            <p className={css.instructionsList}>{instructions}</p>
            <Button
                onClick={onFavoriteToggle}
                label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                theme="light"
                fullWidth
                className={css.favoriteButton}
            />
        </section>
    );
};

export default RecipePreparation;
