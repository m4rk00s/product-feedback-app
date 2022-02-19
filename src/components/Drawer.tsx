import React from "react";

type Props = {
  children: JSX.Element;
  isOpen: boolean;
  onClickAwayHandler: () => void;
};

export default function Drawer(props: Props) {
  return (
    <>
      <div
        className={
          "inset-0 fixed z-10 h-full w-full bg-black mix-blend-normal opacity-50 " +
          (props.isOpen ? "" : "hidden")
        }
        onClick={props.onClickAwayHandler}
      ></div>
      <div
        className={
          "w-72 overflow-auto h-full right-0 bg-[#F7F8FD] top-0 fixed z-10 " +
          (props.isOpen ? "" : "hidden")
        }
      >
        {props.children}
      </div>
    </>
  );
}
