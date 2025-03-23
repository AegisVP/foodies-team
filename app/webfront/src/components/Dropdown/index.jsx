import { styles } from './styles';
import Select from 'react-select';

const Dropdown = ({ items, label, callback, isMulti = false }) => {
    const options = items.map(item => ({
        value: item.id,
        label: item.name,
    }));

    return (
        <Select
            isMulti={isMulti}
            onChange={selected => callback(selected?.value)}
            options={options}
            placeholder={label}
            isSearchable={false}
            styles={styles()}
        />
    );
};

export default Dropdown;
