import { useDispatch, useSelector } from 'react-redux';
import { useShowError } from 'src/hooks/useShowError.js';
import { selectCategories, selectCommonError, selectIsCommonLoading } from 'src/redux/common/selectors';
import { getCategories } from 'src/redux/common/operations';
import Button from 'src/components/Button';
import spriteFacebook from '../../images/icons.svg#facebook';

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

            <Button label="Test" />

            <Button label="Test" theme="dark" />

            <Button label="Test" href="/test" />

            <Button label="Test" fullWidth />

            <Button label="Test" icon={spriteFacebook} />

            <Button icon={spriteFacebook} to='/' />

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
