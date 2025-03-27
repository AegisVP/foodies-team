import css from './CategoryCard.module.css';
import spriteArrow from 'src/images/icons.svg#arrow';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from 'src/redux/common/slice';
import { fetchRecipes } from 'src/redux/recipes/operations';
import { selectSelectedArea, selectSelectedIngredients } from 'src/redux/common/selectors';
import { setPage } from 'src/redux/recipes/slice';
import { Cloudinary } from '@cloudinary/url-gen';
import { dpr } from '@cloudinary/url-gen/actions/delivery';

const CategoryCard = ({ item }) => {
    const selectedArea = useSelector(selectSelectedArea);
    const selectedIngredients = useSelector(selectSelectedIngredients);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedCategory(item));
        dispatch(setPage(1));
        dispatch(
            fetchRecipes({
                page: 1,
                category: item.id,
                area: selectedArea?.value,
                ingredients: selectedIngredients.map(ing => ing.value),
            })
        );
    };

    const cloud = new Cloudinary({
        cloud: {
            cloudName: 'dsgrbahi8',
        },
    });

    const getImageUrlResized = (publicId, { pixelRatio = 1 }) =>
        cloud.image(publicId).delivery(dpr(pixelRatio)).toURL();

    return (
        <div className={css.imageContainer} aria-label={item.name}>
            <img
                src={getImageUrlResized(item.image, { isRetina: 1 })}
                srcSet={`${getImageUrlResized(item.image, { isRetina: 1 })} 1x, ${getImageUrlResized(item.image, {
                    isRetina: 2,
                })} 2x`}
                alt={item.name}
                className={css.image}
            />
            <div className={css.buttonsContainer}>
                <p className={css.label}>{item.name}</p>
                <button aria-label={item.name} className={css.forwardButton} onClick={handleClick}>
                    <svg>
                        <use href={spriteArrow} className={css.arrow}></use>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;
