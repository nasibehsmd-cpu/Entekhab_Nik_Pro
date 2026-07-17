from pathlib import Path
import re
import sys

script = Path.home() / "Entekhab_Nik_Pro" / "www" / "script.js"

text = script.read_text(encoding="utf-8")

pattern = r'function\s+searchCustomer\s*\(\s*\)\s*\{.*?\n\}'

m = re.search(pattern, text, re.S)

if not m:
    print("searchCustomer() not found")
    sys.exit(1)

new_function = r'''
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
'''

text = text[:m.start()] + new_function + text[m.end():]

script.write_text(text, encoding="utf-8")

print("OK")
