pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract Subalgo {
  string name;
  string lastname;

  constructor(string memory _param) {
    console.log("Deploying a Greeter with greeting:", _param);
    name = _param;
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function getLastname() public view returns (string memory) {
    return lastname;
  }

  function setName(string memory _name) public {
    console.log("Changing name from '%s' to '%s'", name, _name);
    name = _name;
  }

  function setLastname(string memory _lastname) public {
    console.log("Changing lastname from '%s' to '%s'", lastname, _lastname);
    lastname = _lastname;
  }
}
