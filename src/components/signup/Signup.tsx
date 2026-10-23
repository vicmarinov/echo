import { useState, type ChangeEvent, type SubmitEvent, type FocusEvent } from 'react';

// import zod from 'zod';

import './temp.css';
// import type { ZodSchema } from 'zod/v3';

export default function Signup () {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        bio: '',
        email: '',
        password: '',
        repeatPassword: '',
        isMinAge: false,
        agreeTerms: false,
        region: '',
        gender: '',
        age: 0
    });

    const [formDirtyFields, setFormDirtyFields] = useState({
        name: false,
        surname: false,
        username: false,
        bio: false,
        email: false,
        password: false,
        repeatPassword: false,
        isMinAge: false,
        agreeTerms: false,
        region: false,
        gender: false,
        age: false
    });

    const [formErrors, setFormErrors] = useState<{[name: string]: string[]}>({
        name: [],
        surname: [],
        username: [],
        bio: [],
        email: [],
        password: [],
        repeatPassword: [],
        isMinAge: [],
        agreeTerms: [],
        region: [],
        gender: [],
        age: []
    });

    const [formStatus, setFormStatus] = useState('idle');

    const formChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(formData => ({
            ...formData,
            [event.target.name]:
                event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.type === 'number'
                    ? Number(event.target.value)
                    : event.target.value
        }));
    }

    const formSubmitHandler = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formStatus === 'invalid') {
            return;
        }

        const isValid = formValidator(formData);
        if (!isValid) {
            setFormStatus('invalid');
            setFormDirtyFields({
                name: true, surname: true, username: true, bio: true,
                email: true, password: true, repeatPassword: true,
                isMinAge: true, agreeTerms: true, region: true,
                gender: true, age: true
            });
            return;
        }

        setFormStatus('submitting');

        const requestResult = await (
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        'Simulating calling API with:',
                        JSON.stringify(formData, null, 4)
                    ].join('\n'));
                }, 5000);
            })
        )

        console.log(requestResult);

        setFormStatus('submitted');
    }

    const formBlurHandler = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormDirtyFields(fieldsState => ({
            ...fieldsState,
            [event.target.name]: true
        }));

        const isValid = formValidator(formData);
        if (!isValid) setFormStatus('invalid');
        else setFormStatus('valid');
    }

    const formValidator = (formData: any) => {
        console.log('Simulating form validation');

        const nameErrors: string[] = [];
        const surnameErrors: string[] = [];

        if (formData.name.startsWith('a')) {
            nameErrors.push('Name can`t start with a.');
            nameErrors.push('Name is invalid.');
        }

        if (formData.surname.startsWith('b')) {
            surnameErrors.push('Surname can`t start with b.');
            surnameErrors.push('Surname is invalid.');
        }

        setFormErrors(fe => ({
            ...fe,
            name: nameErrors,
            surname: surnameErrors
        }));
        
        return nameErrors.length === 0 && surnameErrors.length === 0;
    }

    return (
        <main>
            <h1>Sign Up</h1>

            <form onSubmit={formSubmitHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <p>{formDirtyFields.name && formErrors.name.length > 0 && formErrors.name.join(' ')}</p>

                <label htmlFor="surname">Surname</label>
                <input type="text" id="surname" name="surname" value={formData.surname} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <p>{formDirtyFields.surname && formErrors.surname.length > 0 && formErrors.surname.join(' ')}</p>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={formChangeHandler} onBlur={formBlurHandler} />

                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={formChangeHandler} onBlur={formBlurHandler}></textarea>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={formChangeHandler} onBlur={formBlurHandler} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={formChangeHandler} onBlur={formBlurHandler} />

                <label htmlFor="repeatPassword">Repeat password</label>
                <input type="password" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={formChangeHandler} onBlur={formBlurHandler} />

                <input type="checkbox" id="isMinAge" name="isMinAge" checked={formData.isMinAge} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <label htmlFor="isMinAge">I am at least 13 years old.</label>
                
                {/* TODO: Add link to the Terms and Conditions page */}
                <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <label htmlFor="agreeTerms">I agree to the <a href="/about">Terms and Conditions</a>.</label>

                {/* TODO: Remove the following inputs, they are just for testing purposes: */}

                <label htmlFor="region">Region</label>
                <select id="region" name="region" value={formData.region} onChange={formChangeHandler} onBlur={formBlurHandler}>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="other">Other</option>
                </select>

                <label>Gender</label>
                <input type="radio" id="genderM" name="gender" value="male" checked={formData.gender === 'male'} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <label htmlFor="genderM">Male</label>
                <input type="radio" id="genderF" name="gender" value="female" checked={formData.gender === 'female'} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <label htmlFor="genderF">Female</label>
                <input type="radio" id="genderO" name="gender" value="other" checked={formData.gender === 'other'} onChange={formChangeHandler} onBlur={formBlurHandler} />
                <label htmlFor="genderO">Other</label>

                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={formChangeHandler} onBlur={formBlurHandler} />

                <button type="submit" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </main>
    );
}