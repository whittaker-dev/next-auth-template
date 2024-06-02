"use client";
import { routerName } from "@/constants";
import { Button, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import InputFileUpload from "../InputFileUpload";
import useFormSignUpEmail from "./hook";

type Props = {};

const FormSignUpEmail = (props: Props) => {
  const {
    formik,
    isVisiblePassword,
    uploadImageProgress,
    isVisiblePasswordConfirm,
    loading,
    avatarPreview,
    toggleVisibilityPwd,
    toggleVisibilityPwdConfirm,
    handleChangeImage,
    handleRemoveImage,
  } = useFormSignUpEmail();

  return (
    <div className="w-full bg-white p-8 rounded-lg relative">
      <div
        className="absolute top-0 left-0 bg-green-primary h-3 rounded-tl-lg rounded-tr-lg"
        style={{
          width: `${uploadImageProgress}%`,
          transition: "all 1s ease-in-out",
        }}
      ></div>
      <Link
        href={routerName.signUp}
        className="flex items-center justify-start gap-1 w-full"
      >
        <div className="relative w-4 h-4">
          <Image src="/icons/arrow-left-black.svg" alt="icon-arrow-left" fill />
        </div>
        <span className="text-base font-medium text-dark-primary">Back</span>
      </Link>
      <h3 className="text-center text-xl font-semibold text-dark-primary mt-2 mb-5">
        Sign up with{" "}
        <span className="text-green-primary text-2xl font-bold">Email</span>
      </h3>
      <form onSubmit={formik.handleSubmit}>
        {/* ===== PROFILE IMAGE ===== */}
        <div className="">
          <label className="block text-sm font-semibold text-dark-primary mb-2">
            Profile image
          </label>

          <InputFileUpload
            idInput="sign-up-input-avatar"
            urlPreview={avatarPreview}
            handleChangeImage={handleChangeImage}
            handleRemoveImage={handleRemoveImage}
          />
          {formik.errors.avatar && (
            <p className="text-[12px] font-medium text-red-700 mt-2">
              {formik.errors.avatar}
            </p>
          )}
        </div>

        {/* ===== NAME ===== */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-dark-primary mb-2">
            Name <span className="text-green-primary">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            classNames={{
              inputWrapper: [
                "h-[40px] rounded-lg border border-solid border-gray-bombay ",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
                "group-data-[focus-visible=true]:ring-offset-0",
                "group-data-[focus-visible=true]:ring-transparent",
              ],
              input: ["text-sm"],
            }}
          />
          {formik.errors.name && (
            <p className="text-[12px] font-medium text-red-700 mt-2">
              {formik.errors.name}
            </p>
          )}
        </div>

        {/* ===== USER NAME ===== */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-dark-primary mb-2">
            User name <span className="text-green-primary">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter your username"
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            classNames={{
              inputWrapper: [
                "h-[40px] rounded-lg border border-solid border-gray-bombay ",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
                "group-data-[focus-visible=true]:ring-offset-0",
                "group-data-[focus-visible=true]:ring-transparent",
              ],
              input: ["text-sm"],
            }}
          />
          {formik.errors.userName && (
            <p className="text-[12px] font-medium text-red-700 mt-2">
              {formik.errors.userName}
            </p>
          )}
        </div>

        {/* ===== EMAIL ===== */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-dark-primary mb-2">
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
                "h-[40px] rounded-lg border border-solid border-gray-bombay ",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
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
          <label className="block text-sm font-semibold text-dark-primary mb-2">
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
                "h-[40px] rounded-lg border border-solid border-gray-bombay ",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
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

        <div className="mt-6">
          <label className="block text-sm font-semibold text-dark-primary mb-2">
            Password confirm <span className="text-green-primary">*</span>
          </label>
          <Input
            placeholder="Enter your password"
            name="passwordConfirm"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityPwdConfirm}
              >
                {isVisiblePasswordConfirm ? (
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
            type={isVisiblePasswordConfirm ? "text" : "password"}
            className="w-full"
            classNames={{
              inputWrapper: [
                "h-[40px] rounded-lg border border-solid border-gray-bombay",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
                "group-data-[focus-visible=true]:ring-offset-0",
                "group-data-[focus-visible=true]:ring-transparent",
              ],
              input: ["text-sm"],
            }}
          />
          {formik.errors.passwordConfirm && (
            <p className="text-[12px] font-medium text-red-700 mt-2">
              {formik.errors.passwordConfirm}
            </p>
          )}
        </div>
        <div className="flex items-center justify-start w-full mt-6">
          <Button
            type="submit"
            className="text-sm font-semibold bg-green-primary text-white rounded-lg py-5 px-7"
            disabled={loading}
          >
            Sign up
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
  );
};

export default FormSignUpEmail;
