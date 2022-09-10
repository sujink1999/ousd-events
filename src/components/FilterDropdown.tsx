import Select from "react-select";
import Colors from "../utils/colors";

const FilterDropdown = ({
    options,
    onSelection,
    placeholder,
}: {
    options: string[];
    onSelection: (val: string | undefined) => void;
    placeholder: string;
}) => {
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            color: Colors.white,
            backgroundColor: state.isSelected
                ? Colors.primary
                : Colors.secondary,
            padding: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderColor: Colors.black,
        }),
        container: (provided: any) => ({
            ...provided,
            width: 200,
            backgroundColor: Colors.secondary,
            borderRadius: 16,
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            width: 200,
            backgroundColor: Colors.secondary,
            borderRadius: 20,
            overflow: "hidden",
        }),
        noOptionsMessage: (provided: any, state: any) => ({
            ...provided,
            color: Colors.white,
            backgroundColor: Colors.secondary,
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            color: Colors.white,
            border: "0",
            boxShadow: "none",
            backgroundColor: Colors.secondary,
            padding: "8px 16px",
            borderRadius: 16,
            overflow: "hidden",
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: Colors.white,
        }),
        input: (provided: any, state: any) => ({
            ...provided,
            color: Colors.white,
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    return (
        <Select
            onChange={(option) => onSelection(option?.value)}
            placeholder={placeholder}
            styles={customStyles}
            options={options.map((option) => ({
                value: option,
                label: option,
            }))}
            isClearable={true}
        />
    );
};

export default FilterDropdown;
