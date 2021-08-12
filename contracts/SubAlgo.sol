//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract Subalgo {
  string name;
  string lastname;

  constructor(string memory _name) {
    console.log("Deploying a Greeter with greeting:", _name);
    name = _name;
    lastname = "default lastname";
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function setName(string memory _name) public {
    console.log("Changing name from '%s' to '%s'", name, _name);
    name = _name;
  }

  function getLastname() public view returns (string memory) {
    return lastname;
  }

  function setLastname(string memory _lastname) public {
    console.log("Changing name from '%s' to '%s'", lastname, _lastname);
    lastname = _lastname;
  }
}