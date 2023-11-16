import React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ y: -15, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center hover:scale-105 transition-all duration-500 ease-in-out"
    >
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
    </motion.div>
  );
};
//=================================================FormInput
export default FormInput;
