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

        <b>مبلغ:</b> ${customer["مبلغ"] || "-"} تومان<br>

        <b>آخرین نظافت:</b> در حال محاسبه...

    `;

    document.getElementById("customerMobile").textContent=
        customer["موبایل"] || "";

    let history = customers.filter(c =>
        c["مشتری"] === customer["مشتری"]
    );

    history.sort((a,b)=>{
        let am = Number(a["تاریخ"] || 0);
        let bm = Number(b["تاریخ"] || 0);
        return bm - am;
    });

    let last = history[0] || {};

    document.getElementById("customerInfo").innerHTML += `
        <br>
        <b>آخرین نظافت:</b> ${last["تاریخ"] || "-"} ${last["ماه"] || "-"}<br>
        <b>تعداد نظافت:</b> ${history.length} بار
    `;

    let historyHTML = "<h3>سابقه خدمات</h3>";

    history.forEach(h => {
        historyHTML += `
            <div class="historyItem">
                ${h["ماه"] || "-"} ${h["تاریخ"] || "-"}<br>
                آدرس: ${h["آدرس"] || "-"}<br>
                پرسنل: ${h["پرسنل"] || "-"}<br>
                مبلغ: ${h["مبلغ"] || "-"} تومان
            </div>
        `;
    });

    document.getElementById("customerHistory").innerHTML = historyHTML;

}// ===================================
// جستجوی مشتری
// ===================================


function searchCustomer(){

    const text = document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    if(text===""){
        alert("عبارت جستجو را وارد کنید.");
        return;
    }

    const results = database.filter(function(item){

        return (
            (item["جستجو"] || "").toLowerCase().includes(text) ||
            (item["مشتری"] || "").toLowerCase().includes(text) ||
            (item["آدرس"] || "").toLowerCase().includes(text) ||
            (item["موبایل"] || "").includes(text) ||
            (item["ثابت"] || "").includes(text)
        );

    });

    const list = document.getElementById("searchResults");

    list.innerHTML = "";

    if(results.length===0){
        currentCustomer = null;
        document.getElementById("customerInfo").innerHTML =
        "<p style='color:red'>مشتری پیدا نشد.</p>";
        return;
    }

    results.forEach(function(customer){

        const div = document.createElement("div");

        div.className = "searchResultItem";

        div.innerHTML =
        "<b>"+(customer["مشتری"] || "-")+"</b>" +
        "<div>"+(customer["آدرس"] || "-")+"</div>" +
        "<small>آخرین سرویس: "+
        (customer["ماه"] || "")+" "+
        (customer["تاریخ"] || "-")+
        "</small>";

        div.onclick=function(){
            showCustomer(customer);
        };

        list.appendChild(div);

    });

    showCustomer(results[0]);

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
// ===================================
// برنامه کاری پرسنل
// ===================================

document.getElementById("showScheduleBtn")
.addEventListener("click",function(){

    let date = document.getElementById("workDate").value;
    let staff = document.getElementById("staffSelect").value;

    let parts = date.split("/");

    let monthNames = {
        "01":"فروردین",
        "02":"اردیبهشت",
        "03":"خرداد",
        "04":"تیر",
        "05":"مرداد",
        "06":"شهریور",
        "07":"مهر",
        "08":"آبان",
        "09":"آذر",
        "10":"دی",
        "11":"بهمن",
        "12":"اسفند"
    };

    let day = String(Number(parts[2] || ""));

    let month = monthNames[parts[1]] || "";

    console.log("SELECTED:", day, month, staff);

    console.log("SAMPLE:", database.filter(c=>c["پرسنل"]==staff).slice(0,5));

    alert("تاریخ انتخابی: " + date + "\nپرسنل: " + staff + "\nتعداد کل اطلاعات: " + database.length);

    alert("تاریخ: "+date+"\nپرسنل: "+staff+"\nتعداد رکوردها: "+database.length);

    let result = database.filter(c => {

        let recordDay = String(Number(c["تاریخ"] || 0));

        let recordMonth = c["ماه"] || "";

        return (
            recordDay == day &&
            recordMonth == month &&
            c["پرسنل"] == staff
        );

    });

    let box = document.getElementById("scheduleResult");

    if(result.length == 0){

        box.innerHTML =
        "برای این تاریخ و پرسنل برنامه‌ای ثبت نشده است.";

        return;
    }

    let html = "<h3>برنامه کاری</h3>";

    result.forEach(c=>{

        html += `
        <div class="historyItem">
        👤 مشتری: ${c["مشتری"] || "-"}<br>
        🏠 آدرس: ${c["آدرس"] || "-"}<br>
        🧹 نوع کار: ${c["نوع کار"] || "-"}<br>
        💰 مبلغ: ${c["مبلغ"] || "-"} تومان
        </div>
        `;

    });

    box.innerHTML = html;

});

console.log("Entekhab Nik Pro v3 Ready");


window.addEventListener("load", async function(){

    await loadDatabase();

    showPage("homePage");

});
