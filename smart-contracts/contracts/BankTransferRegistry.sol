// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BankTransferRegistry {
    struct TransferInfo {
        string name;
        uint256 amount;
        string programCode;
    }

    TransferInfo[] private transfers;

    // Thêm thông tin chuyển khoản
    function addTransfer(
        string memory name,
        uint256 amount,
        string memory programCode
    ) public {
        transfers.push(
            TransferInfo({name: name, amount: amount, programCode: programCode})
        );
    }

    // Lấy toàn bộ danh sách
    function getAllTransfers() public view returns (TransferInfo[] memory) {
        return transfers;
    }

    // Lọc theo nhiều điều kiện (có thể bỏ qua bất kỳ điều kiện nào bằng cách truyền "")
    function filterTransfers(
        string memory name,
        uint256 amount,
        string memory programCode
    ) public view returns (TransferInfo[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < transfers.length; i++) {
            if (_match(transfers[i], name, amount, programCode)) {
                count++;
            }
        }

        TransferInfo[] memory result = new TransferInfo[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < transfers.length; i++) {
            if (_match(transfers[i], name, amount, programCode)) {
                result[index] = transfers[i];
                index++;
            }
        }

        return result;
    }

    // Hàm nội bộ để so sánh có điều kiện
    function _match(
        TransferInfo memory t,
        string memory name,
        uint256 amount,
        string memory programCode
    ) internal pure returns (bool) {
        if (
            bytes(name).length > 0 &&
            keccak256(abi.encodePacked(t.name)) !=
            keccak256(abi.encodePacked(name))
        ) {
            return false;
        }
        if (amount > 0 && t.amount != amount) {
            return false;
        }
        if (
            bytes(programCode).length > 0 &&
            keccak256(abi.encodePacked(t.programCode)) !=
            keccak256(abi.encodePacked(programCode))
        ) {
            return false;
        }
        return true;
    }
}
