import "./style.css";
import commsMod from "./commsMod";
let menuBtn = document.querySelector('header nav>button');
let sidebar = document.querySelector('#sidebar');
sidebar.style.width = '0px';
menuBtn.textContent = 'Menu';
menuBtn.addEventListener('click', ()=>{
    if(sidebar.style.width === '0px'){
        sidebar.style.width = '300px';
    }
    else{
        sidebar.style.width = '0px';
    }
});
commsMod.showDOM();

