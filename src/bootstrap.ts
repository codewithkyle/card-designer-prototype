import { configure, mount } from "@codewithkyle/router";

configure({
    "/": {
        tagName: "home-page",
        file: "/js/homepage.js",
    },
    "404": "missing-page",
});

const main = document.body.querySelector("main");
mount(main);
