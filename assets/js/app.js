
let productBtn = document.querySelectorAll('.product-card button');
let closeCart = document.querySelector('.close__cart');
let cartBtn = document.querySelector('.cartBtn');
let sliderSrcArr = ['assets/img/person1.png', 'assets/img/person2.png'];
let personImg = document.querySelector('.person img');
let ind = 0
let allItems = {a:1};
let arrivalsItems = [
    'Tablet Apple iPad Air 2022 Wi-Fi 64GB Pink (MM9D3)',
    'Tablet Apple iPad mini 6 2021 64GB Wi-Fi Purple',
    'Tablet Apple iPad Pro 11 2022 Cell 128GB Silver (MNYD3)',
    'Smartphone Apple iPhone 13 128GB 2 nanoSim Starlight',
    'Smartphone Apple iPhone 13 128GB nanoSim/eSim Blue',
    'Tablet Apple iPad Air 2022 Wi-Fi 64GB Pink (MM9D31)'
]
let cartItems = [];



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


setTimeout(() =>{
    getData()
} , 2000)

async function getData(){
    allItems = await fetch('https://66585db05c3617052648207a.mockapi.io/items/items').then(res => res.json()).then(res => res[0]);
    setArrivalsItems();
    document.querySelector('main').style.opacity = 1;
    document.querySelector('.loader__wrapper').style.display = 'none';
    document.querySelector('html').style.overflow = 'auto';
};



function setArrivalsItems(){
    let arrivalsWrapper = document.querySelector('.product-list');
    arrivalsWrapper.innerHTML = '';


    Object.values(allItems).forEach((categoryItems, ind) => {
        let category = Object.keys(allItems)[ind];
        let upperCaseLetter;
        
        category.split('').forEach(letter => {
            if(letter == letter.toUpperCase()) upperCaseLetter = letter
        })
        category = category.split(upperCaseLetter).join(` ${upperCaseLetter}`);
        
        arrivalsWrapper.innerHTML += categoryItems.map(item => {
            if(arrivalsItems.some(elem => item.prodName == elem)){
                return `
            <div class="product-card">
            <img src="${item.img}" alt="iPad Air">
            <div class="product-info">
                <div class="price">${item.price}</div>
                <div class="category">${category}</div>
                <div class="name">${item.prodName}</div>  
            </div>
            <div class="cart__tools">
                <div class="product-card__eye">
                    <i class="fa-regular fa-eye"></i>
                </div>
                <div class="product-card__heart">
                    <div class="heart-container" title="Like">
                        <div class="svg-container">
                            <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                </path>
                            </svg>
                            <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="10,10 20,20"></polygon>
                                <polygon points="10,50 20,50"></polygon>
                                <polygon points="20,80 30,70"></polygon>
                                <polygon points="90,10 80,20"></polygon>
                                <polygon points="90,50 80,50"></polygon>
                                <polygon points="80,80 70,70"></polygon>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart__btn">
                <button class="add-to-cart" data-prodName='${item.prodName}'>
                    ADD TO CART
                </button>
            </div>
        </div>
            `
            }
            
        }).join('')
    })


    setAddToCartBtnHandler();

};


function setAddToCartBtnHandler(){
    let btns = document.querySelectorAll('.add-to-cart');
    btns.forEach(btn => {
        btn.onclick = () =>{
            let prodName = btn.dataset.prodname;

            Object.values(allItems).forEach(items => {
                items.forEach(elem =>{
                    if(elem.prodName == prodName) {
                        let double = false;
                        
                        double = cartItems.some(item => item.prodName == elem.prodName);
                        if(double){
                            cartItems = cartItems.map(item => {
                                if(item.prodName == elem.prodName){
                                   return {
                                        ...item,
                                        quantity: ++item.quantity
                                    }
                                } else return item
                            })
                        } else {
                            elem.quantity = 1;
                            cartItems.push(elem);
                        }

                    }
                })
            });
            setCartItems()
            localStorage.setItem('cartItems', JSON.stringify([...cartItems]))
            console.log(cartItems);
        }
    })

  
}

setCartItems();

function setCartItems(){
    let cartWrapper = document.querySelector('.cart__items');
    cartWrapper.innerHTML = cartItems.length ?  cartItems.map(item => {
        return `
        <div class="cart__item">
        <img src="${item.img}" alt="">
        <div class="cart__item__desc">
            <h3>${item.prodName}</h3>
            <p class="price">${item.price}</p>
            <div class="cart__item__tools">
                <div class="item__quantity">
                    <button>
                        <svg width="10px" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M376 232H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" class=""></path></svg>
                    </button>
                    <span>${item.quantity}</span>
                    <button>
                        <svg width="10px" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" class=""></path></svg>
                    </button>
                </div>
                <button class="item__delete">
                    <svg width="15px" aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

                    Delete
                </button>
            </div>
        </div>
    </div>
        `
    }).join('') :
    `
    <div class="empty__cart">
    <h4>
        Your shopping cart is empty			<svg aria-hidden="true" role="img" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.4 16.4C16.4 16.4 14.75 14.2 12 14.2C9.25 14.2 7.6 16.4 7.6 16.4M8.7 8.7H8.711M15.3 8.7H15.311M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" stroke="#111111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></h4>
</div>
    `;



    let minusBtns = document.querySelectorAll('.item__quantity button:first-child');
    let plusBtns = document.querySelectorAll('.item__quantity button:last-child');
    let quantitySpan = document.querySelectorAll('.item__quantity span');
    minusBtns.forEach((btn, index) => {
        btn.onclick = () => {
            if(quantitySpan[index].textContent == 1) return
            plusMinusCartHandler(--quantitySpan[index].textContent, index);
        }
    });

    plusBtns.forEach((btn, index) => {
        btn.onclick = () => {
            plusMinusCartHandler(++quantitySpan[index].textContent, index);
        }
    });

}


function plusMinusCartHandler(quantity, index){
    cartItems = cartItems.map((item, ind) =>{
        if(ind == index) item.quantity = quantity;
        return item;
    } )
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}


