
import Select from 'react-select';
import 'react-select/dist/react-select.css';
 
const options = [
    // ...
    { value: 'Stanford University', label: 'Stanford' },
    // ...
];
 
const field = ({ options }) => (
    <Select
        name="university"
        value="one"
        options={options}
        onChange={val => console.log(val)}
    />
);
