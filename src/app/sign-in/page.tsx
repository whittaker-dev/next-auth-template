"use client";
import ButtonAuthSocial from "@/components/ButtonAuthSocial";
import { ETypeAuthSocial } from "@/components/ButtonAuthSocial/ButtonAuthSocial";
import { signInAction } from "@/features/auth/signIn";
import { IPayloadSignIn } from "@/features/apis/interfaces";
import { IError } from "@/utils/shared/interface";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import * as yup from "yup";

type Props = {};

const FormSignUpEmail = (props: Props) => {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [error, setError] = useState<IError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadImageProgress, setUploadImageProgress] = useState<number>(0);

  const toggleVisibilityPwd = useCallback(
    () => setIsVisiblePassword(!isVisiblePassword),
    [isVisiblePassword]
  );

  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("password is required"),
  });

  const formik = useFormik<IPayloadSignIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      try {
        setLoading(true);
        const { email, password } = values;
        await signInAction({ email, password });
        setLoading(false);
      } catch (error) {
        const err = error as IError;
        console.log({ error });
        setError(err);
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center flex-col bg-green-primary-400">
      <div className="rounded-lg relative w-full">
        <div className="flex items-center justify-start gap-4 flex-col w-full">
          <ButtonAuthSocial
            title="Sign in with Apple"
            type={ETypeAuthSocial.Apple}
            icon="/icons/apple.svg"
          />
          <ButtonAuthSocial
            title="Sign in with Google"
            type={ETypeAuthSocial.Google}
            icon="/icons/gmail.svg"
          />
          <ButtonAuthSocial
            title="Sign in with Twitter (X)"
            type={ETypeAuthSocial.Twitter}
            icon="/icons/twitter.svg"
          />
          <ButtonAuthSocial
            title="Sign in with Github"
            type={ETypeAuthSocial.Github}
            icon="/icons/github.svg"
          />
        </div>
        <div
          className="absolute top-0 left-0 bg-green-primary h-3 rounded-tl-lg rounded-tr-lg"
          style={{
            width: `${uploadImageProgress}%`,
            transition: "all 1s ease-in-out",
          }}
        ></div>
        <div className="flex items-center justify-between my-6 gap-6">
          <span className="w-full h-[1px] bg-gray-bombay"></span>
          <span className="text-xs font-medium text-gray-bombay">OR</span>
          <span className="w-full h-[1px] bg-gray-bombay"></span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* ===== EMAIL ===== */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Email <span className="text-green-primary">*</span>
            </label>
            <Input
              type="email"
              placeholder="tyler@trysomethign.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              classNames={{
                inputWrapper: [
                  "h-[40px] rounded-lg border border-solid border-gray-bombay bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                  "group-data-[focus-visible=true]:ring-offset-0",
                  "group-data-[focus-visible=true]:ring-transparent",
                ],
                input: ["text-sm"],
              }}
            />
            {formik.errors.email && (
              <p className="text-[12px] font-medium text-red-700 mt-2">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* ===== PASSWORD ===== */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Password <span className="text-green-primary">*</span>
            </label>
            <Input
              placeholder="Enter your password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityPwd}
                >
                  {isVisiblePassword ? (
                    <div className="relative w-4 h-4">
                      <Image src="/icons/eye.svg" alt="eye-icon" fill />
                    </div>
                  ) : (
                    <div className="relative w-4 h-4">
                      <Image src="/icons/eye-closed.svg" alt="eye-icon" fill />
                    </div>
                  )}
                </button>
              }
              type={isVisiblePassword ? "text" : "password"}
              className="w-full"
              classNames={{
                inputWrapper: [
                  "h-[40px] rounded-lg border border-solid border-gray-bombay bg-white",
                  "data-[hover=true]:bg-white ",
                  "group-data-[focus=true]:bg-white",
                  "group-data-[focus-visible=true]:ring-offset-0",
                  "group-data-[focus-visible=true]:ring-transparent",
                ],
                input: ["text-sm"],
              }}
            />
            {formik.errors.password && (
              <p className="text-[12px] font-medium text-red-700 mt-2">
                {formik.errors.password}
              </p>
            )}
          </div>

          {error && (
            <p className="text-[12px] font-medium text-red-700 mt-2">
              {error.message}
            </p>
          )}

          <div className="flex items-center justify-start w-full mt-6">
            <Button
              type="submit"
              className="text-sm font-semibold bg-green-primary text-white rounded-lg py-5 px-7 w-full"
              disabled={loading}
            >
              Log in
              {loading && (
                <Spinner
                  size="sm"
                  classNames={{
                    circle1: "border-b-white",
                    circle2: "border-b-white",
                  }}
                />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignUpEmail;
