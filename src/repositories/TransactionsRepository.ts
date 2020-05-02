import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private INCOME_TYPE = 'income';

  private OUTCOME_TYPE = 'outcome';

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    // O trecho abaixo está comentado pois fiz apenas para aprendizado
    // // Com filter e reduce
    // income = this.transactions
    //   .filter(t => t.type === this.INCOME_TYPE)
    //   .reduce((accumulator, transaction) => accumulator + transaction.value, 0);

    // outcome = this.transactions
    //   .filter(t => t.type === this.OUTCOME_TYPE)
    //   .reduce((accumulator, transaction) => accumulator + transaction.value, 0);

    // Com apenas um for each
    this.transactions.forEach(transaction => {
      if (transaction.type === this.INCOME_TYPE) {
        income += transaction.value;
      } else if (transaction.type === this.OUTCOME_TYPE) {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;
    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
