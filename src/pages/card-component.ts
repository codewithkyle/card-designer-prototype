import { html, render } from "lit-html";
import css from "utils/css";
import SuperComponet from "@codewithkyle/supercomponent";

type CardComponentState = {
    left: Array<any>;
    right: Array<any>;
};
export default class CardComponent extends SuperComponet<CardComponentState>{
    constructor(){
        super();
        this.model = {
            left: [],
            right: [],
        };
        css(["card-canvas"]).then(() => {
            this.render();
        });
    }

    render(){
        const view = html`
            <card-canvas>
                <content-container>
                    ${this.model.left.length ? html`` : html`<p class="font-bold font-grey-400 text-center w-300 absolute center events-none">Right click or press and hold to begin.</p>`}
                </content-container>
                <content-container>
                    ${this.model.right.length ? html`` : html`<p class="font-bold font-grey-400 text-center w-300 absolute center events-none">Right click or press and hold to begin.</p>`}
                </content-container>
            </card-canvas>
        `;
        render(view, this);
    }
}