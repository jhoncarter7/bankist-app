

const account1 = {
    owner: 'Nikhil rai',
    movements: [200, 600, -300.78, 10000, -500, 10000, 200.64, 600],
    pin: 1111,
    interest: 2, /* % */
    movementsDates: [
        '2022-01-28T09:15:04.904Z',
        '2022-08-01T10:17:24.185Z',
        '2022-05-27T17:01:17.194Z',
        '2022-07-11T23:36:17.929Z',
        '2022-03-18T21:31:17.178Z',
        '2022-07-23T07:42:02.383Z',
        '2021-03-08T14:11:59.604Z',
        '2021-03-12T10:51:36.790Z',
    ],
    currency: 'USD',
    locale: ['en-US']


}
const account2 = {
    owner: 'Aditya singh',
    movements: [30000.3, 6000.9, -1500, 10000, -5000, 15000, 10000, 100.5],
    pin: 2222,
    interest: 2.5,  /* % */
    movementsDates: [
        '2022-08-05T14:18:46.235Z',
        '2022-02-05T16:33:06.386Z',
        '2022-03-10T14:43:26.374Z',
        '2022-04-25T18:49:59.371Z',
        '2022-02-01T13:15:33.035Z',
        '2022-03-30T09:48:16.867Z',
        '2022-04-25T06:04:23.907Z',
        '2021-02-26T12:01:20.894Z',
    ],
    currency: 'EUR',
    locale: ['en-UK']
}
const account3 = {
    owner: 'modi ji',
    movements: [400, 7000, -2000.1, 300, -500, 900, 1000, 100.5],
    pin: 3333,
    interest: 1.2,  /* % */
    movementsDates: [
        '2022-03-25T17:18:46.235Z',
        '2022-02-05T14:33:06.386Z',
        '2022-01-10T19:43:26.374Z',
        '2022-07-25T12:49:59.371Z',
        '2022-04-01T13:15:33.035Z',
        '2022-08-05T09:48:16.867Z',
        '2022-02-25T06:02:23.907Z',
        '2021-09-26T12:01:20.894Z',
    ],
    currency: 'INR',
    locale: ['hi-IN']
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
const date = document.querySelector('.date');
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
const logedoutTimer = document.querySelector('.logedout-timer span');
const sortBtn = document.querySelector('.sort-btn');
// const userPass = document.querySelector('.user');


/////////////////////////////////////////////////////////////////////////

//  formating date
const formatDate = function (date, locale) {
    console.log(date)
    const calcDayPassed = (date1, date2) => Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)))

    console.log(new Date());
    const dayPassed = calcDayPassed(new Date(), date);
    console.log(dayPassed)
    if (dayPassed === 0) return 'Today';
    if (dayPassed === 1) return 'yestarday';
    if (dayPassed <= 7) return `${dayPassed} day ago`;

    return new Intl.DateTimeFormat(locale).format(date);

}

const currentCurrency = function (value, locale, currency) {
    
   return Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value)
}



// display balance summery
const displaySummary = function (currentAccount, sort = false) {
    containerUserDetails.innerHTML = '';
    const sorting = sort ? currentAccount.movements.slice().sort((a, b) => a - b) : currentAccount.movements

    sorting.forEach(function (mov, i) {
        const options = mov > 0 ? 'deposits' : 'withdraws'
const formatedMov = currentCurrency(mov, currentAccount.locale, currentAccount.currency)
         

        let printDate = '';
        if (currentAccount.movementsDates) {
            const date = new Date(currentAccount.movementsDates[i])
            console.log(date)
            printDate = formatDate(date, currentAccount.locale);
        }
        const html =
            ` <div class="user-data">
           <p class="user-type user-${options}">${i + 1} ${options} </p>
           <p class="deposite-date">${printDate}</p>
           <p class="user-deposite-money"> ${formatedMov}</p>
           </div>
        `;
        containerUserDetails.insertAdjacentHTML('afterbegin', html)

    })

}





