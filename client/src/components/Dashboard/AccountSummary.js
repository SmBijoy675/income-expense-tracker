import React from "react";
const AccountSummary = ({ accounts }) => {
  // console.log(accounts);

  const transactions = accounts?.map((acc) => {
    return acc.transactions;
  });
  const initialBalances = accounts?.map((acc) => {
    return acc.initialBalance;
  });

  const totalInitialBalance = initialBalances?.reduce(
    (sum, balance) => sum + balance,
    0
  );

  // console.log(transactions);
  const incomeSum = transactions?.flat()?.reduce((sum, obj) => {
    // return obj.transactionType === "Income" ? sum + obj.amount : sum;
    if (obj.transactionType === "Income") {
      return sum + obj.amount;
    } else {
      return sum;
    }
  }, 0);

  const expenseSum = transactions?.flat()?.reduce((sum, obj) => {
    return obj.transactionType === "Expenses" ? sum + obj.amount : sum;
  }, 0);

  const totalIncome = incomeSum + totalInitialBalance;

  // const expenseCount = transactions?.flat()?.reduce((count, obj) => {
  //   return obj.transactionType === "Expenses" ? count + 1 : count;
  // }, 0);

  // console.log(expenseCount);

  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h3 className="mb-4 text-3xl md:text-4xl leading-tight text-coolGray-900 font-bold tracking-tighter">
          Total Income/Expenses of All Accounts
        </h3>
        <p className="text-lg md:text-xl text-coolGray-500 font-medium">
          Summary of all your accounts in one place.
        </p>
      </div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Total Income
                    </h3>
                  </div>
                  <div className="w-auto p-2"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-green-600 tracking-tighter">
                      $ {totalIncome}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Total Expense
                    </h3>
                  </div>
                  <div className="w-auto p-2"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-red-700 tracking-tighter">
                      $ {expenseSum}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-sm text-coolGray-500 font-medium">
                      Balance
                    </h3>
                  </div>
                  <div className="w-auto p-2"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-blue-800 tracking-tighter">
                      $ {totalIncome - expenseSum}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountSummary;
