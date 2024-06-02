import Image from "next/image";
import React, { useCallback, useRef } from "react";
import ButtonMain from "../ButtonMain";
import { useDropzone } from "react-dropzone";

type Props = {
  urlPreview: string;
  idInput?: string;
  handleChangeImage: (files: FileList | null) => void;
  handleRemoveImage: () => void;
  multiple?: boolean;
};

const InputFileUpload = ({
  urlPreview,
  idInput,
  handleChangeImage,
  handleRemoveImage,
  multiple,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: multiple,
    onDropAccepted(files) {
      const _files = files as unknown as FileList;
      if (_files.length > 0) {
        handleChangeImage(_files);
      }
    },
  });

  const handleChangeFile = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const handleRemoveFile = useCallback(() => {
    handleRemoveImage();
    inputRef.current!.value = "";
  }, [handleRemoveImage]);

  return (
    <div {...getRootProps({ className: "dropzone-input" })}>
      <input
        {...getInputProps()}
        type="file"
        ref={inputRef}
        className="dy-file-input dy-file-input-bordered w-full max-w-lg text-sm lg:text-lg"
        accept="image/*"
        hidden
        id={idInput}
      />
      {urlPreview ? (
        <div className="relative group overflow-hidden">
          <div className="w-full aspect-square relative cursor-pointer transition-all rounded-lg overflow-hidden">
            <div className="absolute size-full bg-black z-10 group-hover:opacity-50 opacity-0 transition-all"></div>
            <Image
              src={urlPreview}
              alt="profile-image"
              fill
              className="group-hover:blur-sm"
            />
          </div>
          <div className="flex items-center justify-start gap-2 absolute bottom-4 right-4 bg-white shadow-linear rounded-md z-20 translate-x-80 group-hover:translate-x-0 transition-all">
            <ButtonMain
              prefixIcon="/icons/change-animation.gif"
              className="bg-transparent"
              onClick={handleChangeFile}
            />
            <ButtonMain
              prefixIcon="/icons/delete-animation.gif"
              onClick={handleRemoveFile}
              className="bg-transparent"
            />
          </div>
        </div>
      ) : (
        <label className="w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-bombay p-14 cursor-pointer">
          <div className="relative w-12 h-12">
            <Image
              src={"/icons/upload-file-animation.gif"}
              alt="upload-icon"
              fill
            />
          </div>
          <p className="text-sm font-semibold text-gray-bombay">
            Drag and drop your profile image to here!
          </p>
        </label>
      )}
    </div>
  );
};

export default InputFileUpload;