//    Real balance in account
const displayBlance = function (acc) {

    acc.balance = currentAccount.movements
        .reduce((curr, mov) => curr + mov)

    totalBalance.innerHTML = currentCurrency(acc.balance, acc.locale, acc.currency);

    const userName = currentAccount.owner;

    heading.innerHTML = `Welcome back, ${userName}`



    // date below current balance and name
    const now = new Date()
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    date.innerHTML = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

}





// 

const dipoWithdrawIntr = function (acc) {
    const deposit = acc.movements
        .filter(mov => mov > 0)
        .reduce((curr, mov) => curr + mov, 0);

    totalIn.innerHTML =  currentCurrency(deposit, acc.locale, acc.currency);

    const withdraw = acc.movements.filter(mov => mov < 0)
        .reduce((curr, mov) => curr + mov, 0)
    totalOut.innerHTML = currentCurrency(withdraw, acc.locale, acc.currency);

    const interestValue = acc.interest;
    const interest = acc.movements
        .map(mov => (mov * interestValue) / 100)
        .filter(mov => mov > 0)
        .reduce((curr, mov) => curr + mov)

    interestMoney.innerHTML = currentCurrency(interest, acc.locale, acc.currency);
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
const startlogedoutTimer = function(){

    let timer = 8 * 60;
    const tick = function() { 
        let min = String(Math.trunc(timer / 60)).padStart(2, 0)
        let sec = String(Math.trunc(timer % 60)).padStart(2, 0)
        logedoutTimer.innerHTML = `${min}: ${sec}`;
       
    
        if (timer === 0){
            clearInterval(timeInterval)
            hide.style.opacity = 0;
            heading.innerHTML = 'Login to get started';
            }
            // decresing
            timer--
        } 
            
           
      tick()      
   const timeInterval = setInterval(tick ,1000);
   return timer;
}



let currentAccount;
let timer
// login btn of nav
loginbtn.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc =>
        acc.userName === userNames.value
    );
    if (currentAccount.pin == userPass.value) {
        hide.style.opacity = 100;
        balanceHeading.innerHTML = currentAccount.owner + ",  your current balance =>"
        userPass.value = userNames.value = '';

   
         if(timer) clearInterval(timer);
        timer = startlogedoutTimer()
    


        updateUI(currentAccount)
    }
    


})

// loan money section
loanBtn.addEventListener('click', function (e) {
    e.preventDefault()

    const loanMoney = +(loanAmount.value);

    loanAmount.value = '';

    if (loanMoney > 0) {
        currentAccount.movements.push(loanMoney);
        currentAccount.movementsDates.push(new Date())
    }
    clearInterval(timer)
        timer = startlogedoutTimer()
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
        reciverAccount.movementsDates.push(new Date())
        currentAccount.movementsDates.push(new Date())
        reciverAccount.movements.push(money)
        currentAccount.movements.push(-money)

        clearInterval(timer)
        timer = startlogedoutTimer()
        updateUI(currentAccount)

    }

})



// close account 
closeAccountBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (currentAccount.userName === closeAccountUserName.value &&
        currentAccount.pin === +closeAccountPass.value) {
        // console.log("ok")

        const index = accounts.findIndex(acc => acc.userName === currentAccount.userName)
        accounts.splice(index, 1)
        hide.style.opacity = 0;
    }
    closeAccountUserName.value = closeAccountPass.value = '';

})

// sorting the balance summery
let sorted = false;
sortBtn.addEventListener('click', function (e) {
    e.preventDefault();
    displaySummary(currentAccount, !sorted)
    sorted = !sorted;


    clearInterval(timer)
        timer = startlogedoutTimer()
})




// setInterval(()=> {
//     const now = new Date();
//     // const hour = now.gethour
//     // const min = now.getminute
//     // const sec = now.getsecond
//     // const times = `${hour}:${min}:${sec}`

//    const options = {
//     hour: 'numeric',
//     minute: 'numeric',
//         second: 'numeric'
//     }
//     console.log(new Intl.DateTimeFormat('en-IN', options).format(now))
// }, 1000)