import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/auth';
import { loginSuccess } from '../../redux/authUser/slice';
import { Eye, EyeOff } from 'lucide-react';
import styles from './LoginForm.module.css';
import Button from '../Button';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginForm({ onClose }) {
    const dispatch = useDispatch();
    const [serverError, setServerError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

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
            <div className={styles.inputFieldsWrapper}>
                {serverError && <div className={styles.serverError}>{serverError}</div>}
                <div>
                    <input type="email" {...register('email')} placeholder="Email*" className={styles.inputField} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.inputWithIcon}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            placeholder="Password*"
                            className={styles.inputField}
                        />
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
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting} label="Sign In" />
        </form>
    );
}
