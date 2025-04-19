// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BankTransferRegistry {
    struct TransferInfo {
        string accountNumber;
        string bankName;
        string accountHolder;
        uint256 amount;
        string programCode;
    }

    TransferInfo[] private transfers;

    // Định nghĩa event để ghi nhận thông tin khi có giao dịch mới
    event TransferAdded(
        string accountNumber,
        string bankName,
        string accountHolder,
        uint256 amount,
        string programCode
    );

    // Thêm thông tin chuyển khoản
    function addTransfer(
        string memory accountNumber,
        string memory bankName,
        string memory accountHolder,
        uint256 amount,
        string memory programCode
    ) public {
        transfers.push(TransferInfo({
            accountNumber: accountNumber,
            bankName: bankName,
            accountHolder: accountHolder,
            amount: amount,
            programCode: programCode
        }));

        // Emit event khi có giao dịch mới
        emit TransferAdded(accountNumber, bankName, accountHolder, amount, programCode);
    }

    // Lấy toàn bộ danh sách
    function getAllTransfers() public view returns (TransferInfo[] memory) {
        return transfers;
    }

    // Lọc theo nhiều điều kiện (có thể bỏ qua bất kỳ điều kiện nào bằng cách truyền "")
    function filterTransfers(
        string memory accountNumber,
        string memory bankName,
        string memory accountHolder,
        uint256 amount,
        string memory programCode
    ) public view returns (TransferInfo[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < transfers.length; i++) {
            if (_match(transfers[i], accountNumber, bankName, accountHolder, amount, programCode)) {
                count++;
            }
        }

        TransferInfo[] memory result = new TransferInfo[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < transfers.length; i++) {
            if (_match(transfers[i], accountNumber, bankName, accountHolder, amount, programCode)) {
                result[index] = transfers[i];
                index++;
            }
        }

        return result;
    }

    // Hàm nội bộ để so sánh có điều kiện
    function _match(
        TransferInfo memory t,
        string memory accountNumber,
        string memory bankName,
        string memory accountHolder,
        uint256 amount,
        string memory programCode
    ) internal pure returns (bool) {
        if (bytes(accountNumber).length > 0 && keccak256(abi.encodePacked(t.accountNumber)) != keccak256(abi.encodePacked(accountNumber))) {
            return false;
        }
        if (bytes(bankName).length > 0 && keccak256(abi.encodePacked(t.bankName)) != keccak256(abi.encodePacked(bankName))) {
            return false;
        }
        if (bytes(accountHolder).length > 0 && keccak256(abi.encodePacked(t.accountHolder)) != keccak256(abi.encodePacked(accountHolder))) {
            return false;
        }
        if (amount > 0 && t.amount != amount) {
            return false;
        }
        if (bytes(programCode).length > 0 && keccak256(abi.encodePacked(t.programCode)) != keccak256(abi.encodePacked(programCode))) {
            return false;
        }
        return true;
    }
}
