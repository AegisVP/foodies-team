import { useRef } from 'react';
import { get, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import css from './FileInput.module.css';

const FileInput = ({ name, file, onImageChange }) => {
    const {
        formState: { errors },
        register,
        setValue,
        clearErrors,
    } = useFormContext();
    const error = get(errors, name, false);

    const hiddenInputRef = useRef(null);

    const { ref: registerRef, ...rest } = register(name, {
        required: (!file && 'Upload a recipe photo') || false,
    });

    // TODO add supported type and image size
    //   const fileTypes= ["jpeg", "jpg", "png"];
    const onFileUpload = e => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange(file, name);
            setValue(name, file);
            clearErrors(name);
        }
    };

    const onUpload = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.click();
        }
    };

    return (
        <div className={css['imageContainer']}>
            {file ? (
                <>
                    <img className={css.image} src={file} alt="recipe photo preview" />
                    <button onClick={onUpload}>Upload another photo</button>
                </>
            ) : (
                <div className={clsx(css.container, error && css['errorContainer'])}>
                    <button onClick={onUpload}>Upload a photo</button>
                </div>
            )}

            <input
                className={css.hidden}
                type="file"
                {...rest}
                onChange={onFileUpload}
                ref={e => {
                    registerRef(e);
                    hiddenInputRef.current = e;
                }}
            />
            {error?.message && <p className={css.error}>{error.message}</p>}
        </div>
    );
};

export default FileInput;
