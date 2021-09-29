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
  let ownerAddress, traderAddress, transferAddress1, transferAddress2;

  before(async function () {
    [ownerAddress, traderAddress, transferAddress1, transferAddress2] =
      await ethers.getSigners();

    const CzfBeltVault = await ethers.getContractFactory("CzfBeltVault");
    czfBeltVault = await CzfBeltVault.deploy(beltFarm, beltBNB, beltPoolId);

    await czfBeltVault.deployed();
  });

  // - For deposit, withdraw make sure the quantity of beltBNB deposited/withdrawn is equal to the amount of czfVaultBNB minted/burned. Also make sure that _for receives the tokens while the msg.sender sends/burns the tokens.

  describe("CzfBeltVault", function () {
    it("Should correctly deposit the token", async function () {
      // make sure the quantity of beltBNB deposited/withdrawn is equal to the amount of CzfBeltVault minted/burned. Also make sure that _for receives the tokens while the msg.sender sends/burns the tokens.

      const amount = parseEther("100000000000000000");

      await czfBeltVault.deposit(transferAddress1, amount);

      const czfBeltVaultBalance = await czfBeltVault.balanceOf(
        transferAddress1
      );

      expect(czfBeltVaultBalance).to.eq(amount);

      // const totalSupply = await czodiacToken1.totalSupply();
      // const contractBalance = await czodiacToken1.balanceOf(
      //   czodiacToken1.address
      // );
      // const ownerBalance = await czodiacToken1.balanceOf(ownerAddress.address);
      // expect(contractBalance).to.equal(0, "Contract should hold 0 tokens.");
      // expect(ownerBalance).to.equal(
      //   totalSupply,
      //   "Owner should hold full supply."
      // );
      // expect(totalSupply).to.equal(
      //   parseEther("8000000000000"),
      //   "Total supply should be 8 trillion * 10**18."
      // );
    });
  });
});
