import React from "react";

type Props = {
  name: string;
  labelName: string;
  checked: boolean;
  value: string;
  handleAction: () => void;
};

const SearchCheckbox = ({
  name,
  labelName,
  checked,
  handleAction,
  value,
}: Props) => {
  const checkBoxLabelStyle = `flex items-center justify-center border w-28 
  rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600  `;

  return (
    <div>
      <input
        type="checkbox"
        id={`check${name}`}
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        className="hidden"
      />
      <label
        htmlFor={`check${labelName}`}
        className={`${checkBoxLabelStyle} ${
          checked ? "bg-blue-100 text-blue-600 border-blue-600" : ""
        }`}
        onClick={handleAction}>
        {labelName}
      </label>
    </div>
  );
};

export default SearchCheckbox;
