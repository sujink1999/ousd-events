import { OUSDCoin } from "../assets/Icon";

const RippleOUSD = () => {
    return (
        <div className=" relative w-40 h-40 flex justify-center items-center">
            <div className=" z-0 absolute border rounded-full border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ripple-animation-1" />
            <div className=" z-0 absolute border rounded-full border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ripple-animation-2" />
            <div className=" z-0 absolute border rounded-full border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ripple-animation-3" />
            <OUSDCoin width={50} height={50} className=" z-10" />
        </div>
    );
};

export default RippleOUSD;
