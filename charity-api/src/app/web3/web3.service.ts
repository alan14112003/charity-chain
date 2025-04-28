// contract.service.ts
import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { BankTransferRegistry } from './contractABI';
import { ConfigService } from '@nestjs/config';
import { AddTransactionDto } from './dto/add-transaction.dto';

@Injectable()
export class Web3Service {
  private web3: Web3;
  private contract: any;
  private contractAddress: string;

  constructor(private configService: ConfigService) {
    const web3URL = this.configService.get<string>('WEB3_URL');
    this.contractAddress =
      this.configService.get<string>('CONTRACT_ADDRESS') ?? '';

    this.web3 = new Web3(web3URL);
    this.contract = new this.web3.eth.Contract(
      BankTransferRegistry,
      this.contractAddress,
    );
  }

  // Gọi phương thức addTransfer
  async addTransfer(addTransactionDto: AddTransactionDto) {
    const accounts = await this.web3.eth.getAccounts();
    const sender = accounts[0];

    const gasEstimate = await this.contract.methods
      .addTransfer(
        addTransactionDto.name,
        addTransactionDto.amount,
        addTransactionDto.programCode,
      )
      .estimateGas({ from: sender });

    const data = await this.contract.methods
      .addTransfer(
        addTransactionDto.name,
        addTransactionDto.amount,
        addTransactionDto.programCode,
      )
      .send({ from: sender, gas: gasEstimate });
  }

  // Gọi phương thức filterTransfers
  async filterTransfers(
    name: string | undefined,
    amount: number | undefined,
    programCode: string | undefined,
  ) {
    try {
      // Kiểm tra và thay thế giá trị undefined hoặc null bằng chuỗi rỗng hoặc 0
      name = name ?? '';
      amount = amount ?? 0;
      programCode = programCode ?? '';

      // Gọi phương thức filterTransfers từ hợp đồng thông minh
      const result = await this.contract.methods
        .filterTransfers(name, amount, programCode)
        .call();

      return result; // Trả về kết quả lọc
    } catch (error) {
      throw new Error(`Failed to filter transfers: ${error.message}`);
    }
  }

  // Gọi phương thức getAllTransfers
  async getAllTransfers() {
    return this.contract.methods.getAllTransfers().call();
  }
}
