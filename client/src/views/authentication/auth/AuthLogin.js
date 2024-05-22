import React, { useState,useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginFun,isAuthenticated } from "../../../service/auth/auth";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 
    useEffect(()=>{
        isAuthenticated(navigate)
    },[])
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Tên đăng nhập là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc'),
    });

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            await dispatch(loginFun(values,navigate));
        } catch (error) {
            console.error("Đã xảy ra lỗi khi đăng nhập:", error);
            // Xử lý lỗi đăng nhập (ví dụ: hiển thị thông báo lỗi cho người dùng)
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({ isSubmitting }) => (
                <Form>
                    {title && (
                        <Typography fontWeight="700" variant="h2" mb={1}>
                            {title}
                        </Typography>
                    )}

                    {subtext}

                    <Stack spacing={2}>
                        <Field name="username">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    label="Tên đăng nhập"
                                    variant="outlined"
                                    fullWidth
                                    error={meta.touched && meta.error}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <Field name="password">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    label="Mật khẩu"
                                    variant="outlined"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    error={meta.touched && meta.error}
                                    helperText={meta.touched && meta.error}
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? 'Ẩn' : 'Hiện'}
                                            </Button>
                                        )
                                    }}
                                />
                            )}
                        </Field>

                        <Typography
                            component={Link}
                            to="/"
                            fontWeight="500"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                            }}
                        >
                            Quên mật khẩu ?
                        </Typography>

                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Đăng nhập
                        </Button>
                    </Stack>

                    {subtitle}
                </Form>
            )}
        </Formik>
    );
};

export default AuthLogin;
