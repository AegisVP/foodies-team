import { get, useFormContext, Controller } from 'react-hook-form';
import clsx from 'clsx';
import css from './CookingTime.module.css';

const TIME_STEP = 5;
const CookingTime = ({ name = 'time' }) => {
    const {
        formState: { errors },
        control,
        setValue,
        watch,
    } = useFormContext();
    const error = get(errors, name, false);
    const timeValue = watch(name);

    const onMinusClick = () => {
        if (Number.isNaN(timeValue) || timeValue - TIME_STEP < 0) return;
        setValue(name, timeValue - TIME_STEP);
    };
    const onPlusClick = () => {
        if (Number.isNaN(timeValue) || timeValue + TIME_STEP > 999) return;
        setValue(name, timeValue + TIME_STEP);
    };

    return (
        <div className={css.wrapper}>
            <div className={css.buttonsContainer}>
                <button type="button" className={css.button} onClick={onMinusClick}>
                    -
                </button>

                <div className={clsx(css['inputContainer'], error && css['errorInputContainer'])}>
                    <Controller
                        name={name}
                        control={control}
                        rules={{
                            required: 'Enter cooking time',
                            min: { value: 1, message: 'Cooking time cannot be less than 1 minute' },
                            max: { value: 999, message: 'Cooking time cannot be more than 999 minutes' },
                        }}
                        render={({ field: { onChange, ...field } }) => (
                            <input
                                type="text"
                                className={css.input}
                                {...field}
                                onChange={e => {
                                    if (Number.isNaN(Number(e.target.value))) return;
                                    onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                    <span className={css.min}>min</span>
                </div>
                <button type="button" className={css.button} onClick={onPlusClick}>
                    +
                </button>
            </div>
            {error?.message && <p className={css.error}>{error.message}</p>}
        </div>
    );
};

export default CookingTime;
