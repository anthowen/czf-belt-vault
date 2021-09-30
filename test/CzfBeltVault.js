// SPDX-License-Identifier: GPL-3.0

const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

const { ethers, config } = require("hardhat");
const { time } = require("@openzeppelin/test-helpers");
// const { toNum, toBN } = require("./utils/bignumberConverter");

const { beltBNB, beltPoolId, beltFarm, BELT } = require("../deployConfig.json");

const { expect } = chai;
const { parseEther, formatEther } = ethers.utils;

describe("CzfBeltVault", function () {
  let czfBeltVault;
  let beltBNBContract;
  let beltFarmContract;
  let ownerAddress, traderAddress, transferAddress1, transferAddress2;

  before(async function () {
    [ownerAddress, traderAddress, transferAddress1, transferAddress2] =
      await ethers.getSigners();

    const CzfBeltVault = await ethers.getContractFactory("CzfBeltVault");
    czfBeltVault = await CzfBeltVault.deploy(beltFarm, beltBNB, beltPoolId);

    await czfBeltVault.deployed();

    beltBNBContract = await ethers.getContractAt("IBeltMultiStrategyToken", beltBNB);
    // beltFarmContract = await ethers.getContractAt("IBeltMultiStrategyToken", beltFarm);
  });

  // - For deposit, withdraw make sure the quantity of beltBNB deposited/withdrawn is equal to the amount of czfVaultBNB minted/burned. Also make sure that _for receives the tokens while the msg.sender sends/burns the tokens.

  describe("Deposit", function () {
    it("Should correctly deposit the token", async function () {
      // make sure the quantity of beltBNB deposited/withdrawn is equal to the amount of CzfBeltVault minted/burned. Also make sure that _for receives the tokens while the msg.sender sends/burns the tokens.

      // First, you need to import the IBeltMultiStrategyToken I linked earlier - here it is again in case you missed it.
      // Then, you connect to it using ethers with the addrss on the BSC chain.
      // Next, you deposit BNB into that contract by calling the depositBNB method.
      // That will get you the beltBNB BEP20 tokens you need for the tests - then its just a matter of using .balanceOf to check the beltBNB and BELT balances. You should also carefully consider edge cases (people sending invalid values, 0 values, calling from accounts that dont hold any tokens) and check that the contract behaves correct and reverts.


      const amount = parseEther("1.0");
      const depositAmount = amount.div(2);

      const connected = beltBNBContract.connect(traderAddress);
      await connected.depositBNB(0, {
        value: parseEther("0.05")
      });

      expect(depositAmount).to.equal(parseEther("0.5"))

      console.log('beltBnb', await beltBNBContract.balanceOf(traderAddress.address));

      // const depositCall = await czfBeltVault.connect(traderAddress).deposit(transferAddress1.address, depositAmount);

      // expect(depositCall)
      // .to.emit(czfBeltVault, "Deposit")
      // .withArgs(transferAddress1.address, beltPoolId, depositAmount);

      // const czfBeltVaultBalance = await czfBeltVault.balanceOf(
      //   transferAddress1
      // );

      // expect(czfBeltVaultBalance).to.eq(depositAmount, "The correct amount of CzfBeltVault is deposited");

      // const beltBNBBalance = await beltBNBContract.balanceOf(transferAddress1);

      // console.log({ beltBNBBalance });

      // expect(czfBeltVaultBalance).to.eq(amount);

      
    });
  });
});
