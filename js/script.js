'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
	btnPlus = document.getElementsByTagName('button'),
	incomePlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	depositCheck = document.querySelector('#deposit-check'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	accumulatedMonthValue = document.getElementsByClassName('additional_income-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_expenses-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-item')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeItems = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpenses = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    leftInput = document.querySelectorAll('.data input');


    class AppData{
        constructor(budget, budgetDay, budgetMonth, income, incomeMonth, addIncome, expenses, expensesMonth, addExpenses, deposit, percentDeposit, moneyDeposit){
            this.budget = budget;
            this.budgetDay = budgetDay;
            this.budgetMonth = budgetMonth;
            this.income = income;
            this.incomeMonth = incomeMonth;
            this.addIncome = addIncome;
            this.expenses = expenses;
            this.expensesMonth = expensesMonth;
            this.addExpenses = addExpenses;
            this.deposit = deposit;
            this.percentDeposit = percentDeposit;
            this.moneyDeposit = moneyDeposit;
        }
    
        start(){
            if(salaryAmount.value === ''){
                return event.preventDefault();
            };
    
    
            for(let i = 0; i < leftInput.length; i++){
                leftInput[i].setAttribute("disabled", true);
            };
            start.style.display = 'none';
            cancel.style.display = 'block';
    
            this.budget = +salaryAmount.value;
    
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
    
            this.showResult();
        }
        cancel(){
            for(let i = 0; i < leftInput.length; i++){
                leftInput[i].removeAttribute("disabled");
                leftInput[i].value = "";
            };
            start.style.display = 'block';
            cancel.style.display = 'none';
    
            periodSelect.value = 1;
            appData.changePeriod();
    
            let rughtInput = document.querySelectorAll('.result-total');
    
            for (let y = 0; y < rughtInput.length; y++) {
                rughtInput[y].value = '';
            };
        }
        addExpensesBlock(){
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
    
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, this);
            expensesItems = document.querySelectorAll('.expenses-items');
    
            if (expensesItems.length === 3) {
                this.style.display = 'none';
            };
        }
        addIncomeBlock(){
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
    
            incomeItem[0].parentNode.insertBefore(cloneIncomeItems, this);
            incomeItem = document.querySelectorAll('.income-items');
    
            if (incomeItem.length === 3){
                this.style.display = 'none'
            };
        }
        getExpenses(){
            expensesItems.forEach((item) => {
                let itemExpenses = item.querySelector('.expenses-title').value,
                    cashExpenses = item.querySelector('.expenses-amount').value;
    
                if (itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = cashExpenses;
                };
            });
        }
        getIncome(){
            incomeItems.forEach(function(item) {
                let itemIncome = item.querySelector('.income-title').value,
                    cashIncome = item.querySelector('.income-amount').value;
    
                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                };
            });
        }
        getAddExpenses(){
            let addExpenses = additionalExpensesItem.value.split(',');
    
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    appData.addExpenses.push(item);
                };
            });
        }
        getAddIncome(){
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
    
                if (itemValue !== ''){
                    appData.addIncome.push(itemValue);
                };
            });
        }
        showResult(){
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
           // additionalIncomeValue.value = this.addExpenses.join(', ');
            //accumulatedMonthValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
    
            periodSelect.addEventListener('mousemove', appData.calcPeriod());
        }
        getExpensesMonth(){
            for(let key in this.expenses){
                this.expensesMonth +=  +this.expenses[key];
            };
        }
        getBudget(){
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = this.budgetMonth / 30;
        }
        getTargetMonth(){
            return targetAmount.value / this.budgetMonth;
        }
        getStatusIncome(){
            if(this.budgetDay > 800){
                return ('Высокий уровень дохода');
            }else if(this.budgetDay > 300){
                return ('Средний уровень дохода');
            }else if(this.budgetDay > 0){
                return ('Низкий уровень дохода');
            }else{
                return ('Что-то пошло не так');
            };
        }
        calcPeriod(){
            incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        }
        changePeriod(){
            periodAmount.innerHTML = periodSelect.value;
        }
    }

let appData = new AppData();

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.cancel);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('mousemove', appData.changePeriod);