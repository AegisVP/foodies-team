import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRecipesLoading } from 'src/redux/recipes/selectors';
import { selectFavoriteRecipesId } from 'src/redux/authUser/selectors';
import { addToFavorites, removeFromFavorites } from 'src/redux/authUser/operations';

import RecipeCard from 'src/components/RecipeCard';
import { Loader } from 'src/components';

import css from './PopularRecipes.module.css';

// Використовуємо моковані дані, оскільки ендпоінт API може не працювати
const mockPopularRecipes = [
    {
        _id: '1',
        title: 'Spicy Arrabiata Penne',
        description: 'A simple pasta dish with spicy sauce made from garlic, tomatoes, and red chili peppers.',
        thumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        owner: {
            name: 'Italian Chef',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    },
    {
        _id: '2',
        title: 'Chicken Enchilada Casserole',
        description: 'Delicious Mexican dish with layers of tortillas, chicken, cheese, and enchilada sauce.',
        thumb: 'https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg',
        owner: {
            name: 'Maria Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
    },
    {
        _id: '3',
        title: 'Teriyaki Chicken Casserole',
        description: 'Japanese inspired dish with chicken, vegetables and a sweet teriyaki sauce.',
        thumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        owner: {
            name: 'Asian Delights',
            avatar: 'https://randomuser.me/api/portraits/men/23.jpg'
        }
    },
    {
        _id: '4',
        title: 'Mediterranean Pasta Salad',
        description: 'Fresh and healthy salad with pasta, vegetables, olives, and feta cheese.',
        thumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
        owner: {
            name: 'Greek Cuisine',
            avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        }
    }
];

const PopularRecipes = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsRecipesLoading);
    const favoritesIds = useSelector(selectFavoriteRecipesId) || [];
    const [loading, setLoading] = useState(false);
    
    const handleToggleFavorite = (recipeId) => {
        const isFavorite = favoritesIds.includes(recipeId);
        
        if (isFavorite) {
            dispatch(removeFromFavorites(recipeId));
        } else {
            dispatch(addToFavorites(recipeId));
        }
    };
    
    // Використовуємо моковані дані для демонстрації
    const displayRecipes = mockPopularRecipes;
    
    if (loading) {
        return <Loader />;
    }
    
    return (
        <div className={css.container}>
            <h2 className={css.title}>POPULAR RECIPES</h2>
            
            <div className={css.grid}>
                {displayRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe._id || recipe.id}
                        mealImage={recipe.thumb}
                        title={recipe.title}
                        description={recipe.description}
                        userAvatar={recipe.owner?.avatar || 'https://via.placeholder.com/40'}
                        userName={recipe.owner?.name || 'Unknown Chef'}
                        recipeId={recipe._id || recipe.id}
                        // Додамо можливість реагувати на натискання кнопки "улюблене"
                        onFavoriteToggle={() => handleToggleFavorite(recipe._id || recipe.id)}
                        isFavorite={favoritesIds.includes(recipe._id || recipe.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularRecipes;
