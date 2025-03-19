import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMessage, getCategories } from 'src/api/index.js';

const HomePage = () => {
    // TODO delete, used for debug and example
    const [message, setMessage] = useState('Loading...');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getMessage();
                setMessage(data.message);
            } catch (e) {
                toast.error(e.message);
            }
        })();
    }, []);

    const handleGetCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div>
            <p>Home page</p>
            <h1>{message}</h1>
            <p>Categories:</p>
            <button onClick={handleGetCategories}>Get categories</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
