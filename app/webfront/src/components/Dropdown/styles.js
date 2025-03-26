const zeroMarginPadding = {
    padding: '0',
    margin: '0',
};

const valueColorScheme = {
    backgroundColor: 'var(--white)',
    color: 'var(--extra-black)',
};

const displayNone = {
    display: 'none',
};

const mobileFont = {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.42857',
    letterSpacing: '-0.02em',
};

const tabletFont = {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.5',
    letterSpacing: '-0.02em',
};

const menuStandardSettings = {
    width: '100%',
    padding: '16px 18px',
    border: `1px solid var(--gray)`,
    borderRadius: '15px',
    backgroundColor: 'var(--white)',
    boxShadow: 'none',
    zIndex: 9999,
};

const optionStandardSettings = {
    color: 'var(--extra-black)',
    padding: '0',
    backgroundColor: 'var(--white)',
    marginBottom: '6px',
};

const multiValueRemoveStandardSettings = {
    color: 'var(--extra-black)',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'var(--white)',
        color: 'var(--extra-black)',
    },
};

const dropdownIndicatorStandardSettings = {
    transition: 'var(--transition)',
    color: 'var(--extra-black)',
    padding: '0',
    '&:hover': {
        color: 'var(--extra-black)',
    },
};

const controlStandardSettings = {
    border: `1px solid var(--gray)`,
    borderRadius: '30px',
    color: 'var(--extra-black)',
    boxShadow: 'none',
    backgroundColor: 'var(--white)',
    cursor: 'pointer',
    '&:hover': {
        borderColor: 'var(--gray)',
    },
};

export const stylesMobile = () => {
    return {
        control: provided => ({
            ...provided,
            width: '100%',
            padding: '14px',
            ...mobileFont,
            ...controlStandardSettings,
        }),
        valueContainer: provided => ({ ...provided, ...zeroMarginPadding }),
        input: provided => ({ ...provided, ...zeroMarginPadding }),
        singleValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValueLabel: provided => ({
            ...provided,
            ...mobileFont,
            ...valueColorScheme,
            ...zeroMarginPadding,
        }),
        multiValueRemove: provided => ({
            ...provided,
            ...multiValueRemoveStandardSettings,
        }),
        placeholder: provided => ({
            ...provided,
            ...mobileFont,
            color: 'var(--gray)',
        }),
        indicatorSeparator: provided => ({ ...provided, ...displayNone }),
        clearIndicator: provided => ({ ...provided, ...displayNone }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            ...dropdownIndicatorStandardSettings,
        }),
        menu: provided => ({
            ...provided,
            ...menuStandardSettings,
        }),
        option: provided => ({
            ...provided,
            ...mobileFont,
            ...optionStandardSettings,
        }),
    };
};

export const stylesTablet = ({ isForSearch = false, screenWidth }) => {
    return {
        control: provided => ({
            ...provided,
            width: isForSearch ? `${(screenWidth - 32 * 2 - 14) / 2}px` : '315px',
            padding: '16px 18px',
            ...tabletFont,
            ...controlStandardSettings,
        }),
        valueContainer: provided => ({ ...provided, ...zeroMarginPadding }),
        input: provided => ({ ...provided, ...zeroMarginPadding }),
        singleValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValueLabel: provided => ({
            ...provided,
            ...tabletFont,
            ...valueColorScheme,
            ...zeroMarginPadding,
        }),
        multiValueRemove: provided => ({
            ...provided,
            ...multiValueRemoveStandardSettings,
        }),
        placeholder: provided => ({
            ...provided,
            ...tabletFont,
            color: 'var(--gray)',
        }),
        indicatorSeparator: provided => ({ ...provided, ...displayNone }),
        clearIndicator: provided => ({ ...provided, ...displayNone }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            ...dropdownIndicatorStandardSettings,
        }),
        menu: provided => ({
            ...provided,
            ...menuStandardSettings,
        }),
        option: provided => ({
            ...provided,
            ...tabletFont,
            ...optionStandardSettings,
        }),
    };
};

export const stylesPC = ({ isForSearch = false }) => {
    return {
        control: provided => ({
            ...provided,
            width: isForSearch ? '100%' : '315px',
            padding: '16px 18px',
            ...tabletFont,
            ...controlStandardSettings,
        }),
        valueContainer: provided => ({ ...provided, ...zeroMarginPadding }),
        input: provided => ({ ...provided, ...zeroMarginPadding }),
        singleValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValue: provided => ({ ...provided, ...zeroMarginPadding, ...valueColorScheme }),
        multiValueLabel: provided => ({
            ...provided,
            ...tabletFont,
            ...valueColorScheme,
            ...zeroMarginPadding,
        }),
        multiValueRemove: provided => ({
            ...provided,
            ...multiValueRemoveStandardSettings,
        }),
        placeholder: provided => ({
            ...provided,
            ...tabletFont,
            color: 'var(--gray)',
        }),
        indicatorSeparator: provided => ({ ...provided, ...displayNone }),
        clearIndicator: provided => ({ ...provided, ...displayNone }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            ...dropdownIndicatorStandardSettings,
        }),
        menu: provided => ({
            ...provided,
            ...menuStandardSettings,
        }),
        option: provided => ({
            ...provided,
            ...tabletFont,
            ...optionStandardSettings,
        }),
    };
};
