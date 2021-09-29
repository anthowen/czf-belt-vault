//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// This contract allows beltBnb to be exchanged 1:1 for CzfBeltVault.
// BELT rewards harvested will be transferred to a CZF->BELT pool.
// By also adding a CZF/BNB farm to app.czodiac.com, the circle is complete. BELT can be earned and reinvested without causing any dumps on either CZF or BELT and thus being beneficial to both.
/* Useful values:
BSC beltBNB: 0xa8bb71facdd46445644c277f9499dd22f6f0a30c
BSC beltFarm: 0xd4bbc80b9b102b77b21a06cb77e954049605e6c1
BSC BELT: 0xe0e514c71282b6f4e823703a39374cf58dc3ea4f
beltBNB _pid on beltFarm: 6
*/

interface IBeltFarm {
    function deposit(uint256 _pid, uint256 _wantAmt) external;

    function withdraw(uint256 _pid, uint256 _wantAmt) external;

    function withdrawAll(uint256 _pid) external;
}


contract CzfBeltVault is ERC20, Ownable, ReentrancyGuard {
    // address private beltFarm = 0xD4BbC80b9B102b77B21A06cb77E954049605E6c1;
    // address private beltBNB = 0xa8Bb71facdd46445644C277F9499Dd22f6F0A30C;

    IBeltFarm public beltFarm;
    IERC20 public beltBNB;

    uint256 private constant BELT_POOL_ID = 6;

    event Deposit(address _for, uint256 _pid, uint256 _amt);
    event Withdraw(address _for, uint256 _pid, uint256 _amt);

    constructor(address _beltFarm, address _beltBNB) ERC20("CzfBeltVault", "CzfBeltVault") {
        beltFarm = IBeltFarm(_beltFarm);
        beltBNB = IERC20(_beltBNB);
    }

    
    // 1) Stakes _wad beltBnb to beltFarm
    // 2) Transfers _wad beltBnb from msg.sender
    // 3) Mints _wad of CzfBeltVault to _for
    //NOTE: This contract must be approved for beltBNB first.
    function deposit(address _for, uint _wad) external nonReentrant {
        _safeTransferFrom(beltBNB, msg.sender, address(this), _wad);
        beltFarm.deposit(BELT_POOL_ID, _wad);

        _mint(_for, _wad);

        emit Deposit(msg.sender, BELT_POOL_ID, _wad);
    }

    //1) Burns _wad CzfBeltVault from msg.sender.
    //2) Unstakes _wad beltBnb from beltFarm
    //3) Transfers _wad beltBNB from self to _for.
    //NOTE: This contract must be approved for CzfBeltVault first.
    function withdraw(address _for, uint _wad) external {
        _burn(_for, _wad);

        beltFarm.withdraw(BELT_POOL_ID, _wad);
        beltBNB.transfer(_for, _wad);

        emit Withdraw(msg.sender, BELT_POOL_ID, _wad);
    }

    //1) Harvests BELT from beltFarm.
    //2) Transfers all BELT in this contract to _pool
    //NOTE: This can only be called by owner.
    function harvest(address _pool) external onlyOwner {
        beltFarm.withdrawAll(BELT_POOL_ID);

        beltBNB.transfer(_pool, beltBNB.balanceOf(address(this)));
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}
