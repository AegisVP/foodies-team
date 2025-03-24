export const styles = () => {
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768;

    return {
        control: provided => ({
            ...provided,
            width: isTablet ? '315px' : '100%',
            maxWidth: isTablet ? '315px' : '343px',
            padding: isTablet ? '16px 18px' : '14px',
            border: `1px solid var(--gray)`,
            borderRadius: '30px',
            fontSize: isTablet ? '16px' : '14px',
            fontWeight: 500,
            lineHeight: isTablet ? '1.5' : '1.42857',
            letterSpacing: '-0.02em',
            color: 'var(--extra-black)',
            boxShadow: 'none',
            backgroundColor: 'var(--white)',
            cursor: 'pointer',
            '&:hover': {
                borderColor: 'var(--gray)',
            },
        }),
        valueContainer: provided => ({
            ...provided,
            padding: '0',
            margin: '0',
        }),
        input: provided => ({
            ...provided,
            padding: '0',
            margin: '0',
        }),
        singleValue: provided => ({
            ...provided,
            color: 'var(--extra-black)',
            margin: '0',
            padding: '0',
        }),
        multiValue: base => ({
            ...base,
            backgroundColor: 'var(--white)',
            color: 'var(--extra-black)',
            padding: '0',
            margin: '0',
        }),
        multiValueLabel: base => ({
            ...base,
            fontSize: isTablet ? '16px' : '14px',
            fontWeight: 500,
            lineHeight: isTablet ? '1.5' : '1.42857',
            letterSpacing: '-0.02em',
            color: 'var(--extra-black)',
            padding: '0',
            margin: '0',
        }),
        multiValueRemove: provided => ({
            ...provided,
            color: 'var(--extra-black)',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'var(--white)',
                color: 'var(--extra-black)',
            },
        }),
        placeholder: provided => ({
            ...provided,
            fontSize: isTablet ? '16px' : '14px',
            fontWeight: 500,
            lineHeight: isTablet ? '1.5' : '1.42857',
            letterSpacing: '-0.02em',
            color: 'var(--gray)',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        clearIndicator: provided => ({
            ...provided,
            display: 'none',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transition: 'var(--transition)',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--extra-black)',
            padding: '0',
            '&:hover': {
                color: 'var(--extra-black)',
            },
        }),
        menu: provided => ({
            ...provided,
            width: isTablet ? '315px' : '100%',
            maxWidth: isTablet ? '315px' : '343px',
            padding: '16px 18px',
            border: `1px solid var(--gray)`,
            borderRadius: '15px',
            backgroundColor: 'var(--white)',
            boxShadow: 'none',
            zIndex: 9999,
        }),
        option: provided => ({
            ...provided,
            fontSize: isTablet ? '16px' : '14px',
            fontWeight: 500,
            lineHeight: isTablet ? '1.5' : '1.42857',
            letterSpacing: '-0.02em',
            color: 'var(--extra-black)',
            padding: '0',
            marginBottom: '6px',
            backgroundColor: 'var(--white)',
        }),
    };
};
