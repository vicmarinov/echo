import { Link, useNavigate } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import loginSchema from './Login.schema.ts';
import authService from '../../../services/auth-service.ts';
import styles from './../auth.module.css';

export default function Login () {
    const navigate = useNavigate();

    const {
        formProps,
        fieldsProps,
        submitButtonProps,
        isSubmitting,
        errors
    } = useControlledForm(loginSchema, async (data) => {
        await authService.logIn(data);
        navigate('/');
    });

    return (
        <main className={styles.auth}>
            <form className={styles.form} {...formProps}>
                <h1 className={styles.heading}>Log In</h1>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} id='email' {...fieldsProps.email} />
                    {errors.email && <p className={styles['error-message']}>{errors.email.join(' ')}</p>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input className={styles.input} id='password' {...fieldsProps.password} />
                    {errors.password && <p className={styles['error-message']}>{errors.password.join(' ')}</p>}
                </div>

                <div className={styles.controls}>
                    <button className={styles.submit} {...submitButtonProps}>
                        {isSubmitting ? 'Logging In...' : 'Log In'}
                    </button>

                    <Link to='/auth/signup'>Don't have an account?</Link>
                </div>
            </form>
        </main>
    );
}