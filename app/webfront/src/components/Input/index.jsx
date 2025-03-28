import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { get, useFormContext, Controller } from 'react-hook-form';
import clsx from 'clsx';
import css from './Input.module.css';

const MAX_INPUT_LENGTH = 200;

const Input = ({
    name,
    placeholder,
    multiline = false,
    withCounter = false,
    maxLength = MAX_INPUT_LENGTH,
    isRequired = true,
}) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
    const isDesktop = useMediaQuery({ minWidth: 1440 });

    const getNumberOfRows = () => {
        if (isMobile) return 5;
        if (isTablet) return 3;
        if (isDesktop) return 2;
    };

    const {
        formState: { errors },
        control,
    } = useFormContext();
    const error = get(errors, name, false);
    const [charactersCount, setCharactersCount] = useState(0);

    const onInputChange = value => {
        setCharactersCount(value.length);
    };

    return (
        <div className={css.wrapper}>
            <div className={clsx(css['inputContainer'], error && css['errorInputContainer'])}>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: isRequired && 'Field is required' }}
                    render={({ field: { onChange, ...field } }) =>
                        multiline ? (
                            <textarea
                                type="text"
                                rows={getNumberOfRows()}
                                className={css.input}
                                {...field}
                                placeholder={placeholder}
                                onChange={e => {
                                    if (e.target.value.length > maxLength) return;
                                    onChange(e);
                                    onInputChange(e.target.value);
                                }}
                            />
                        ) : (
                            <input
                                type="text"
                                className={css.input}
                                {...field}
                                placeholder={placeholder}
                                onChange={e => {
                                    if (e.target.value.length > maxLength) return;
                                    onChange(e);
                                    onInputChange(e.target.value);
                                }}
                            />
                        )
                    }
                />
                {withCounter && <span className={css.counter}>{charactersCount + '/' + maxLength}</span>}
            </div>
            {error?.message && <p className={css.error}>{error.message}</p>}
        </div>
    );
};

export default Input;
