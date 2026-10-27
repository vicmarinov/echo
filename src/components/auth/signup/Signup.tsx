import { Link, useNavigate } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import signupSchema from './Signup.schema.ts';
import authService from '../../../services/auth-service.ts';
import formStyles from '../../../styles/form.module.css';
import styles from './../Auth.module.css';
import useCurrentProfile from '../../../contexts/current-profile/use-current-profile.ts';

export default function Signup () {
    const navigate = useNavigate();

    const { refreshProfile } = useCurrentProfile();
    
    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors,
        data
    } = useControlledForm(signupSchema, async (data) => {
        try {
            await authService.signUp(data);
            await refreshProfile();
            navigate('/');
        } catch (error) {
            alert('Sign up failed. Please check your input and try again.');
            console.error('Sign up error:', error);
        }
    });
    
    return (
        <main className={styles.auth}>
            <form className={formStyles.form} {...formProps}>
                <h1 className={formStyles.heading}>Sign Up</h1>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="name">Name</label>
                    <input className={formStyles.input} id="name" {...fieldsProps.name} />
                    {errors.name && <p className={formStyles['error-message']}>{errors.name.join(' ')}</p>}
                </div>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="username">Username</label>
                    <input className={formStyles.input} id="username" {...fieldsProps.username} />
                    {errors.username && <p className={formStyles['error-message']}>{errors.username.join(' ')}</p>}
                </div>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="email">Email</label>
                    <input className={formStyles.input} id="email" {...fieldsProps.email} />
                    {errors.email && <p className={formStyles['error-message']}>{errors.email.join(' ')}</p>}
                </div>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="password">Password</label>
                    <input className={formStyles.input} id="password" {...fieldsProps.password} />
                    {errors.password && <p className={formStyles['error-message']}>{errors.password.join(' ')}</p>}
                </div>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="repeatPassword">Repeat password</label>
                    <input className={formStyles.input} id="repeatPassword" {...fieldsProps.repeatPassword} />
                    {(errors.repeatPassword || data.password !== data.repeatPassword) && (
                        <p className={formStyles['error-message']}>
                            {[
                                (data.password !== data.repeatPassword ? 'Passwords do not match.' : ''),
                                ...(errors.repeatPassword ?? [])
                            ].join(' ').trim()}
                        </p>
                    )}
                </div>

                <div className={formStyles.field}>
                    <div className={formStyles.field}>
                        <input className={formStyles.input} id="isMinAge" {...fieldsProps.isMinAge} />
                        <label className={formStyles.label} htmlFor="isMinAge">I am at least 13 years old.</label>
                        {errors.isMinAge && <p className={formStyles['error-message']}>{errors.isMinAge.join(' ')}</p>}
                    </div>
                    
                    <div className={formStyles.field}>
                        <input className={formStyles.input} id="agreeTerms" {...fieldsProps.agreeTerms} />
                        <label className={formStyles.label} htmlFor="agreeTerms">I agree to the <Link to="/about">Terms and Conditions</Link>.</label>
                        {errors.agreeTerms && <p className={formStyles['error-message']}>{errors.agreeTerms.join(' ')}</p>}
                    </div>
                </div>

                <div className={formStyles.controls}>
                    <button className={formStyles.submit} {...submitButtonProps}>
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <Link to="/auth/login">Already have an account?</Link>
                </div>
            </form>
        </main>
    );
}