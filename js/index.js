import { SmoothScroll } from "./Animation/Animation__scroll.js";
import { jsonToHtml } from "./Utils/jsonToHtml.js";
import "./webComponents/Card.js";


window.addEventListener("DOMContentLoaded", () => {
    fetch('./api/card__info.json')
    .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки JSON');

        return response.json();
    })
    .then(data => {
        const $gallery  = document.querySelector('#gallery');
        
        for (let item of data) {
            
            $gallery.insertAdjacentHTML("beforeend", `<card-component class="frame ${!item.globalClass ? "" : item.globalClass}">
                ${jsonToHtml(item)}
            </card-component>`);
        };
        
        requestAnimationFrame(() => {
            new SmoothScroll();

            window.scrollTo(0, 1);
        });
    })
    .catch(error => console.error('Fetch error:', error)); 
});




