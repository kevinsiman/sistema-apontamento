import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  defaultValue: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
}

export const FormInput = ({
  id,
  label,
  defaultValue,
  register,
  error,
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xl font-medium text-white mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
        {...register(id)}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};
