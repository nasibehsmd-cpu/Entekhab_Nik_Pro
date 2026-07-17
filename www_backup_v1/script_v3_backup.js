"use strict";

// ===================================
// Entekhab Nik Pro
// Script v3
// ===================================

let database = [];
let currentCustomer = null;

// ===================================
// نمایش صفحات
// ===================================

function showPage(pageId){

    document.querySelectorAll(".page").forEach(function(page){
        page.classList.remove("active");
    });

    const page=document.getElementById(pageId);

    if(page){
        page.classList.add("active");
    }

}

// ===================================
// بارگذاری اطلاعات
// ===================================

async function loadDatabase(){

    try{

        const response=await fetch("data.json");

        database=await response.json();

        if(!Array.isArray(database)){
            database=[];
        }

        console.log("Customers:",database.length);

    }catch(error){

        console.error(error);

        database=[];

    }

}

// ===================================
// نمایش اطلاعات مشتری
// ===================================

function showCustomer(customer){

    currentCustomer=customer;

    document.getElementById("customerInfo").innerHTML=`

        <b>نام مشتری:</b> ${customer["مشتری"] || "-"}<br>

        <b>آدرس:</b> ${customer["آدرس"] || "-"}<br>

        <b>موبایل:</b> ${customer["موبایل"] || "-"}<br>

        <b>تلفن ثابت:</b> ${customer["ثابت"] || "-"}<br>

        <b>پرسنل:</b> ${customer["پرسنل"] || "-"}<br>

        <b>نوع کار:</b> ${customer["نوع کار"] || "-"}<br>

        <b>آخرین سرویس:</b> ${customer["تاریخ"] || "-"}

    `;

    document.getElementById("customerMobile").textContent=
        customer["موبایل"] || "";

}// ===================================
// جستجوی مشتری
// ===================================

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

        return (

            (item["جستجو"] || "").toLowerCase().includes(text) ||

            (item["مشتری"] || "").toLowerCase().includes(text) ||

            (item["آدرس"] || "").toLowerCase().includes(text) ||

            (item["موبایل"] || "").includes(text) ||

            (item["ثابت"] || "").includes(text)

        );

    });

    if(!customer){

        currentCustomer=null;

        document.getElementById("customerInfo").innerHTML=
            "<p style='color:red'>مشتری پیدا نشد.</p>";

        document.getElementById("customerMobile").textContent="";

        return;

    }

    showCustomer(customer);

}

// ===================================
// دکمه جستجو
// ===================================

document
.getElementById("searchBtn")
.addEventListener("click",searchCustomer);

document
.getElementById("searchBox")
.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        searchCustomer();

    }

});// ===================================
// تماس با مشتری
// ===================================

document
.getElementById("callBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را جستجو کنید.");

        return;

    }

    const mobile=currentCustomer["موبایل"] || "";

    if(mobile===""){

        alert("شماره موبایل ثبت نشده است.");

        return;

    }

    location.href="tel:"+mobile;

});

// ===================================
// پیامک به مشتری
// ===================================

document
.getElementById("smsBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را جستجو کنید.");

        return;

    }

    const mobile=currentCustomer["موبایل"] || "";

    if(mobile===""){

        alert("شماره موبایل ثبت نشده است.");

        return;

    }

    location.href="sms:"+mobile;

});

// ===================================
// ارسال پیامک
// ===================================

document
.getElementById("sendSmsBtn")
.addEventListener("click",function(){

    if(!currentCustomer){

        alert("ابتدا یک مشتری را جستجو کنید.");

        return;

    }

    const text=document
        .getElementById("smsText")
        .value
        .trim();

    const mobile=currentCustomer["موبایل"] || "";

    if(mobile===""){

        alert("شماره موبایل ثبت نشده است.");

        return;

    }

    location.href=
        "sms:"+mobile+
        "?body="+encodeURIComponent(text);

});

// ===================================
// مخاطبین ثابت
// ===================================

document
.querySelectorAll(".contactBtn")
.forEach(function(btn){

    btn.addEventListener("click",function(){

        const phone=this.dataset.phone;

        if(phone){

            location.href="tel:"+phone;

        }

    });

});// ===================================
// برنامه کاری
// ===================================

document
.getElementById("showScheduleBtn")
.addEventListener("click",function(){

    const date=document
        .getElementById("workDate")
        .value;

    const staff=document
        .getElementById("staffSelect")
        .value;

    const result=document
        .getElementById("scheduleResult");

    result.innerHTML=`
        <h3>برنامه کاری</h3>

        <p><b>تاریخ:</b> ${date || "-"}</p>

        <p><b>پرسنل:</b> ${staff || "-"}</p>

        <hr>

        <p>در نسخه بعد اطلاعات واقعی برنامه کاری نمایش داده می‌شود.</p>
    `;

});

// ===================================
// روز قبل
// ===================================

document
.getElementById("prevDayBtn")
.addEventListener("click",function(){

    alert("این قابلیت در نسخه بعد اضافه می‌شود.");

});

// ===================================
// روز بعد
// ===================================

document
.getElementById("nextDayBtn")
.addEventListener("click",function(){

    alert("این قابلیت در نسخه بعد اضافه می‌شود.");

});

// ===================================
// شروع برنامه
// ===================================

window.addEventListener("load",async function(){

    await loadDatabase();

    showPage("homePage");

});

console.log("Entekhab Nik Pro v3 Ready");
