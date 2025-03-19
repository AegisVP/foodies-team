import { Toaster as ReactHotToaster } from 'react-hot-toast';

const Toaster = () => {
    return (
        <ReactHotToaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                style: {
                    border: '1px solid #713200',
                    borderRadius: '10px',
                    background: '#4b0e07',
                    color: '#fff',
                    padding: '16px',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            }}
        />
    );
};

export default Toaster;
