import { LeftArrow, RightArrow } from "../assets/Icon";

const PageSwitcher = ({
    numberOfPages = 1,
    currentPage = 1,
    changePage,
}: {
    numberOfPages?: number;
    currentPage?: number;
    changePage: (page: number) => void;
}) => {
    const isLastPage = numberOfPages === currentPage;
    const isFirstPage = currentPage === 1;

    if (numberOfPages < 2) {
        return <></>;
    }

    return (
        <div className=" flex items-center gap-5 p-2">
            <div
                className="text-white flex items-center gap-3 cursor-pointer transform transition-all hover:scale-125"
                onClick={() => !isFirstPage && changePage(currentPage - 1)}
            >
                <LeftArrow /> Prev
            </div>
            <div className=" flex items-center gap-3 p-5">
                <PageIcon
                    number={
                        isFirstPage
                            ? currentPage
                            : isLastPage && numberOfPages > 2
                            ? currentPage - 2
                            : currentPage - 1
                    }
                    isSelected={currentPage === 1}
                />
                {numberOfPages > 2 && (
                    <PageIcon
                        number={
                            isFirstPage
                                ? currentPage + 1
                                : isLastPage
                                ? currentPage - 1
                                : currentPage
                        }
                        isSelected={!isLastPage && !isFirstPage}
                    />
                )}
                <PageIcon
                    number={
                        isLastPage
                            ? currentPage
                            : isFirstPage && numberOfPages > 2
                            ? currentPage + 2
                            : currentPage + 1
                    }
                    isSelected={currentPage === numberOfPages}
                />
            </div>

            <div
                className="text-white flex items-center gap-3 cursor-pointer transform transition-all hover:scale-125"
                onClick={() => !isLastPage && changePage(currentPage + 1)}
            >
                Next <RightArrow />
            </div>
        </div>
    );
};

const PageIcon = ({
    isSelected = false,
    number,
}: {
    isSelected?: boolean;
    number: Number;
}) => {
    return (
        <div
            className={` w-8 h-8 rounded-full flex justify-center items-center text-white ${
                isSelected ? "bg-primary" : "border border-white/50"
            }`}
        >
            {number.toString()}
        </div>
    );
};

export default PageSwitcher;
