import { useDispatch, useSelector } from 'react-redux';
import { useShowError } from 'src/hooks/useShowError.js';
import { selectCategories, selectCommonError, selectIsCommonLoading } from 'src/redux/common/selectors';
import { getCategories } from 'src/redux/common/operations';

const HomePage = () => {
    const isCategoriesLoading = useSelector(selectIsCommonLoading);
    const error = useSelector(selectCommonError);
    const categories = useSelector(selectCategories);

    const dispatch = useDispatch();

    const handleGetCategories = async () => {
        dispatch(getCategories());
    };

    useShowError(error);

    return (
        <div>
            <p>Home page</p>

            <p>Categories:</p>
            <button onClick={handleGetCategories}>Get categories</button>

            {isCategoriesLoading && <p>Loading getCategories...</p>}
            {!isCategoriesLoading && !!categories?.length && (
                <ul>
                    {categories?.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
