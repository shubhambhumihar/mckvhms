import React from "react";
import { Input } from "antd";

const GeneraInput = (props) => {
  const { type, label, i_id, i_class, placeholder, name, val, onCh, onBl } =
    props;
  return (
    <div className="mb-0 s flex flex-col w-full">
      <label
        className="text-[1rem] text-purple-400 font-semibold inline-block mt-3"
        htmlFor={label}
      >
        {label}
      </label>
      <Input
        type={type}
        id={i_id}
        className={`${i_class} p-[10px] w-full`}
        placeholder={placeholder}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
    </div>
  );
};

export default GeneraInput;
