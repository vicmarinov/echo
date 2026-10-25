import { Link, useNavigate } from 'react-router';
import useControlledForm from '../../../hooks/use-controlled-form.ts';
import loginSchema from './Login.schema.ts';
import authService from '../../../services/auth-service.ts';
import formStyles from '../../../styles/form.module.css';
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
            <form className={formStyles.form} {...formProps}>
                <h1 className={formStyles.heading}>Log In</h1>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="email">Email</label>
                    <input className={formStyles.input} id='email' {...fieldsProps.email} />
                    {errors.email && <p className={formStyles['error-message']}>{errors.email.join(' ')}</p>}
                </div>

                <div className={formStyles.field}>
                    <label className={formStyles.label} htmlFor="password">Password</label>
                    <input className={formStyles.input} id='password' {...fieldsProps.password} />
                    {errors.password && <p className={formStyles['error-message']}>{errors.password.join(' ')}</p>}
                </div>

                <div className={formStyles.controls}>
                    <button className={formStyles.submit} {...submitButtonProps}>
                        {isSubmitting ? 'Logging In...' : 'Log In'}
                    </button>

                    <Link to='/auth/signup'>Don't have an account?</Link>
                </div>
            </form>
        </main>
    );
}