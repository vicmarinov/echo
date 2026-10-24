import { useState, type ChangeEvent, type FocusEvent, type SubmitEvent } from 'react';

import {
    type InputElement,
    type FieldType,
    type FieldValueType,
    type FieldValidator,
    type FieldProps,
    type GetFieldPropsReturn,
    type FormSchema,
    type FormData,
    type FormErrors
} from '../types/use-controlled-form.types.ts';

export default function useControlledForm<T extends Record<string, FieldType>> (
    schema: FormSchema<T>,
    submitData: (data: FormData<T>) => void | Promise<void>
) {
    const [data, setData] = useState<FormData<T>>(() => {
        return Object.fromEntries(
            Object.entries(schema)
                .map(([name, { initialValue }]) => [name, initialValue])
        ) as FormData<T>
    });

    const [dirtyFields, setDirtyFields] = useState<Record<keyof T, boolean>>(() => {
        return Object.fromEntries(
            Object.keys(schema).map(name => [name, false])
        ) as Record<keyof T, boolean>
    });

    const [errors, setErrors] = useState<FormErrors<T>>({});

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const changeHandler = (event: ChangeEvent<InputElement>) => {
        const field = event.target;

        const name = field.name as keyof T;
        const type = field.type;

        const value = field instanceof HTMLInputElement && type === 'checkbox'
            ? field.checked
            : type === 'number'
            ? Number(field.value)
            : field.value;
        
        setData(data => ({
            ...data,
            [name]: value
        } as FormData<T>));
    }

    const blurHandler = (event: FocusEvent<InputElement>) => {
        const field = event.target;
        const name = field.name as keyof T;

        setDirtyFields(dirtyFields => ({
            ...dirtyFields,
            [name]: true
        }));

        validate(false, name);
    }

    const submitHandler = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const allFieldsDirty = Object.fromEntries(
            Object.keys(schema).map(name => [name, true])
        ) as Record<keyof T, boolean>;
        
        setDirtyFields(allFieldsDirty);

        const hasFoundErrors = !!Object.keys(validate(true)).length;
        if (hasFoundErrors) return;

        setIsSubmitting(true);

        try {
            await submitData(data);
        } finally {
            setIsSubmitting(false);
        }
    }

    const fieldsProps = Object.fromEntries(
        Object.entries(schema).map((schemaEntry) => {
            const [name, { type }] = schemaEntry;
            const props = getFieldProps(name, type);
            return [name, props];
        })
    ) as {[K in keyof T]: GetFieldPropsReturn<T[K]>};

    const formProps = { onSubmit: submitHandler };

    const submitButtonProps = {
        type: 'submit' as const,
        disabled: isSubmitting
    };

    function getFieldProps<K extends keyof T> (
        name: K,
        type: T[K]
    ): GetFieldPropsReturn<T[K]> {
        const fieldProps: FieldProps<T[K]> = {
            name: name as string,
            onChange: changeHandler,
            onBlur: blurHandler
        };

        const typesWithoutTypeProp: FieldType[]  = ['textarea', 'select'];
        if (!typesWithoutTypeProp.includes(type)) {
            fieldProps.type = type;
        }

        if (type === 'checkbox') {
            fieldProps.checked = data[name] as boolean;
        } else if (type === 'radio') {
            return function (radioValue: FieldValueType['radio']) {
                return {
                    ...fieldProps,
                    value: radioValue as FieldValueType[T[K]],
                    checked: data[name] === radioValue
                };
            } as GetFieldPropsReturn<T[K]>
        } else {
            fieldProps.value = data[name];
        }

        return fieldProps as GetFieldPropsReturn<T[K]>;
    }

    function validate (validateAllFields: boolean = false, forceDirtyField?: keyof T): FormErrors<T> {
        const validators = (Object.keys(schema) as Array<keyof T>).reduce((acc, name) => {
            if (schema[name].validator) {
                acc[name] = schema[name].validator;
            }

            return acc;
        }, {} as {[K in keyof T]?: FieldValidator<T[K]>});

        const errors: FormErrors<T> = {};

        for (const name of Object.keys(validators) as Array<keyof T>) {
            const validator = validators[name]!;

            const isFieldDirty = dirtyFields[name] || forceDirtyField === name;
            if (!validateAllFields && !isFieldDirty) continue;

            const fieldData = data[name];
            const fieldErrors = validator(fieldData);
            if (!fieldErrors.length) continue;

            errors[name] = fieldErrors;
        }

        setErrors(errors);
        return errors;
    }

    return {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        // data,
        errors
    };
}