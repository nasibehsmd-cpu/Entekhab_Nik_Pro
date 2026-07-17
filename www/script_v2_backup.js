"use strict";

// ===================================
// Entekhab Nik Pro
// Script v2
// ===================================

let database = [];
let currentCustomer = null;

// ------------------------------
// نمایش صفحات
// ------------------------------

function showPage(pageId){

    document.querySelectorAll(".page").forEach(function(page){
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if(page){
        page.classList.add("active");
    }

}

// ------------------------------
// بارگذاری اطلاعات
// ------------------------------

async function loadDatabase(){

    try{

        const response = await fetch("data.json");

        database = await response.json();

        if(!Array.isArray(database)){
            database = [];
        }

        console.log("Customers:", database.length);

    }catch(error){

        console.log(error);

        database = [];

    }

}

// ------------------------------
// نمایش اطلاعات مشتری
// ------------------------------

function showCustomer(customer){

    currentCustomer = customer;

    document.getElementById("customerInfo").innerHTML = `
        <b>نام:</b> ${customer.name || "-"}<br>
        <b>موبایل:</b> ${customer.mobile || "-"}<br>
        <b>تلفن:</b> ${customer.phone || "-"}<br>
        <b>آدرس:</b> ${customer.address || "-"}<br>
        <b>آخرین سرویس:</b> ${customer.last_service || "-"}
    `;

    document.getElementById("customerMobile").textContent =
        customer.mobile || "";

}// ------------------------------
// جستجوی مشتری
// ------------------------------

function searchCustomer(){

    const text = document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    if(text === ""){

        alert("عبارت جستجو را وارد کنید.");
        return;

    }

    const customer = database.find(function(item){

        return (

            (item.name || "").toLowerCase().includes(text) ||
            (item.mobile || "").includes(text) ||
            (item.phone || "").includes(text) ||
            (item.address || "").toLowerCase().includes(text)

        );

    });

    if(!customer){

        currentCustomer = null;

        document.getElementById("customerInfo").innerHTML =
            "<p style='color:red'>مشتری پیدا نشد.</p>";

        document.getElementById("customerMobile").textContent = "";

        return;

    }

    showCustomer(customer);

}

// ------------------------------
// رویدادهای جستجو
// ------------------------------

document
.getElementById("searchBtn")
.addEventListener("click", searchCustomer);

document
.getElementById("searchBox")
.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        searchCustomer();

    }

});// ------------------------------
// تماس با مشتری
// ------------------------------

document
.getElementById("callBtn")
.addEventListener("click", function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را انتخاب کنید.");
        return;

    }

    if(currentCustomer.mobile){

        location.href = "tel:" + currentCustomer.mobile;

    }

});

// ------------------------------
// پیامک به مشتری
// ------------------------------

document
.getElementById("smsBtn")
.addEventListener("click", function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را انتخاب کنید.");
        return;

    }

    if(currentCustomer.mobile){

        location.href = "sms:" + currentCustomer.mobile;

    }

});

// ------------------------------
// ارسال پیامک
// ------------------------------

document
.getElementById("sendSmsBtn")
.addEventListener("click", function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را انتخاب کنید.");
        return;

    }

    const text = document
        .getElementById("smsText")
        .value
        .trim();

    location.href =
        "sms:" +
        currentCustomer.mobile +
        "?body=" +
        encodeURIComponent(text);

});

// ------------------------------
// جابه‌جایی صفحات
// ------------------------------

document
.querySelectorAll(".bottomMenu button")
.forEach(function(btn){

    btn.addEventListener("click", function(){

        const onclick = this.getAttribute("onclick");

        if(onclick){

            const match = onclick.match(/showPage\('([^']+)'\)/);

            if(match){

                showPage(match[1]);

            }

        }

    });

});// ------------------------------
// برنامه کاری
// ------------------------------

document
.getElementById("showScheduleBtn")
.addEventListener("click", function(){

    const date = document.getElementById("workDate").value.trim();
    const staff = document.getElementById("staffSelect").value;

    document.getElementById("scheduleResult").innerHTML = `
        <h3>برنامه کاری</h3>
        <p><b>تاریخ:</b> ${date}</p>
        <p><b>پرسنل:</b> ${staff}</p>
        <hr>
        <p>در نسخه بعدی اطلاعات واقعی از data.json نمایش داده خواهد شد.</p>
    `;

});

document
.getElementById("prevDayBtn")
.addEventListener("click", function(){

    alert("در نسخه بعد، تاریخ یک روز به عقب می‌رود.");

});

document
.getElementById("nextDayBtn")
.addEventListener("click", function(){

    alert("در نسخه بعد، تاریخ یک روز به جلو می‌رود.");

});

// ------------------------------
// شروع برنامه
// ------------------------------

window.addEventListener("load", async function(){

    await loadDatabase();

    showPage("homePage");

});

console.log("Entekhab Nik Pro Ready");