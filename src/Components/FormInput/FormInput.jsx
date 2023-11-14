import React from "react";
//============================================ custom input
const FormInput = ({
  type,
  label,
  placeholder,
  value,
  name,
  handleInputChange,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* ==========================================label  */}
      <label
        className="text-gray-900 font-['Lato'] self-start font-[800] text-[12px] tracking-[.6px]"
        htmlFor=""
      >
        {label}
      </label>
      {/*========================================= input field  */}
      <input
        className="border focus:outline-darkBlue transition-all duration-500 ease-in-out mt-[10px] w-full h-[36px] rounded-[5px] pl-[20px] font-['Lato'] placeholder:font-['work_sans'] placeholder:text-[10px]"
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
//=================================================FormInput
export default FormInput;
