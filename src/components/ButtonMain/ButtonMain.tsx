import { Button, Spinner } from "@nextui-org/react";
import React, { useCallback } from "react";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  title?: string;
  prefixIcon?: string;
};

const ButtonMain = React.memo(
  ({ loading, className, onClick, title, prefixIcon }: Props) => {
    const handleClick = useCallback(() => {
      if (onClick) onClick();
    }, [onClick]);

    return (
      <Button
        type="button"
        onClick={handleClick}
        className={clsx(
          "text-sm font-semibold bg-green-primary text-white rounded-lg py-5 px-7",
          className ? className : "",
          loading ? "opacity-50" : ""
        )}
        disabled={loading}
      >
        {title ? title : ""}
        {prefixIcon && (
          <div className="relative w-6 h-6">
            <Image src={prefixIcon} alt="icon" fill />
          </div>
        )}
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
    );
  }
);
ButtonMain.displayName = "ButtonMain";
export default ButtonMain;
