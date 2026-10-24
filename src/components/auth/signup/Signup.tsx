import { Link, useNavigate } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import signupSchema from './Signup.schema.ts';
import authService from '../../../services/auth-service.ts';
import styles from './../auth.module.css';

export default function Signup () {
    const navigate = useNavigate();
    
    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors,
        data
    } = useControlledForm(signupSchema, async (data) => {
        await authService.signUp(data);
        navigate('/');
    });
    
    return (
        <main className={styles.auth}>
            <form className={styles.form} {...formProps}>
                <h1 className={styles.heading}>Sign Up</h1>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} id="name" {...fieldsProps.name} />
                    {errors.name && <p className={styles['error-message']}>{errors.name.join(' ')}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <input className={styles.input} id="username" {...fieldsProps.username} />
                    {errors.username && <p className={styles['error-message']}>{errors.username.join(' ')}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} id="email" {...fieldsProps.email} />
                    {errors.email && <p className={styles['error-message']}>{errors.email.join(' ')}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input className={styles.input} id="password" {...fieldsProps.password} />
                    {errors.password && <p className={styles['error-message']}>{errors.password.join(' ')}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="repeatPassword">Repeat password</label>
                    <input className={styles.input} id="repeatPassword" {...fieldsProps.repeatPassword} />
                    {(errors.repeatPassword || data.password !== data.repeatPassword) && (
                        <p className={styles['error-message']}>
                            {[
                                (data.password !== data.repeatPassword ? 'Passwords do not match.' : ''),
                                ...(errors.repeatPassword ?? [])
                            ].join(' ').trim()}
                        </p>
                    )}
                </div>

                <div className={styles.field}>
                    <div className={styles.field}>
                        <input className={styles.input} id="isMinAge" {...fieldsProps.isMinAge} />
                        <label className={styles.label} htmlFor="isMinAge">I am at least 13 years old.</label>
                        {errors.isMinAge && <p className={styles['error-message']}>{errors.isMinAge.join(' ')}</p>}
                    </div>
                    
                    {/* TODO: Add link to the Terms and Conditions page */}
                    <div className={styles.field}>
                        <input className={styles.input} id="agreeTerms" {...fieldsProps.agreeTerms} />
                        <label className={styles.label} htmlFor="agreeTerms">I agree to the <Link to="/about">Terms and Conditions</Link>.</label>
                        {errors.agreeTerms && <p className={styles['error-message']}>{errors.agreeTerms.join(' ')}</p>}
                    </div>
                </div>

                <div className={styles.controls}>
                    <button className={styles.submit} {...submitButtonProps}>
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <Link to="/auth/login">Already have an account?</Link>
                </div>
            </form>
        </main>
    );
}