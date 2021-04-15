import { configure, mount } from "@codewithkyle/router";

configure({
    "/card/{SLUG}": "card-component",
    "/": "home-page",
    "404": "missing-page",
});

const main = document.body.querySelector("main");
mount(main);
