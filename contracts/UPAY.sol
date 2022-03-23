// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract UPAY {
    address[] allAddress;
     struct transaction{
        address from;
        address to;
        uint256 time;
        uint256 balance;
    }
    struct userDetails {
        address Address;
        string Name;
        uint256 balance;
        bool isAvailabe;
        uint256 totalTransaction;
    }

    transaction[] transaction_history;
   
    mapping(address => userDetails) users;

    function getMyDetails() public view returns (userDetails memory) {
        return users[msg.sender];
    }

    function sendBalance(address Address, uint256 balance,uint256 time) public {
        if (users[Address].isAvailabe) {
            if (
                users[msg.sender].isAvailabe &&
                users[msg.sender].balance >= balance
                
            ) {
                users[msg.sender].balance = users[msg.sender].balance - balance;
                users[Address].balance = users[Address].balance + balance;
                users[Address].totalTransaction++;
                users[msg.sender].totalTransaction++;
                transaction memory th = transaction(msg.sender,Address,time,balance);
                transaction_history.push(th);
               
            }
        }
    }

    function myBalance() public view returns (uint256) {
        return users[msg.sender].balance;
    }

    function createAccount(string memory _name) public {
        if (users[msg.sender].isAvailabe) {
            return;
        }
        userDetails memory details = userDetails(msg.sender, _name, 20, true,0);
        users[msg.sender] = details;
        allAddress.push(msg.sender);
    }

    function getAllAdress() public view returns (address[] memory) {
        return allAddress;
    }

    function getMyName() public view returns (string memory) {
        return users[msg.sender].Name;
    }
     function getMyAddress() public view returns (address) {
        return msg.sender;
    }


    function doIHaveAccount() public view returns (bool){
        return users[msg.sender].isAvailabe;
    }


    function getMyTransactionHistory() public view returns(transaction[] memory){
        transaction[] memory ret = new transaction[](users[msg.sender].totalTransaction);
        for(uint256 i = 0;i<transaction_history.length;i++){
            if(transaction_history[i].from==msg.sender || transaction_history[i].to==msg.sender){
                ret[i]=(transaction_history[i]);
            }
        }

        return ret;
    }


}
