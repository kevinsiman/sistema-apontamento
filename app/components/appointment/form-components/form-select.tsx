import React from "react";

import { FieldError, UseFormRegister } from "react-hook-form";

interface FormSelectProps {
  register: UseFormRegister<any>;
  label: string;
  id: string;
  error: FieldError | undefined;
  options: string[];
}

export const FormSelect = ({
  register,
  label,
  id,
  error,
  options,
}: FormSelectProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-xl font-medium text-white mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        required
        aria-placeholder="Selecione um operador"
        {...register(id)}
      >
        <option key="vazio" value="">
          Selecione um operador
        </option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      {error && <span>{error.message}</span>}
    </div>
  );
};
