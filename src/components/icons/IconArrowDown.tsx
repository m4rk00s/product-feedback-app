import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {
  color?: string;
}

export default function IconArrowDown(props: Props): JSX.Element {
  return (
    <svg
      {...props}
      color={props.color ?? "#4661E6"}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}
