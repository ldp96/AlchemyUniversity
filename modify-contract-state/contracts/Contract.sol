//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IContract {
    function attempt() external;
}

contract Winner {

    function win(address contractAddress) public {
        IContract(contractAddress).attempt();
    }
}