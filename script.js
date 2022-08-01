
 
 const account1 = {
        owner: 'Nikhil rai',
        movements: [200, 600, -300, 1000, -500, 100, 200, 600, -300, 1000, -500, 100,  200, 600, -300, 1000, -500, 100],
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
const withdrawOut = document.querySelector('.out');
const interest = document.querySelector('.interest');
const interestMoney = document.querySelector('.interest-money');
const transfermoneyuserName = document.querySelector('.transfer-money-userName');
const transferMoneyPass = document.querySelector('.transfer-money-pass');
const transferBtn = document.querySelector('.transfer-btn');
const loanNserName = document.querySelector('.loan-userName');
const loanBtn = document.querySelector('.loan-btn');
const closeAccountUserName = document.querySelector('.close-account-userName');
const closeAccountPass = document.querySelector('.close-account-pass');
const closeAccountBtn = document.querySelector('.close-account-btn');
const loggedoutTimer = document.querySelector('.loggedout-timer');
// const userPass = document.querySelector('.user');


/////////////////////////////////////////////////////////////////////////

const displaySummary = function (account1) {
    containerUserDetails.innerHTML = '';

    account1.movements.forEach(function(mov, i){ 
        const options = mov > 0 ? 'deposits' : 'withdraws'
    const html = 
           ` <div class="user-data">
           <p class="user-type user-${options}">${i + 1} ${options} </p>
           <p class="deposite-date">27/07/20022</p>
           <p class="user-deposite-money">${mov}</p>
           </div>
        `;
        containerUserDetails.insertAdjacentHTML('afterbegin', html)
 } )
    
}
displaySummary(account1)





   














// username and pin created
const creatUserName = function(accs){
    accs.forEach(acc => {
        acc.userName = acc.owner
        .toLowerCase()
        .split(' ')
        .map((name) =>name[0])
        .join('')
    });
    console.log(accs)
}
creatUserName(accounts);




let currentAccount;

// login btn of nav
loginbtn.addEventListener('click', function(e){
    e.preventDefault();
 
    currentAccount = accounts.find(acc =>
        acc.userName === userNames.value
    );
 console.log(currentAccount);
 if(currentAccount.pin == userPass.value){
    hide.style.opacity = 100;
    
 }
})
