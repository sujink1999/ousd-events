import { Event } from "ethers";
import { LogDescription } from "ethers/lib/utils";
import { useEffect, useRef, useState } from "react";
import LogCard from "../components/LogCard";
import Header from "../components/Header";
import { provider } from "../utils/provider";
import PageSwitcher from "../components/PageSwitcher";
import FilterDropdown from "../components/FilterDropdown";
import Notifier from "../components/Notifier";
import { ERC20ABI, OUSDVaultABI } from "../utils/abis";
import Lottie from "lottie-react";
import serverAnimation from "../assets/lottie/server.json";
import astronautAnimation from "../assets/lottie/astronaut.json";

import { getContractLogs, mergeLogs } from "../utils/helpers";
import RippleOUSD from "../components/RippleOUSD";

export type LogData = {
    contractName: string;
    event: Event;
    logDescription: LogDescription;
};

const Home = () => {
    // log arrays
    const [logs, setLogs] = useState<LogData[]>([]);
    const [newLogs, setNewLogs] = useState<LogData[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);

    // keeps track of all the values for filters
    const [eventFilters, setEventFilters] = useState<any>({
        eventNames: {},
        blockNumbers: {},
    });

    // user's filter options
    const [nameFilter, setNameFilter] = useState<null | undefined | string>(
        null
    );
    const [blockNumberFilter, setBlockNumberFilter] = useState<
        null | undefined | string
    >(null);

    const [showNotifier, setShowNotifier] = useState(false);
    const [page, setPage] = useState(0);
    const [fetchFlag, setFetchFlag] = useState(0);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const isFetching = useRef(false);
    const lastFetchedBlock = useRef(Number(process.env.REACT_APP_START_BLOCK));

    const LOGS_PER_PAGE = Number(process.env.REACT_APP_LOGS_PER_PAGE) || 4;
    const QUERY_WAIT_TIME =
        Number(process.env.REACT_APP_QUERY_WAIT_TIME) || 30000;

    const numberOfPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);

    // logs to be shown in the page
    const logsToShow = filteredLogs.slice(
        page * LOGS_PER_PAGE,
        page * LOGS_PER_PAGE + LOGS_PER_PAGE
    );

    // updates the filtered logs based on new logs and filters
    useEffect(() => {
        const result = logs.filter(({ event }) => {
            const { event: name, blockNumber } = event;
            if (nameFilter && nameFilter !== name) {
                return false;
            }
            if (
                blockNumberFilter &&
                blockNumber.toString() !== blockNumberFilter
            ) {
                return false;
            }
            return true;
        });
        setFilteredLogs(result);
        setPage(0);
    }, [logs, nameFilter, blockNumberFilter]);

    // trigger fetch logs once every QUERY_WAIT_TIME
    useEffect(() => {
        const instance = setInterval(() => {
            setFetchFlag((fetchFlag) => fetchFlag + 1);
        }, QUERY_WAIT_TIME);
        return () => clearInterval(instance);
    }, [QUERY_WAIT_TIME]);

    // fetch logs
    useEffect(() => {
        !isFetching.current && fetchLogs();
    }, [fetchFlag]);

    // show notifier for new logs
    useEffect(() => {
        if (newLogs.length) {
            setShowNotifier(true);
        }
    }, [newLogs]);

    // collapses any selected card when page changes
    useEffect(() => {
        setSelectedCard(null);
    }, [page]);

    const fetchLogs = async () => {
        isFetching.current = true;
        const latestBlock = await provider.getBlockNumber();

        const ousdVaultAddress = process.env.REACT_APP_OUSD_VAULT_ADDRESS || "";
        const ousdTokenAddress = process.env.REACT_APP_OUSD_TOKEN_ADDRESS || "";

        if (lastFetchedBlock.current >= latestBlock) {
            isFetching.current = false;
            return;
        }

        const queryCount = Number(process.env.REACT_APP_QUERY_COUNT) || 2500;
        const fromBlock = lastFetchedBlock.current + 1;
        const toBlock = Math.min(
            latestBlock,
            lastFetchedBlock.current + queryCount
        );

        // get logs for both contracts
        const [vaultLogs, ousdTokenLogs] = await Promise.all([
            getContractLogs(
                ousdVaultAddress,
                OUSDVaultABI,
                fromBlock,
                toBlock,
                "OUSD Vault"
            ),
            getContractLogs(
                ousdTokenAddress,
                ERC20ABI,
                fromBlock,
                toBlock,
                "OUSD Token"
            ),
        ]);

        // merge the logs based on block number
        const logsData = mergeLogs(vaultLogs, ousdTokenLogs);

        lastFetchedBlock.current = toBlock;

        // set up logs or update new logs
        if (logsData.length) {
            if (logs.length) {
                setNewLogs((prev) => [...logsData, ...prev]);
            } else {
                setLogs(logsData);
                updateFilters(logsData);
            }
        }
        isFetching.current = false;
    };

    // adds any new value to the available filters
    const updateFilters = (logsData: LogData[]) => {
        const { eventNames = {}, blockNumbers = {} } = eventFilters;
        logsData.forEach(({ event }) => {
            const { event: eventName, blockNumber } = event;
            if (eventName && !(eventName in eventNames)) {
                eventNames[eventName] = true;
            }
            if (!(blockNumber in blockNumbers)) {
                blockNumbers[blockNumber] = true;
            }
        });
        setEventFilters({
            eventNames,
            blockNumbers,
        });
    };

    // update old logs with the new logs
    const updateLogs = () => {
        setLogs((prev) => [...newLogs, ...prev]);
        updateFilters(newLogs);
        setNewLogs([]);
        setShowNotifier(false);
    };

    return (
        <div className=" bg-black w-screen h-screen flex flex-col items-center px-4">
            <RippleOUSD />
            <div className=" flex gap-4 items-center flex-wrap justify-center w-full mb-5">
                <p className=" text-white ">Filter by </p>
                <div className="flex gap-4 items-center flex-wrap justify-center">
                    <FilterDropdown
                        options={Object.keys(eventFilters?.eventNames)}
                        onSelection={(val) => setNameFilter(val)}
                        placeholder="Event name"
                    />
                    <FilterDropdown
                        options={Object.keys(eventFilters?.blockNumbers)}
                        onSelection={(val) => setBlockNumberFilter(val)}
                        placeholder="Block number"
                    />
                </div>
            </div>

            {logsToShow.length ? (
                <>
                    <div className=" max-w-3xl w-full">
                        <Header />
                    </div>
                    <div className=" w-full max-w-3xl hide-scrollbar flex flex-col flex-1 gap-3 overflow-y-scroll">
                        {logsToShow.map((log, index) => {
                            const isSelected = selectedCard === index;
                            return (
                                <LogCard
                                    isSelected={isSelected}
                                    onClick={() =>
                                        setSelectedCard(
                                            isSelected ? null : index
                                        )
                                    }
                                    key={index}
                                    logData={log}
                                />
                            );
                        })}
                    </div>
                </>
            ) : logs.length ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <Lottie
                        className="md:w-500 w-350 h-350"
                        animationData={astronautAnimation}
                        loop={true}
                    />
                    <p className="text-primary mt-10">
                        {"Looks like you've filtered everything out :/"}
                    </p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <Lottie
                        className="w-250 h-250"
                        animationData={serverAnimation}
                        loop={true}
                    />
                    <p className="text-primary">Querying the blockchain...</p>
                </div>
            )}
            <PageSwitcher
                numberOfPages={numberOfPages}
                currentPage={page + 1}
                changePage={(val) => setPage(val - 1)}
            />
            <Notifier
                show={showNotifier}
                numberOfLogs={newLogs.length}
                onClick={() => updateLogs()}
            />
        </div>
    );
};

export default Home;
