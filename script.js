

const account1 = {
    owner: 'Nikhil rai',
    movements: [200, 600, -300, 1000, -500, 100, 200, 600, -300, 1000, 100, 200, 600, -300, 1000, -500, 100],
    pin: 1111,
    interest: 2  /* % */

}
const account2 = {
    owner: 'Aditya singh',
    movements: [3000, 6000, -1500, 10000, -5000, 150],
    pin: 2222,
    interest: 2.5  /* % */

}
const account3 = {
    owner: 'modi ji',
    movements: [400, 7000, -2000, 300, -500, 900],
    pin: 3333,
    interest: 1.2  /* % */

}





const accounts = [account1, account2, account3]

//////////////////////////////////////////////////////////////
const heading = document.querySelector('.heading');
const toplogo = document.querySelector('.top-log');
const userNames = document.querySelector('.username');
const userPass = document.querySelector('.user-pass');
const loginbtn = document.querySelector('.login-btn');
const hide = document.querySelector('.hide');
const app = document.querySelector('.app');
const balanceHeading = document.querySelector('.balance-heading');
const totalBalance = document.querySelector('.total-balance');
const containerUserDetails = document.querySelector('.user-details')
const userAction = document.querySelector('.user-action');
const userDeposite = document.querySelector('.user-deposite');
const depositeDate = document.querySelector('.deposite-date');
const userDepositeMoney = document.querySelector('.user-deposite-money');
const depositing = document.querySelector('.in');
const totalIn = document.querySelector('.total-in');
const totalOut = document.querySelector('.total-out');
const interest = document.querySelector('.interest');
const interestMoney = document.querySelector('.interest-money');
const transfermoneyuserName = document.querySelector('.transfer-money-userName');
const transferMoneyAmount = document.querySelector('.transfer-money-amount');
const transferBtn = document.querySelector('.transfer-btn');
const loanAmount = document.querySelector('.loan-amount');
const loanBtn = document.querySelector('.loan-btn');
const closeAccountUserName = document.querySelector('.close-account-userName');
const closeAccountPass = document.querySelector('.close-account-pass');
const closeAccountBtn = document.querySelector('.close-account-btn');
const loggedoutTimer = document.querySelector('.loggedout-timer');
// const userPass = document.querySelector('.user');


/////////////////////////////////////////////////////////////////////////

const displaySummary = function (currentAccount) {
    containerUserDetails.innerHTML = '';

    currentAccount.movements.forEach(function (mov, i) {
        const options = mov > 0 ? 'deposits' : 'withdraws'
        const html =
            ` <div class="user-data">
           <p class="user-type user-${options}">${i + 1} ${options} </p>
           <p class="deposite-date">27/07/20022</p>
           <p class="user-deposite-money">Rs ${mov}</p>
           </div>
        `;
        containerUserDetails.insertAdjacentHTML('afterbegin', html)

    })

}





//    Real balance in account
const displayBlance = function (acc) {

    acc.balance = currentAccount.movements
        .reduce((curr, mov) => curr + mov)

    totalBalance.innerHTML = `Rs: ${acc.balance}`;

    const userName = currentAccount.owner;

    heading.innerHTML = `Welcome back, ${userName}`

}




const dipoWithdrawIntr = function (acc) {
    const deposit = acc.movements
        .filter(mov => mov > 0)
        .reduce((curr, mov) => curr + mov, 0);

    totalIn.innerHTML = `${deposit} `



    const withdraw = acc.movements.filter(mov => mov < 0)
        .reduce((curr, mov) => curr + mov, 0)
    totalOut.innerHTML = `${withdraw} `

    totalOut.innerHTML = `${withdraw}`
    const interestValue = acc.interest;
    const interest = acc.movements
        .map(mov => (mov * interestValue)/100)
        .filter(mov => mov > 0)
        .reduce((curr, mov) => curr + mov)

    interestMoney.innerHTML = `Rs: ${(interest)}`
}



// username and pin created
const creatUserName = function (accs) {
    accs.forEach(acc => {
        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('')
    });

}
creatUserName(accounts);


const updateUI = function (currentAccount) {
    displaySummary(currentAccount)
    displayBlance(currentAccount)
    dipoWithdrawIntr(currentAccount)

}


let currentAccount;

// login btn of nav
loginbtn.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc =>
        acc.userName === userNames.value
    );
    console.log(currentAccount);
    if (currentAccount.pin == userPass.value) {
        hide.style.opacity = 100;
        balanceHeading.innerHTML = currentAccount.owner + ",  your current balance =>"
        userPass.value = userNames.value = '';
        updateUI(currentAccount)
    }

})


loanBtn.addEventListener('click', function (e) {
    e.preventDefault()

    const loanMoney = Number(loanAmount.value);

    loanAmount.value = '';

    If(loanMoney > 0)
    {

        currentAccount.movements.push(loanMoney);
    }
    updateUI(currentAccount)

}
)


// Transfer Money
transferBtn.addEventListener('click', function (e) {
    e.preventDefault()
    const reciverAccount = accounts.find(acc => acc.userName == transfermoneyuserName.value);

    const money = Number(transferMoneyAmount.value);
    transfermoneyuserName.value = transferMoneyAmount.value = '';

    if (money > 0 &&
        reciverAccount?.userName !== currentAccount.userName &&
        currentAccount.balance >= money
    ) {

        reciverAccount.movements.push(money)
        currentAccount.movements.push(-money)
        updateUI(currentAccount)
    }

})



// close account 
closeAccountBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentAccount.userName === closeAccountUserName.value &&
        currentAccount.pin === Number(closeAccountPass.value)) {
        // console.log("ok")

        const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
        accounts.splice(index, 1)
        hide.style.opacity = 0;
    }
    closeAccountUserName.value = closeAccountPass.value = '';

})