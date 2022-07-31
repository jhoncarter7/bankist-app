
 
 const account1 = {
        owner: 'Nikhil rai',
        movements: [200, 600, -300, 1000, -500, 100],
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

const loginbtn = document.querySelector('.login-btn');
const hide = document.querySelector('.hide');


/////////////////////////////////////////////////////////////////////////
loginbtn.addEventListener('click', function(e){
    console.log(loginbtn)
    e.preventDefault();
  hide.style.opacity = 100;
})