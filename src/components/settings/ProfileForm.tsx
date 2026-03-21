import { Box, Button, FormControl, FormHelperText, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import type { User } from "../../features/auth/authTypes";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { currencyOptions, languageOptions } from "../../utils/constants";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateProfile } from "../../features/auth/authSlice";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

type ProfileFormValues = {
    name: string;
    email: string;
    phone: string;
    currency: string;
    language: string;
}

interface ProfileFormProps {
    mode: "create" | "edit";
    onCancel?: () => void;
    initialData?: User | null;
}

const ProfileForm = ({ mode, onCancel, initialData }: ProfileFormProps) => {
    const dispatch = useAppDispatch();

    const formik = useFormik<ProfileFormValues>({
        initialValues: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            phone: initialData?.phone ?? "",
            currency: initialData?.currency ?? "",
            language: initialData?.language ?? ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required"),
            email: Yup.string()
                .required("Email is required"),
            phone: Yup.string(),
            currency: Yup.string(),
            language: Yup.string()
        }),
        enableReinitialize: true,
        onSubmit: async (values, {setSubmitting}) => {
            try{
                const payload = {
                    ...values
                }
                if(mode === "edit" && initialData) {
                    await dispatch(updateProfile(payload)).unwrap();
                    dispatch(showSnackbar({message: "Profile updated successfully", severity: "success"}));
                }
                onCancel?.();
            } catch(error){
                const message = typeof error === "string" ? error : (error as {message?: string})?.message || "Something went wrong";
                dispatch(showSnackbar({message: message, severity: "error"}))
            } finally {
                setSubmitting(false)
            }
        }
    });

    const emptyValues: ProfileFormValues = {
        name: "",
        email: "",
        phone: "",
        currency: "",
        language: ""
    };
    return (
        <Box
            className="flex flex-col gap-2 max-w-100"
            component="form"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Name
                </Typography>
                <TextField
                    name="name"
                    type="text"
                    variant="outlined"
                    value={formik.values.name}
                    placeholder="Enter name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </Box>
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    email
                </Typography>
                <TextField
                    name="email"
                    type="text"
                    variant="outlined"
                    value={formik.values.email}
                    placeholder="Enter email"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </Box>
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Phone (Optional)
                </Typography>
                <TextField
                    name="phone"
                    type="text"
                    variant="outlined"
                    value={formik.values.phone}
                    placeholder="Enter phone"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
            </Box>
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Currency
                </Typography>
                <FormControl
                    fullWidth
                    error={formik.touched.currency && Boolean(formik.errors.currency)}
                >
                    <Select
                        labelId="profile-currency-label"
                        id="profile-currency"
                        name="currency"
                        value={formik.values.currency}
                        displayEmpty
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <MenuItem value="" disabled>
                            Select currency
                        </MenuItem>
                        {currencyOptions.map((c) => (
                            <MenuItem key={c.label} value={c.value}>{c.label}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.currency && formik.errors.currency && (
                        <FormHelperText>{formik.errors.currency}</FormHelperText>
                    )}
                </FormControl>
            </Box>
            <Box>
                <Typography
                    sx={(theme) => ({
                        ...theme.typography.formLabel,
                        color: theme.palette.text.secondary,
                        mb: 1,
                    })}
                >
                    Language
                </Typography>
                <FormControl
                    fullWidth
                    error={formik.touched.language && Boolean(formik.errors.language)}
                >
                    <Select
                        labelId="profile-language-label"
                        id="profile-language"
                        name="language"
                        value={formik.values.language}
                        displayEmpty
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <MenuItem value="" disabled>
                            Select language
                        </MenuItem>
                        {languageOptions.map((l) => (
                            <MenuItem key={l.label} value={l.value}>{l.label}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.language && formik.errors.language && (
                        <FormHelperText>{formik.errors.language}</FormHelperText>
                    )}
                </FormControl>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <Button 
                    variant="outlined"
                    onClick={() => {
                        formik.setValues(emptyValues)
                    }}
                    disabled={formik.isSubmitting}
                    className="w-full"
                >
                    Clear
                </Button>
                <Button variant="contained" type="submit" disabled={formik.isSubmitting} className="w-full">{formik.isSubmitting ? "Saving...." : "Save changes"}</Button>
            </Stack>
        </Box>
    )
}

export default ProfileForm;