// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Sovereign Covenant Wallet
 * @dev A treasury contract governed by Enochian "First Fruits" logic.
 * It automates stewardship by segregating Covenant portions before
 * reinvestment can occur.
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SovereignWallet is Ownable, ReentrancyGuard {

    // --- COVENANT PARAMETERS ---
    
    // The "Storehouse" address (Where the Tithe/First Fruits go)
    address public storehouseAddress;
    
    // The Covenant Percentage (e.g., 1000 = 10%) - "The Divine Measure"
    uint256 public constant COVENANT_BASIS_POINTS = 1000; 
    uint256 public constant TOTAL_BASIS_POINTS = 10000;

    // Jubilee Tracking (7-Cycle Logic for time-locks or debt release)
    uint256 public lastJubileeTimestamp;
    uint256 public constant JUBILEE_CYCLE = 52 weeks * 7; // Approx 7 years

    // --- EVENTS (The "Angel Ledger" Witness) ---
    event FirstFruitsSown(address indexed token, uint256 amount, uint256 timestamp);
    event KingdomResourceDeployed(address indexed recipient, uint256 amount, string mission);
    event JubileeDeclared(uint256 timestamp);

    constructor(address _storehouse, address _initialOwner) Ownable(_initialOwner) {
        require(_storehouse != address(0), "Storehouse cannot be zero address");
        storehouseAddress = _storehouse;
        lastJubileeTimestamp = block.timestamp;
    }

    // --- THE "FIRST FRUITS" PROTOCOL ---
    
    /**
     * @notice Processes incoming abundance. Automatically segregates the 
     * Covenant portion to the Storehouse and keeps the rest for stewardship.
     * @param _token The address of the asset (pDAI, PLS, etc.)
     * @param _totalAmount The total profit/harvest realized.
     */
    function sanctifyHarvest(address _token, uint256 _totalAmount) external nonReentrant onlyOwner {
        // 1. Calculate the Covenant Portion (The First Fruits)
        uint256 titheAmount = (_totalAmount * COVENANT_BASIS_POINTS) / TOTAL_BASIS_POINTS;
        uint256 stewardAmount = _totalAmount - titheAmount;

        // 2. Transfer First Fruits to Storehouse (The Altar)
        bool successTithe;
        if (_token == address(0)) {
            // Handle Native PLS
            (successTithe, ) = payable(storehouseAddress).call{value: titheAmount}("");
        } else {
            // Handle ERC20 (pDAI, etc.)
            successTithe = IERC20(_token).transfer(storehouseAddress, titheAmount);
        }
        require(successTithe, "Failed to sow First Fruits");

        // 3. Record the "Angel Ledger" Witness
        emit FirstFruitsSown(_token, titheAmount, block.timestamp);

        // The remaining 'stewardAmount' stays in this contract for deployment
    }

    // --- THE "STABLES HERO" DEPLOYMENT ---

    /**
     * @notice Deploys resources for Kingdom purposes (buying land, funding missions).
     * Can only be called by the Sovereign (or the Bridge).
     */
    function deployResource(address _token, address _recipient, uint256 _amount, string memory _mission) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient");
        
        bool success;
        if (_token == address(0)) {
            (success, ) = payable(_recipient).call{value: _amount}("");
        } else {
            success = IERC20(_token).transfer(_recipient, _amount);
        }
        require(success, "Deployment failed");

        emit KingdomResourceDeployed(_recipient, _amount, _mission);
    }

    // --- JUBILEE LOGIC ---

    /**
     * @notice Acknowledges the passing of a 7-year cycle. 
     * Can trigger debt forgiveness or unlocking of long-term reserves.
     */
    function declareJubilee() external onlyOwner {
        require(block.timestamp >= lastJubileeTimestamp + JUBILEE_CYCLE, "Jubilee time not yet come");
        
        // Logic to reset state, forgive internal debts, or unlock generational vaults would go here.
        lastJubileeTimestamp = block.timestamp;
        
        emit JubileeDeclared(block.timestamp);
    }

    // Allow contract to receive PLS
    receive() external payable {}
}
