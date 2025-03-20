import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const useShowError = (errorMessage) => {
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }
    }, [errorMessage]);
};
