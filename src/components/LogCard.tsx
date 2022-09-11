import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { ExportIcon } from "../assets/Icon";
import { LogData } from "../containers/Home";

const LogCard = ({
    logData,
    onClick,
    isSelected,
}: {
    logData: LogData;
    onClick?: () => void;
    isSelected: boolean;
}) => {
    const { event, logDescription, contractName } = logData || {};
    const { blockNumber, event: name, transactionHash } = event;

    const dataKeys = logDescription?.eventFragment?.inputs?.map(
        ({ name }) => name
    );

    return (
        <div
            onClick={onClick}
            className=" cursor-pointer bg-secondary rounded-xl p-5 px-7  text-white flex flex-col gap-5 border  border-secondary hover:border-primary/80 transition-all "
        >
            <div className=" flex w-full items-center">
                <p className="flex-1 text-sm text-left">{`${blockNumber}`}</p>
                <p className="flex-1 text-sm text-center break-words">
                    <span className=" text-primary">{contractName}</span>{" "}
                    {` - ${name}`}
                </p>
                <div className="flex-1 flex justify-end ">
                    <ExportIcon
                        onClick={() =>
                            window.open(
                                `https://etherscan.io/tx/${transactionHash}`,
                                "_blank"
                            )
                        }
                        className="transition-all transform hover:scale-125"
                    />
                </div>
            </div>
            {isSelected && (
                <div className=" p-5 bg-black/75 rounded-xl flex flex-col ">
                    {dataKeys.map((key, index) => {
                        const value = logDescription?.args?.[key];
                        return (
                            <p
                                key={index}
                                className=" text-white/70 overflow-ellipsis break-words"
                            >{`${key}: ${
                                value?.is_isBigNumber
                                    ? formatUnits(value)
                                    : value
                            }`}</p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LogCard;
