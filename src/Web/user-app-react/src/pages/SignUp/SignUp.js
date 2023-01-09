import { faEye, faEyeSlash, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import ReviewList from '~/components/ReviewList';
import styles from './SignUp.module.scss';
import CoursesSearch from '~/components/CoursesSearch';

const cx = classNames.bind(styles);

function SignUp() {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState[''];

    const [page, setPage] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userName: '',
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
    });

    const [isShow, setIsShow] = useState(false);
    const passwordValue = useRef({});
    const emailValue = useRef({});

    // const usernameValue = watch('username');
    emailValue.current = watch('email');
    passwordValue.current = watch('password', '');
    // const retypePassword = watch('retypePassword');

    const handleShowPassword = (event) => {
        event.preventDefault();

        setIsShow(!isShow);
    };

    const handleClickNextPage = () => {
        setPage(page + 1);

        console.log(page);
    };

    const handleClickPreviousPage = () => {
        setPage(page - 1);

        console.log(page);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-sidebar')}>
                <h1>TEAM</h1>
                <p className={cx('sidebarTitle')}>
                    Start your <br /> journey with us.
                </p>
                <p className={cx('sidebarBody')}>
                    Discover the knowledge <br /> of Computer Science
                    <br /> via courses.
                </p>
                <ReviewList />
            </div>

            <div className={cx('register')}>
                <div className={cx('regisInfoTitle')}>
                    <div className={cx('regisDiv')}>
                        <div>
                            <h1 className={cx('registerTitle')}>Sign up</h1>
                        </div>
                        <div></div>
                    </div>
                    <div className={cx('regisDiv')}>
                        <div className={cx('member-yet')}>
                            <p>
                                <strong>Have an account? </strong>
                            </p>
                            <p className={cx('sign-in')}>
                                <Link to="/sign-in">Login</Link>
                            </p>
                        </div>
                        <div></div>
                    </div>
                    <p className={cx('forgot')}>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </p>
                </div>

                {page === 0 ? (
                    <form className={cx('registerForm')}>
                        <div>
                            <label>Username</label>
                            <span className={cx('form-message')}>{errors.userName?.message}</span>
                            <input
                                className={cx('registerInput')}
                                {...register('userName', {
                                    required: 'This input is required',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/,
                                        message:
                                            'Must have 6 to 18 letters, 1 uppercase, 1 lowercase, 1 number and no space',
                                    },
                                })}
                                style={{ border: errors.userName?.message ? '1px solid red' : '' }}
                                placeholder="Enter your username..."
                            />
                        </div>

                        <div>
                            <label>Full name</label>
                            <span className={cx('form-message')}>{errors.fullName?.message}</span>
                            <input
                                className={cx('registerInput')}
                                {...register('fullName', {
                                    required: 'This input is required',
                                })}
                                style={{ border: errors.fullName?.message ? '1px solid red' : '' }}
                                placeholder="Enter your full name..."
                            />
                        </div>

                        <div>
                            <label>Email</label>
                            <span className={cx('form-message')}>{errors.email?.message}</span>
                            <input
                                type="email"
                                className={cx('registerInput')}
                                {...register('email', { required: 'This input is required.' })}
                                style={{ border: errors.email?.message ? '1px solid red' : '' }}
                                placeholder="Enter your email..."
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <span className={cx('form-message')}>{errors.password?.message}</span>
                            <div
                                className={cx('passwordInput')}
                                style={{ border: errors.password?.message ? '1px solid red' : '' }}
                            >
                                <input
                                    type={isShow ? 'text' : 'password'}
                                    className={cx('passwordEnter')}
                                    {...register('password', {
                                        required: 'This input is required.',
                                        validate: (value) =>
                                            value !== emailValue.current || "Password can't be the same as email!",
                                        pattern: {
                                            // value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?@!$%^&*-./\\';:,]).{8,}$/,
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: `Must be more than 8 character with 1 uppercase, 1 lowercase, 1 number, only 1 special character and no space`,
                                        },
                                    })}
                                    placeholder="Enter your password..."
                                />
                                <button className={cx('showButton')} onClick={(event) => handleShowPassword(event)}>
                                    <FontAwesomeIcon className={cx('eye-icon')} icon={isShow ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label>Retype password</label>
                            {/* {passwordValue === retypePassword ? ( */}
                            {errors.retypePassword && (
                                <span className={cx('form-message')}>{errors.retypePassword.message}</span>
                            )}
                            {/* ) : (
                            <span className={cx()}"form-message">Password doesn't match!</span>
                        )} */}
                            <div
                                className={cx('passwordInput')}
                                style={{ border: errors.retypePassword?.message ? '1px solid red' : '' }}
                            >
                                <input
                                    type={isShow ? 'text' : 'password'}
                                    className={cx('passwordEnter')}
                                    {...register('retypePassword', {
                                        required: 'This input is required.',
                                        validate: (value) =>
                                            value === passwordValue.current || "Password doesn't match!",
                                    })}
                                    placeholder="Retype your password..."
                                />
                                <button className={cx('showButton')} onClick={(event) => handleShowPassword(event)}>
                                    <FontAwesomeIcon className={cx('eye-icon')} icon={isShow ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        <button type="button" className={cx('nextPageButton')} onClick={handleClickNextPage}>
                            Next
                            <FontAwesomeIcon className={cx('rightArrow')} icon={faArrowRight} />
                        </button>
                    </form>
                ) : (
                    <div className="signUpSecondPage">
                        <CoursesSearch />
                        <div className={cx('buttonsDiv')}>
                            <button className={cx('previousPageButton')} onClick={handleClickPreviousPage}>
                                <FontAwesomeIcon className={cx('leftArrow')} icon={faArrowLeft} />
                                Previous
                            </button>
                            <button className={cx('registerLoginButton')} onClick={handleSubmit(onSubmit)}>
                                Register now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignUp;
