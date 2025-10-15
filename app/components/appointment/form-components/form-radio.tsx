import { radioValueTypes } from "@/app/libs/mock";
import React, { Fragment } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormRadioProps {
  register: UseFormRegister<any>;
  radioValues: radioValueTypes[];
  nome: string;
  error: FieldError | undefined;
}

export const FormRadio = ({
  register,
  radioValues,
  nome,
  error,
}: FormRadioProps) => {
  if (radioValues.length <= 1) {
    return <span>Os valores de radioValue precisam ser maiores que 1</span>;
  }

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {radioValues.map((radio: radioValueTypes) => (
        <Fragment key={radio.value}>
          <label className="inline-flex items-center text-lg">
            <input
              type="radio"
              value={radio.value}
              className="form-radio text-red-600 h-5 w-5"
              required
              {...register(nome)}
            />
            <span className="ml-2">{radio.label}</span>
          </label>
          {error && <span>{error.message}</span>}
        </Fragment>
      ))}
    </div>
  );
};
