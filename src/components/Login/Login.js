import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { loginAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

const Login = () => {
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(loginAction({email: data.email, password: data.password}));
        //dispatch(redirectToRoute(AppRoute.Users));
    };

    return (
        <div className="container mt-5">
        <h3 className="text-center mb-4">Login</h3>
        <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        <FormattedMessage id='email' />
                    </label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder={formatMessage({ id: 'placeholder_email' })}
                        {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address',
                        },
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        <FormattedMessage id='password' />
                    </label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder={formatMessage({ id: 'placeholder_password' })}
                        {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password must be at least 3 characters long',
                        },
                        })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <span>
                        <FormattedMessage id='no_account' />{' '}
                        <Link to={AppRoute.Register} className="text-primary fw-bold">
                            <FormattedMessage id='sign_up' />
                        </Link>
                    </span>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
