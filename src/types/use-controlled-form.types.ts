import { type ChangeEvent, type FocusEvent } from 'react';

export type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type FieldType = 'text' | 'textarea' | 'email' | 'password' | 'checkbox' | 'select' | 'radio' | 'number';

export type FieldValueType = {
    'text': string;
    'textarea': string;
    'email': string;
    'password': string;
    'checkbox': boolean;
    'select': string;
    'radio': string;
    'number': number;
};

export type FieldValidator<T extends FieldType> = (fieldData: FieldValueType[T]) => string[];

export type FieldSchema<T extends FieldType> = {
    initialValue: FieldValueType[T];
    type: T;
    validator?: FieldValidator<T>;
};

export type FieldErrors = string[];

export type FieldProps<T extends FieldType> = {
    name: string;
    type?: T;
    value?: FieldValueType[T];
    checked?: boolean;
    onChange: (event: ChangeEvent<InputElement>) => void;
    onBlur: (event: FocusEvent<InputElement>) => void;
};

export type GetFieldPropsReturn<T extends FieldType> = T extends 'radio'
    ? (radioValue: FieldValueType['radio']) => FieldProps<T>
    : FieldProps<T>;

export type FormSchema<T extends Record<string, FieldType>> = {
    [K in keyof T]: FieldSchema<T[K]>
};

export type FormData<T extends Record<string, FieldType>> = {
    [K in keyof T]: FieldValueType[T[K]]
};

export type FormErrors<T extends Record<string, FieldType>> = Partial<Record<keyof T, FieldErrors>>;