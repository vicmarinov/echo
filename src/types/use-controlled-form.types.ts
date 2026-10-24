import { type ChangeEvent, type FocusEvent } from 'react';

export namespace UseControlledFormTypes {
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
        'number': number | '';
    };
    
    export type FieldValidator<T extends FieldType> = (fieldData: FieldValueType[T]) => string[];
    
    type FieldSchema<T extends FieldType> = {
        initialValue: FieldValueType[T];
        type: T;
        validator?: FieldValidator<T>;
    };

    export type AnyFieldSchema = {
        [K in FieldType]: FieldSchema<K>
    }[FieldType];
    
    type FieldErrors = string[];
    
    type FieldProps<T extends FieldType> = {
        name: string;
        onChange: (event: ChangeEvent<InputElement>) => void;
        onBlur: (event: FocusEvent<InputElement>) => void;
    } & (
        T extends 'textarea' | 'select' ? {} : { type: T }
    ) & (
        T extends 'checkbox' ? { checked: boolean } :
        T extends 'radio' ? { value: FieldValueType[T], checked: boolean } :
        { value: FieldValueType[T] }
    );
    
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
}

export type FormSchema = Record<string, UseControlledFormTypes.AnyFieldSchema>;