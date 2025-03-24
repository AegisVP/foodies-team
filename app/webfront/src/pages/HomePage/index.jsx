import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useShowError } from 'src/hooks/useShowError.js';
import {
    selectCategories,
    selectTestimonials,
    selectCommonError,
    selectIsCommonLoading,
} from 'src/redux/common/selectors';
import { getCategories, getTestimonials } from 'src/redux/common/operations';
import Slider from 'src/components/Slider';
import Dropdown from 'src/components/Dropdown';
import { useState } from 'react';

const HomePage = () => {
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);
    const testimonials = useSelector(selectTestimonials);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getTestimonials());
    }, [dispatch]);

    useShowError(error);

    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <div>
            <p>Home page</p>

            {isCommonLoading && <p>Loading getCategories...</p>}
            {!isCommonLoading && !!categories?.length && (
                <Dropdown items={categories} label="Select a category" callback={setSelectedCategory} />
            )}
            {isCommonLoading && <p>Loading getTestimonials...</p>}
            {!isCommonLoading && !!testimonials?.length && <Slider items={testimonials} type="testimonial" />}
        </div>
    );
};

export default HomePage;
