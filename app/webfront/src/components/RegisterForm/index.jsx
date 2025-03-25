import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authUser/slice';
import { registerUser, loginUser } from '../../api/auth';
import styles from './RegisterForm.module.css';

import { Eye, EyeOff } from 'lucide-react'; // eye icons
import Button from '../Button';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegisterForm({ onClose }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ name, email, password }) => {
        setServerError(null);
        try {
            // Step 1: Register the user
            await registerUser({ name, email, password });

            // Step 2: Login after registration
            const loginResponse = await loginUser({ email, password });

            if (loginResponse.token) {
                dispatch(loginSuccess({ token: loginResponse.token }));
                reset();
                onClose(); // Close the modal
            } else {
                setServerError('Login failed after registration. Please try manually.');
            }
        } catch (err) {
            const errorMsg = err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
            setServerError(errorMsg);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name
                <input type="text" {...register('name')} />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </label>

            <label>
                Email
                <input type="email" {...register('email')} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </label>

            <label>
                Password
                <div className={styles.passwordField}>
                    <input type={showPassword ? 'text' : 'password'} {...register('password')} />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className={styles.eyeButton}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>

            <Button type="submit" disabled={isSubmitting} label="Create" />

            {serverError && <div className={styles.serverError}>{serverError}</div>}
        </form>
    );
}
