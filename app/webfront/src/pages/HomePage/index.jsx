import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useShowError } from 'src/hooks/useShowError.js';
import {
    selectSelectedCategory,
    selectCategories,
    selectTestimonials,
    selectCommonError,
    selectIsCommonLoading,
} from 'src/redux/common/selectors';
import { getCategories, getTestimonials } from 'src/redux/common/operations';
import Testimonials from 'src/components/Testimonials';
import Categories from 'src/components/Categories';
import Recipes from 'src/components/Recipes';
import Hero from 'src/components/Hero';
import css from './HomePage.module.css';

const HomePage = () => {
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);
    const testimonials = useSelector(selectTestimonials);
    const selectedCategory = useSelector(selectSelectedCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isCommonLoading) {
            if (!categories?.length) {
                dispatch(getCategories());
            }
            if (!testimonials?.length) {
                dispatch(getTestimonials());
            }
        }
    }, [dispatch, categories, testimonials, isCommonLoading]);

    useShowError(error);

    return (
        <div>
            <Hero className={css.hero} />
            {!isCommonLoading && selectedCategory && <Recipes />}
            {!isCommonLoading && !!categories?.length && !selectedCategory && <Categories items={categories} />}
            {!isCommonLoading && !!testimonials?.length && <Testimonials items={testimonials} type="testimonial" />}
        </div>
    );
};

export default HomePage;
