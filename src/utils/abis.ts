export const OUSDVaultABI = [
    "event AssetSupported(address _asset)",
    "event AssetDefaultStrategyUpdated(address _asset, address _strategy)",
    "event AssetAllocated(address _asset, address _strategy, uint256 _amount)",
    "event StrategyApproved(address _addr)",
    "event StrategyRemoved(address _addr)",
    "event Mint(address _addr, uint256 _value)",
    "event Redeem(address _addr, uint256 _value)",
    "event CapitalPaused()",
    "event CapitalUnpaused()",
    "event RebasePaused()",
    "event RebaseUnpaused()",
    "event VaultBufferUpdated(uint256 _vaultBuffer)",
    "event RedeemFeeUpdated(uint256 _redeemFeeBps)",
    "event PriceProviderUpdated(address _priceProvider)",
    "event AllocateThresholdUpdated(uint256 _threshold)",
    "event RebaseThresholdUpdated(uint256 _threshold)",
    "event StrategistUpdated(address _address)",
    "event MaxSupplyDiffChanged(uint256 maxSupplyDiff)",
    "event YieldDistribution(address _to, uint256 _yield, uint256 _fee)",
    "event TrusteeFeeBpsChanged(uint256 _basis)",
    "event TrusteeAddressChanged(address _address)",
];

export const ERC20ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event TotalSupplyUpdatedHighres(uint256 totalSupply, uint256 rebasingCredits, uint256 rebasingCreditsPerToken)",
];
