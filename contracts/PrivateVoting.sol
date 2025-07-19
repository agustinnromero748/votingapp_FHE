// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PrivateVoting {
    // Зашифрованные суммы голосов
    bytes32 public encryptedYesTotal;
    bytes32 public encryptedNoTotal;

    constructor() {
        encryptedYesTotal = bytes32(0);
        encryptedNoTotal = bytes32(0);
    }

    // Пользователь голосует: encryptedVote — это 0 (No) или 1 (Yes), зашифрованный
    function vote(bytes32 encryptedVote) public {
        // Условно: если значение больше 0 → Yes, иначе → No
        if (uint256(encryptedVote) > 0) {
            encryptedYesTotal = add(encryptedYesTotal, encryptedVote);
        } else {
            encryptedNoTotal = add(encryptedNoTotal, encryptedVote);
        }
    }

    // Вспомогательная функция сложения
    function add(bytes32 a, bytes32 b) internal pure returns (bytes32) {
        return bytes32(uint256(a) + uint256(b));
    }

    // Получить текущие encrypted-счётчики
    function getResults() external view returns (bytes32 yes, bytes32 no) {
        return (encryptedYesTotal, encryptedNoTotal);
    }
}
