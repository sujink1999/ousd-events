import Colors from "../utils/colors";
import { SVGProps } from "react";

export const ExportIcon = ({
    color = Colors.primary,
    ...props
}: SVGProps<SVGSVGElement> & {
    color?: string;
}) => {
    return (
        <svg
            width="24"
            height="24"
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.0004 11.75C12.8104 11.75 12.6204 11.68 12.4704 11.53C12.1804 11.24 12.1804 10.76 12.4704 10.47L20.6704 2.26999C20.9604 1.97999 21.4404 1.97999 21.7304 2.26999C22.0204 2.55999 22.0204 3.03999 21.7304 3.32999L13.5304 11.53C13.3804 11.68 13.1904 11.75 13.0004 11.75Z"
                fill={color}
            />
            <path
                d="M22.0002 7.55C21.5902 7.55 21.2502 7.21 21.2502 6.8V2.75H17.2002C16.7902 2.75 16.4502 2.41 16.4502 2C16.4502 1.59 16.7902 1.25 17.2002 1.25H22.0002C22.4102 1.25 22.7502 1.59 22.7502 2V6.8C22.7502 7.21 22.4102 7.55 22.0002 7.55Z"
                fill={color}
            />
            <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                fill={color}
            />
        </svg>
    );
};

export const RightArrow = ({
    ...props
}: SVGProps<SVGSVGElement> & {
    color?: string;
}) => {
    return (
        <svg
            {...props}
            width="9"
            height="15"
            viewBox="0 0 13 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.66113 22.3199L12.2933 10.964L0.937295 0.331826L1.66113 22.3199Z"
                fill="white"
            />
        </svg>
    );
};

export const LeftArrow = ({
    ...props
}: SVGProps<SVGSVGElement> & {
    color?: string;
}) => {
    return (
        <svg
            width="9"
            height="15"
            viewBox="0 0 12 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.9961 0L0.298045 11.2939L11.5919 21.9919L10.9961 0Z"
                fill="white"
            />
        </svg>
    );
};
