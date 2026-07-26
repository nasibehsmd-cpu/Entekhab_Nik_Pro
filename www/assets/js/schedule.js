// =======================================
// Entekhab Nik Pro
// schedule.js
// =======================================

let scheduleDatabase = [];

const persianMonths = {
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

function normalizeDay(v){
    return String(Number(v || 0));
}

function parseDate(text){

    const p = text.trim().split("/");

    if(p.length!==3) return null;

    return {

        year:p[0],

        monthNumber:p[1],

        monthName:persianMonths[p[1]] || "",

        day:String(Number(p[2]))

    };

}

function scheduleInit(db){

    scheduleDatabase = db || [];

}

function scheduleSearch(day,month,staff){

    return scheduleDatabase.filter(item=>{

        return (

            normalizeDay(item["تاریخ"])===day &&

            (item["ماه"]||"")===month &&

            (item["پرسنل"]||"")===staff

        );

    });

}

console.log("schedule.js loaded");

function renderSchedule(result){

    const box=document.getElementById("scheduleResult");

    if(!result || result.length===0){

        box.innerHTML=
        "<div class='historyItem'>"+
        "برای این تاریخ و این پرسنل برنامه‌ای ثبت نشده است."+
        "</div>";

        return;

    }

    let html="<h3>برنامه کاری</h3>";

    result.forEach(item=>{

        html+=`

        <div class="historyItem">

        👤 <b>مشتری:</b> ${item["مشتری"] || "-"}

        <br>

        🏠 <b>آدرس:</b> ${item["آدرس"] || "-"}

        <br>

        ☎ <b>موبایل:</b> ${item["موبایل"] || "-"}

        <br>

        🧹 <b>نوع کار:</b> ${item["نوع کار"] || "-"}

        <br>

        💰 <b>مبلغ:</b> ${item["مبلغ"] || "-"} تومان

        </div>

        `;

    });

    box.innerHTML=html;

}


function runScheduleSearch(){

    const dateText =
        document.getElementById("workDate").value;

    const staff =
        document.getElementById("staffSelect").value;

    const info =
        parseDate(dateText);

    const box =
        document.getElementById("scheduleResult");

    if(!info){

        box.innerHTML =
        "<div class='historyItem'>"+
        "فرمت تاریخ صحیح نیست."+
        "<br>نمونه صحیح: 1405/04/27"+
        "</div>";

        return;

    }

    const result =
        scheduleSearch(
            info.day,
            info.monthName,
            staff
        );

    renderSchedule(result);

}


function scheduleStart(){

    if(typeof database!=="undefined"){

        scheduleInit(database);

    }

    document
        .getElementById("showScheduleBtn")
        .addEventListener("click",runScheduleSearch);

}

window.addEventListener("load",function(){

    setTimeout(scheduleStart,300);

});

