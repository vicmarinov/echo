import useControlledForm from '../../hooks/use-controlled-form.ts';
import type { FormSchema } from '../../types/use-controlled-form.types.ts';

// import './temp.css';

const schema = {
    name: {
        type: 'text',
        initialValue: '',
        validator (name) {
            const errors: string[] = [];
            if (!name) errors.push('Name is required.');
            if (name.length < 3) errors.push('Name must be at least 3 characters long.');
            return errors;
        }
    },
    surname: {
        type: 'text',
        initialValue: '',
        validator (surname) {
            const errors: string[] = [];
            if (!surname) errors.push('Surname is required.');
            if (surname.length < 3) errors.push('Surname must be at least 3 characters long.');
            return errors;
        }
    },
    username: { type: 'text', initialValue: '' },
    bio: { type: 'textarea', initialValue: '' },
    email: { type: 'email', initialValue: '' },
    password: { type: 'password', initialValue: '' },
    repeatPassword: { type: 'password', initialValue: '' },
    isMinAge: { type: 'checkbox', initialValue: false },
    agreeTerms: { type: 'checkbox', initialValue: false },
    region: { type: 'select', initialValue: '' },
    gender: { type: 'radio', initialValue: '' },
    age: { type: 'number', initialValue: 0 },
} satisfies FormSchema;

export default function Signup () {
    const { 
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors
    } = useControlledForm(
        schema,
        // {
        //     name: { type: 'text', initialValue: '' },
        //     surname: { type: 'text', initialValue: '' },
        //     username: { type: 'text', initialValue: '' },
        //     bio: { type: 'textarea', initialValue: '' },
        //     email: { type: 'email', initialValue: '' },
        //     password: { type: 'password', initialValue: '' },
        //     repeatPassword: { type: 'password', initialValue: '' },
        //     isMinAge: { type: 'checkbox', initialValue: false },
        //     agreeTerms: { type: 'checkbox', initialValue: false },
        //     region: { type: 'select', initialValue: '' },
        //     gender: { type: 'radio', initialValue: '' },
        //     age: { type: 'number', initialValue: 0 },
        // },
        async function submitHandler (data) {
            console.log('Submitting...');

            const result = await (new Promise((resolve, reject) => {
                setTimeout(() => resolve(data), 5000);
            }));

            console.log(result);
        }
    );
    return (
        <main>
            <h1>Sign Up</h1>

            <form {...formProps}>
                <label htmlFor="name">Name</label>
                <input id="name" {...fieldsProps.name} />
                {errors.name && <p>{errors.name.join(' ')}</p>}

                <label htmlFor="surname">Surname</label>
                <input id="surname" {...fieldsProps.surname} />
                {errors.surname && <p>{errors.surname.join(' ')}</p>}

                <label htmlFor="username">Username</label>
                <input id="username" {...fieldsProps.username} />

                <label htmlFor="bio">Bio</label>
                <textarea id="bio" {...fieldsProps.bio}></textarea>

                <label htmlFor="email">Email</label>
                <input id="email" {...fieldsProps.email} />

                <label htmlFor="password">Password</label>
                <input id="password" {...fieldsProps.password} />

                <label htmlFor="repeatPassword">Repeat password</label>
                <input id="repeatPassword" {...fieldsProps.repeatPassword} />

                <input id="isMinAge" {...fieldsProps.isMinAge} />
                <label htmlFor="isMinAge">I am at least 13 years old.</label>
                
                {/* TODO: Add link to the Terms and Conditions page */}
                <input id="agreeTerms" {...fieldsProps.agreeTerms} />
                <label htmlFor="agreeTerms">I agree to the <a href="/about">Terms and Conditions</a>.</label>

                {/* TODO: Remove the following inputs, they are just for testing purposes: */}

                <label htmlFor="region">Region</label>
                <select id="region" {...fieldsProps.region}>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="other">Other</option>
                </select>

                <fieldset>
                    <legend>Gender</legend>

                    <input id="genderMale" {...fieldsProps.gender('male')} />
                    <label htmlFor="genderMale">Male</label>

                    <input id="genderFemale" {...fieldsProps.gender('female')} />
                    <label htmlFor="genderFemale">Female</label>

                    <input id="genderOther" {...fieldsProps.gender('other')} />
                    <label htmlFor="genderOther">Other</label>
                </fieldset>

                <label htmlFor="age">Age</label>
                <input id="age" {...fieldsProps.age} />

                <button {...submitButtonProps}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    {/* {'Sign Up'} */}
                </button>
            </form>
        </main>
    );
}