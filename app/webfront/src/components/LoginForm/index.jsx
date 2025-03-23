import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/auth';
import { loginSuccess } from '../../redux/authUser/slice';
import styles from './LoginForm.module.css';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginForm({ onClose }) {
    const dispatch = useDispatch();
    const [serverError, setServerError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ email, password }) => {

        setServerError(null);
        try {
            const res = await loginUser({ email, password });
            if (res.token) {
                dispatch(loginSuccess({ token: res.token, user: res.user }));
                reset();
                onClose(); // Close modal after login
            } else {
                setServerError('Login failed. No token received.');
            }
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || 'Login failed. Please try again.';
            setServerError(msg);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign In</h2>

            <label>
                Email
                <input type="email" {...register('email')} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </label>

            <label>
                Password
                <input type="password" {...register('password')} />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>

            <button type="submit" disabled={isSubmitting}>
                Sign In
            </button>

            {serverError && <div className={styles.serverError}>{serverError}</div>}
        </form>
    );
}
