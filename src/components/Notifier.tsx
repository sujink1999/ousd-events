const Notifier = ({
    show = false,
    numberOfLogs,
    onClick,
}: {
    show?: boolean;
    numberOfLogs?: number;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={
                " cursor-pointer fixed left-7 bottom-7 px-6 py-4 rounded-xl bg-secondary border border-primary flex flex-col gap-2 transition-all transform" +
                (!show ? "hover:scale-0 scale-0" : "scale-100 animate-bounce")
            }
        >
            <p className=" text-white ">{`Fetched ${numberOfLogs} new events`}</p>
            <p className=" text-primary ">Refresh</p>
        </div>
    );
};

export default Notifier;
