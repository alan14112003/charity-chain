export const BankTransferRegistry = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "accountNumber",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "bankName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "accountHolder",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "programCode",
                "type": "string"
            }
        ],
        "name": "TransferAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "accountNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bankName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "accountHolder",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "programCode",
                "type": "string"
            }
        ],
        "name": "addTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "accountNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bankName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "accountHolder",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "programCode",
                "type": "string"
            }
        ],
        "name": "filterTransfers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "accountNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bankName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "accountHolder",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "programCode",
                        "type": "string"
                    }
                ],
                "internalType": "struct BankTransferRegistry.TransferInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTransfers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "accountNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "bankName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "accountHolder",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "programCode",
                        "type": "string"
                    }
                ],
                "internalType": "struct BankTransferRegistry.TransferInfo[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]