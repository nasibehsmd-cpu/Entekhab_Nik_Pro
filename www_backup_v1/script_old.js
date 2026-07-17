"use strict";

// =======================================
// انتخاب نیک
// نسخه 1.0
// =======================================

let database = [];

let currentCustomer = null;

// ===============================
// نمایش صفحات
// ===============================

function showPage(pageId){

    document.querySelectorAll(".page").forEach(function(page){

        page.classList.remove("active");

    });

    const target=document.getElementById(pageId);

    if(target){

        target.classList.add("active");

    }

}

// ===============================
// بارگذاری اطلاعات مشتریان
// ===============================

async function loadDatabase(){

    try{

        const response=await fetch("data.json");

        database=await response.json();

        if(!Array.isArray(database)){

            database=[];

        }

        console.log("Customers :",database.length);

    }

    catch(err){

        console.log(err);

        database=[];

    }

}

// ===============================
// جستجو

function searchCustomer(){

    const text=document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    if(text===""){

        alert("عبارت جستجو را وارد کنید.");

        return;

    }

    const customer=database.find(function(item){

        return(

            (item.name||"").toLowerCase().includes(text) ||

            (item.mobile||"").includes(text) ||

            (item.phone||"").includes(text) ||

            (item.address||"").toLowerCase().includes(text)

        );

    });

    if(!customer){

        document.getElementById("customerInfo").innerHTML=

        "<p style='color:red'>مشتری پیدا نشد.</p>";

        currentCustomer=null;

        document.getElementById("customerMobile").textContent="";

        return;

    }

    currentCustomer=customer;

    document.getElementById("customerMobile").textContent=

        customer.mobile||"";

    document.getElementById("customerInfo").innerHTML=`

        <b>نام:</b> ${customer.name||"-"}<br>

        <b>موبایل:</b> ${customer.mobile||"-"}<br>

        <b>تلفن:</b> ${customer.phone||"-"}<br>

        <b>آدرس:</b> ${customer.address||"-"}<br>

        <b>آخرین سرویس:</b> ${customer.last_service||"-"}

    `;

}

// ===============================
// دکمه جستجو
// ===============================

document
.getElementById("searchBtn")
.addEventListener("click",searchCustomer);

document
.getElementById("searchBox")
.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        searchCustomer();

    }

});// ===============================
// تماس با مشتری
// ===============================

document
.getElementById("callBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری انتخاب کنید.");

        return;

    }

    if(currentCustomer.mobile){

        location.href="tel:"+currentCustomer.mobile;

    }

});

// ===============================
// پیامک به مشتری
// ===============================

document
.getElementById("smsBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری انتخاب کنید.");

        return;

    }

    if(currentCustomer.mobile){

        location.href="sms:"+currentCustomer.mobile;

    }

});

// ===============================
// ارسال پیامک از صفحه پیامک
// ===============================

document
.getElementById("sendSmsBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری انتخاب کنید.");

        return;

    }

    const text=document
        .getElementById("smsText")
        .value
        .trim();

    location.href=
        "sms:"+currentCustomer.mobile+
        "?body="+encodeURIComponent(text);

});

// ===============================
// تماس با مخاطبین ثابت
// ===============================

document
.querySelectorAll(".contactBtn")
.forEach(function(btn){

    btn.addEventListener("click",function(){

        location.href="tel:"+this.dataset.phone;

    });

});

// ===============================
// شروع برنامه
// ===============================

window.addEventListener("load",function(){

    loadDatabase();

});// ===============================
// برنامه کاری
// ===============================

document
.getElementById("showScheduleBtn")
.addEventListener("click",function(){

    const date=document
        .getElementById("workDate")
        .value
        .trim();

    const staff=document
        .getElementById("staffSelect")
        .value;

    const result=document
        .getElementById("scheduleResult");

    result.innerHTML=`
        <h3>برنامه کاری</h3>
        <p><b>تاریخ:</b> ${date}</p>
        <p><b>پرسنل:</b> ${staff}</p>
        <hr>
        <p>در مرحله بعد اطلاعات واقعی از فایل data.json نمایش داده می‌شود.</p>
    `;

});

// ===============================
// روز قبل
// ===============================

document
.getElementById("prevDayBtn")
.addEventListener("click",function(){

    alert("در نسخه بعد تاریخ یک روز به عقب می‌رود.");

});

// ===============================
// روز بعد
// ===============================

document
.getElementById("nextDayBtn")
.addEventListener("click",function(){

    alert("در نسخه بعد تاریخ یک روز به جلو می‌رود.");

});

console.log("Entekhab Nik Pro Ready");