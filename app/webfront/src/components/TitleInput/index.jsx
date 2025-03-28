import { get, useFormContext, Controller } from 'react-hook-form';
import css from './TitleInput.module.css';

const TitleInput = ({ name, placeholder }) => {
    const {
        formState: { errors },
        control,
    } = useFormContext();
    const error = get(errors, name, false);

    return (
        <div className={css.wrapper}>
            <Controller
                name={name}
                control={control}
                rules={{ required: 'Field is required' }}
                render={({ field }) => <input type="text" className={css.input} {...field} placeholder={placeholder} />}
            />
            {error?.message && <p className={css.error}>{error.message}</p>}
        </div>
    );
};

export default TitleInput;
