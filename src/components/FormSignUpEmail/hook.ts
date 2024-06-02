import { userApi } from "@/features/apis";
import { authApi } from "@/features/apis/auth";
import { IPayloadSignUp } from "@/features/apis/interfaces";
import {
  formatExtensionFile,
  formatPreSignUrlS3,
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/functions";
import { IError, IFileUpload, regexPassword } from "@/utils/shared";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import * as yup from "yup";
import {useDropzone} from 'react-dropzone';

const useFormSignUpEmail = () => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadImageProgress, setUploadImageProgress] = useState<number>(0);
  const [fileUpload, setFileUpload] = useState<IFileUpload>({
    extension: "",
    name: "",
    type: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string>("");
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

        const newUser = await authApi.signUp({ ...values, avatar: null });
        if (avatar) {
          //* Handle upload image
          const preSignUrl = await userApi.generatePreSignUrl(
            newUser.id,
            fileUpload
          );
          await userApi.uploadAvatarToService(preSignUrl, avatar);

          await userApi.update(newUser.id, {
            avatar: formatPreSignUrlS3(preSignUrl),
          });
        }
        setLoading(false);
        showSuccessMessage("Your account has been created successfully");
      } catch (error) {
        const err = error as IError;
        setUploadImageProgress(0);
        setLoading(false);
        showErrorMessage(err.message);
      }
    },
  });

  const toggleVisibilityPwd = useCallback(
    () => setIsVisiblePassword(!isVisiblePassword),
    [isVisiblePassword]
  );
  const toggleVisibilityPwdConfirm = useCallback(
    () => setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm),
    [isVisiblePasswordConfirm]
  );

  const handleChangeImage = useCallback(
    (files: FileList | null) => {
      if (!files || files.length <= 0) return;
      const file = files[0];
      formik.setFieldValue("avatar", file);

      const { name, extension } = formatExtensionFile(file.name);
      setFileUpload({
        name,
        extension,
        type: file.type,
      });

      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
    },
    []
  );
  const handleRemoveImage = useCallback(() => {
    formik.setFieldValue("avatar", null);
    setFileUpload({ extension: "", name: "", type: "" });
    setAvatarPreview("");
  }, []);

  return {
    formik,
    loading,
    isVisiblePassword,
    uploadImageProgress,
    isVisiblePasswordConfirm,
    avatarPreview,
    toggleVisibilityPwdConfirm,
    toggleVisibilityPwd,
    handleChangeImage,
    handleRemoveImage
  };
};

export default useFormSignUpEmail;
