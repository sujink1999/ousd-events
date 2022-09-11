import { ERC20ABI, OUSDVaultABI } from "../utils/abis";
import { getContractLogs, mergeLogs } from "../utils/helpers";

const vaultAddress = "0xE75D77B1865Ae93c7eaa3040B038D7aA7BC02F70";
const tokenAddress = "0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86";

const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

test("FETCH OUSD VAULT LOGS", async () => {
    const vaultAddress = "0xE75D77B1865Ae93c7eaa3040B038D7aA7BC02F70";
    const logs = await getContractLogs(
        vaultAddress,
        OUSDVaultABI,
        15497431,
        15497431 + 5000,
        "OUSD Vault"
    );
    expect(logs.length).toBe(1);
    expect(logs[0].contractName).toBe("OUSD Vault");
    expect(logs[0].event.blockNumber).toBe(15501377);
    expect(logs[0].logDescription).toBeDefined();
});

test("MERGE LOGS IN ASCENDING ORDER", async () => {
    const logs1 = await getContractLogs(
        vaultAddress,
        OUSDVaultABI,
        15497431,
        15497431 + 5000,
        "OUSD Vault"
    );
    const logs2 = await getContractLogs(
        tokenAddress,
        ERC20ABI,
        15497431,
        15497431 + 1000,
        "OUSD Token"
    );
    const mergedLogs = mergeLogs(logs1, logs2);
    expect(mergedLogs.length).toBe(logs1.length + logs2.length);
    const arr = mergedLogs.map((log) => {
        const {
            event: { blockNumber },
        } = log;
        return blockNumber;
    });
    const isDescending = arr.every(function (x, i) {
        return i === 0 || x <= arr[i - 1];
    });
    expect(isDescending).toBe(true);
});
