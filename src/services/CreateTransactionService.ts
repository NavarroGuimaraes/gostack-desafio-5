import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private OUTCOME_TYPE = 'outcome';

  private INCOME_TYPE = 'income';

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === this.OUTCOME_TYPE) {
      const actualBalance = this.transactionsRepository.getBalance();
      if (actualBalance.total - value < 0) {
        throw Error(
          'The value is below zero, therefore your outcome cannot be executed',
        );
      }
    } else if (!(type === this.INCOME_TYPE)) {
      // if it's here, then it's not outcome
      // so it must be income, therefore if it's not income, its wrong!
      throw Error('The type must be only outcome or income');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
