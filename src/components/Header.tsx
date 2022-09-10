const Header = () => {
    return (
        <div className=" flex font-semibold  p-5 pb-3">
            <h3 className=" text-primary flex-1 text-left">Block Number</h3>
            <h3 className=" text-primary flex-1 text-center">Name</h3>
            <h3 className=" text-primary flex-1 text-right">Txn hash</h3>
        </div>
    );
};

export default Header;
