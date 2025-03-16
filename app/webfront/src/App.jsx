import { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetch('/api/message')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch(() => setMessage('Error fetching data'));
    }, []);

    return <h1>{message}</h1>;
}

export default App;
