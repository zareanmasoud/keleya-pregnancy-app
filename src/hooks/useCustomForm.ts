/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { FieldValues, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type WidenSchema<T> = T extends (...args: any[]) => any
  ? T
  : { [K in keyof T]: T[K] extends Record<string, unknown> ? WidenSchema<T[K]> : any };

export type UseCustomFormSchema<TFieldValues> = Yup.ObjectSchema<
  // @ts-ignore
  Yup.Shape<object | undefined, Partial<WidenSchema<TFieldValues>>>,
  object
>;

export type UseCustomFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any> = UseFormReturn<
  TFieldValues,
  TContext
> & {
  updateSchema: (newSchema: UseCustomFormSchema<TFieldValues>) => void;
};

export const useCustomForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props?: Omit<UseFormProps<TFieldValues, TContext>, "resolver"> & {
    schema?: UseCustomFormSchema<TFieldValues>;
  }
): UseCustomFormReturn<TFieldValues> => {
  const [schema, setSchema] = useState<UseCustomFormSchema<TFieldValues> | null>(props?.schema ?? null);

  const updateSchema = useCallback((newSchema: UseCustomFormSchema<TFieldValues>) => {
    setSchema(() => {
      return newSchema;
    });
  }, []);

  const form = useForm({
    ...props,
    // @ts-ignore
    resolver: schema ? yupResolver<UseCustomFormSchema<TFieldValues>>(schema) : undefined,
  });

  return {
    ...form,
    updateSchema,
  };
};
