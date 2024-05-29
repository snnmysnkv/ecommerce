
let productBtn = document.querySelectorAll('.product-card button');
let closeCart = document.querySelector('.close__cart');
let cartBtn = document.querySelector('.cartBtn');
let sliderSrcArr = ['assets/img/person1.png', 'assets/img/person2.png'];
let personImg = document.querySelector('.person img');
let ind = 0
setInterval(() => {
    ind++;
    if (ind == sliderSrcArr.length) {
        ind = 0;
    }
    personImg.setAttribute('src', sliderSrcArr[ind])
}, 4000)




cartBtn.onclick = showCloseCartHandler;
closeCart.onclick = showCloseCartHandler;

function showCloseCartHandler(){
    document.body.classList.toggle('show__cart');

}
let addToCard = document.querySelectorAll('.cart__btn button');
addToCard.forEach( btn => {
    btn.addEventListener('click', () =>{
        console.log(1);
    })
})
