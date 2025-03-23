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

const HomePage = () => {
    const isCommonLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);
    const testimonials = useSelector(selectTestimonials);

    const dispatch = useDispatch();

    const handleGetCategories = async () => {
        dispatch(getCategories());
    };

    useEffect(() => {
        dispatch(getTestimonials());
    }, [dispatch]);

    useShowError(error);

    return (
        <div>
            <p>Home page</p>

            <p>Categories:</p>
            <button onClick={handleGetCategories}>Get categories</button>
            {isCommonLoading && <p>Loading getCategories...</p>}
            {!isCommonLoading && !!categories?.length && (
                <ul>
                    {categories?.map(category => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
            {isCommonLoading && <p>Loading getTestimonials...</p>}
            {!isCommonLoading && !!testimonials?.length && <Slider items={testimonials} type="testimonial" />}
        </div>
    );
};

export default HomePage;
