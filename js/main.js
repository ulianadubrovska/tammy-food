let data;
let div_num;
let main_page;
let cnt;  // Declare cnt as a global variable

// AOS Libs
AOS.init();

// TopUp Btn
jQuery(document).ready(function () {
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 600) {
            jQuery('#myBtn').css('opacity', '1');
        } else {
            jQuery('#myBtn').css('opacity', '0');
        }
    });

    jQuery('#myBtn').click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });
});

//
// function onEntry(entry) {
//     entry.forEach(change => {
//         if (change.isIntersecting) {
//             change.target.classList.add('element-show');
//         }
//     });
// }
// let options = {
//     threshold: [0.5] };
// let observer = new IntersectionObserver(onEntry, options);
// let elements = document.querySelectorAll('.about-us-line-1');
//
// for (let elm of elements) {
//     observer.observe(elm);
// }


//Fetch data
fetch('../db/menu/dish.json')
    .then((response) => response.json())
    .then((json) => {
        data = json;
        let menuBlock = document.getElementById("menuParent")
        let newArr = data.dish.map((item => item))

        newArr.forEach(function (item, index) {
            menuBlock.innerHTML += renderDishItem(item.title, item.desc, item.price, item.stars, item.photo, item.typePhoto, index + 1);
        });


        var count = newArr.length; // total records
        cnt = 8; // records per page
        var cnt_page = Math.ceil(count / cnt); // number of pages

        var paginator = document.querySelector(".paginator");
        var page = "";
        for (var i = 0; i < cnt_page; i++) {
            page += renderPaginationItem(i, cnt); // index starts from 1
        }

        paginator.innerHTML = page;

        div_num = document.querySelectorAll(".num");
        for (var i = 0; i < div_num.length; i++) {
            if (i < cnt) {
                div_num[i].style.display = "flex";
            } else {
                div_num[i].style.display = "none";
            }
        }

        main_page = document.getElementById("page1");
        if (main_page) {
            main_page.classList.add("paginator_active");
        }
    });

function pagination(event) {
    var e = event || window.event;
    var target = e.target;
    var id = target.id;

    if (target.tagName.toLowerCase() != "li") return;

    var data_page = +target.dataset.page;

    if (main_page) {
        main_page.classList.remove("paginator_active");
        main_page = document.getElementById(id);
        if (main_page) {
            main_page.classList.add("paginator_active");
        }
    }

    var j = 0;
    for (var i = 0; i < div_num.length; i++) {
        var data_num = div_num[i].dataset.num;
        if (data_num <= data_page || data_num >= data_page)
            div_num[i].style.display = "none";

    }
    for (var i = data_page; i < div_num.length; i++) {
        if (j >= cnt) break;
        div_num[i].style.display = "flex";
        j++;
    }
}


function renderDishItem(title, desc, price, stars, photo, typePhoto, itemId) {
    return `<div data-num=${itemId}  class="num menu-block">
                <div class="dish">
                <img  height="130px" src="img/photo/menu/${photo}.${typePhoto}" alt="${photo}">
                </div>
                <div class="stars">
                    <img src="img/icons/menu/strars.svg" alt="stars">
                </div>

                <p class="dish-title">${title}</p>
                <p class="dish-describe">${desc}</p>

                <div class="flex-container">

                    <div>
                        <p class="dish-price">$${price}</p>
                    </div>

                    <div class="menu-icons">
                        <button class="button-shop-1">
                            <img src="img/icons/menu/dish-icon1.svg" alt="icon1">
                        </button>

                        <button class="button-shop-2">
                            <img src="img/icons/menu/dish-icon2.svg" alt="icon2">
                        </button>
                    </div>
                </div>
            </div>`
}

function renderPaginationItem(item, count) {
    return `<li data-page="${(item * count)}" id="page${(item + 1)}" class="waves-effect waves-circle waves-light page-item page-link">
                <div class="page-link-text">${(item + 1)}</div>
             </li>`
}
