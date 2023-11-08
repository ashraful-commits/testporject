import React from "react";

const FormInput = ({
  type,
  label,
  placeholder,
  value,
  name,
  handleInputChange,
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label
        className="text-gray-900 font-['Lato'] font-[800] text-[12px] tracking-[.6px]"
        htmlFor=""
      >
        {label}
      </label>
      <input
        className="border focus:outline-darkBlue transition-all duration-500 ease-in-out mt-[10px] w-[235px] h-[36px] rounded-[5px] pl-[20px] font-['Lato']"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        required
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FormInput;
