import { html, render } from "lit-html";
import css from "utils/css";
import SuperComponet from "@codewithkyle/supercomponent";

type HomepageState = {};
export default class Homepage extends SuperComponet<HomepageState>{
    constructor(){
        super();
        css(["buttons"]).then(() => {
            this.render();
        });
    }

    render(){
        const view = html`
        `;
        render(view, this);
    }
}