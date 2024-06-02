import { signIn } from "@/auth";
import { authApi } from "@/features/apis/auth";
import { signInAction } from "@/features/auth/signIn";
import { IPayloadSignUp } from "@/lib/interfaces";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import { showErrorMessage, showSuccessMessage } from "@/utils/functions";
import { IError, regexPassword } from "@/utils/shared";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import * as yup from "yup";

const useFormSignUpEmail = () => {
  const router = useRouter();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState(false);
  const [error, setError] = useState<IError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadImageProgress, setUploadImageProgress] = useState<number>(0);

  const toggleVisibilityPwd = useCallback(
    () => setIsVisiblePassword(!isVisiblePassword),
    [isVisiblePassword]
  );
  const toggleVisibilityPwdConfirm = useCallback(
    () => setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm),
    [isVisiblePasswordConfirm]
  );

  const handleChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length <= 0) return;
      formik.setFieldValue("image", files[0]);
    },
    []
  );

  const validationSchema = yup.object({
    image: yup.mixed().nullable(),
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    userName: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        regexPassword,
        "Password must eight characters, at least one letter, one number and one special character"
      ),
    passwordConfirm: yup
      .string()
      .required("Password confirm is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik<IPayloadSignUp>({
    initialValues: {
      avatar: null,
      email: "",
      name: "",
      userName: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    async onSubmit(values) {
      try {
        setLoading(true);
        const { avatar } = values;

        const newUser = await authApi.signUp({ ...values });

        let newImageProfile = avatar;
        if (avatar) {
          //* Handle upload image
        }
        setLoading(false);
        showSuccessMessage("Your account has been created successfully");
      } catch (error) {
        const err = error as IError;
        console.log(err);
        setUploadImageProgress(0);
        setLoading(false);
        showErrorMessage(err.message);
      }
    },
  });

  return {
    formik,
    error,
    loading,
    isVisiblePassword,
    uploadImageProgress,
    isVisiblePasswordConfirm,
    toggleVisibilityPwdConfirm,
    toggleVisibilityPwd,
    handleChangeImage,
  };
};

export default useFormSignUpEmail;
