import { useState, type ChangeEvent, type FocusEvent, type SubmitEvent } from 'react';
import type { UseControlledFormTypes as Types } from '../types/use-controlled-form.types.ts';

export default function useControlledForm<T extends Record<string, Types.FieldType>> (
    schema: Types.FormSchema<T>,
    submitData: (data: Types.FormData<T>) => void | Promise<void>
) {
    const [data, setData] = useState<Types.FormData<T>>(() => {
        return Object.fromEntries(
            Object.entries(schema)
                .map(([name, { initialValue }]) => [name, initialValue])
        ) as Types.FormData<T>
    });

    const [dirtyFields, setDirtyFields] = useState<Record<keyof T, boolean>>(() => {
        return Object.fromEntries(
            Object.keys(schema).map(name => [name, false])
        ) as Record<keyof T, boolean>
    });

    const [errors, setErrors] = useState<Types.FormErrors<T>>({});

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const changeHandler = (event: ChangeEvent<Types.InputElement>) => {
        const field = event.target;

        const name = field.name as keyof T;
        const type = field.type;

        const value = field instanceof HTMLInputElement && type === 'checkbox'
            ? field.checked
            : type === 'number'
            ? (field.value === '' ? '' : Number(field.value))
            : field.value;
        
        setData(data => ({
            ...data,
            [name]: value
        } as Types.FormData<T>));
    }

    const blurHandler = (event: FocusEvent<Types.InputElement>) => {
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
    ) as {[K in keyof T]: Types.GetFieldPropsReturn<T[K]>};

    const formProps = { onSubmit: submitHandler };

    const submitButtonProps = {
        type: 'submit' as const,
        disabled: isSubmitting
    };

    function getFieldProps<K extends keyof T> (
        name: K,
        type: T[K]
    ): Types.GetFieldPropsReturn<T[K]> {
        const baseProps = {
            name: name as string,
            onChange: changeHandler,
            onBlur: blurHandler
        };

        if (type === 'radio') {
            return function (radioValue: Types.FieldValueType['radio']) {
                return {
                    ...baseProps,
                    type: 'radio' as const,
                    value: radioValue as Types.FieldValueType[T[K]],
                    checked: data[name] === radioValue
                };
            } as unknown as Types.GetFieldPropsReturn<T[K]>
        }

        if (type === 'checkbox') {
            return {
                ...baseProps,
                type: 'checkbox' as const,
                checked: data[name] as boolean,
            } as unknown as Types.GetFieldPropsReturn<T[K]>;
        }

        if (type === 'textarea' || type === 'select') {
            return {
                ...baseProps,
                value: data[name],
            } as unknown as Types.GetFieldPropsReturn<T[K]>;
        }

        return {
            ...baseProps,
            type,
            value: data[name],
        } as unknown as Types.GetFieldPropsReturn<T[K]>;
    }

    function validate (validateAllFields: boolean = false, forceDirtyField?: keyof T): Types.FormErrors<T> {
        const validators = (Object.keys(schema) as Array<keyof T>).reduce((acc, name) => {
            if (schema[name].validator) {
                acc[name] = schema[name].validator;
            }

            return acc;
        }, {} as {[K in keyof T]?: Types.FieldValidator<T[K]>});

        const errors: Types.FormErrors<T> = {};

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
        errors,
        
        get data () {
            return data as Readonly<typeof data>;
        }
    };
}