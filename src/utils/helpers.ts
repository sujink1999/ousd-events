import { Contract, utils } from "ethers";
import { LogData } from "../containers/Home";
import { provider } from "./provider";

export const getContractLogs = async (
    tokenAddress: string,
    abi: string[],
    fromBlock: number,
    toBlock: number,
    name: string
): Promise<LogData[]> => {
    try {
        const contract = new Contract(tokenAddress, abi, provider);
        let iface = new utils.Interface(abi);
        const events = await contract.queryFilter("*", fromBlock, toBlock);

        events.reverse();
        const logsData = events.map((event) => ({
            contractName: name,
            event,
            logDescription: iface.parseLog(event),
        }));
        return logsData;
    } catch (err) {
        console.log(err);
    }
    return [];
};

export const mergeLogs = (array1: LogData[], array2: LogData[]) => {
    const resultLength = array1.length + array2.length;
    const result = [];
    let index1 = 0,
        index2 = 0;
    for (let i = 0; i < resultLength; i++) {
        if (index1 < array1.length && index2 < array2.length) {
            if (
                array1[index1]?.event?.blockNumber >=
                array2[index2]?.event?.blockNumber
            ) {
                result.push(array1[index1]);
                index1 += 1;
            } else {
                result.push(array2[index2]);
                index2 += 1;
            }
        } else if (index1 < array1.length) {
            return result.concat(array1.slice(index1, array1.length));
        } else {
            return result.concat(array2.slice(index2, array2.length));
        }
    }
    return result;
};
