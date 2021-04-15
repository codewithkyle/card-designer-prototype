import { html, render } from "lit-html";
import css from "utils/css";
import SuperComponet from "@codewithkyle/supercomponent";

type Side = "left" | "right";

type CardComponentState = {
    left: Array<any>;
    right: Array<any>;
    contextMenuPos: Array<number>;
    contentMenuSide: Side;
};
export default class CardComponent extends SuperComponet<CardComponentState>{
    constructor(){
        super();
        this.state = "IDLING";
        this.stateMachine = {
            IDLING: {
                OPEN_CONTEXT: "CONTEXT_OPEN",
            },
            CONTEXT_OPEN: {
                CLOSE: "IDLING",
            }
        };
        this.model = {
            left: [],
            right: [],
            contextMenuPos: [],
            contentMenuSide: null,
        };
        css(["card-canvas", "card-editor-bar", "buttons", "context-menu", "text-node"]).then(() => {
            this.render();
        });
    }

    private openContextMenu:EventListener = (e:MouseEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLElement;
        this.trigger("OPEN_CONTEXT");
        this.update({
            contextMenuPos: [e.x, e.y],
            contentMenuSide: <Side>target.dataset.side,
        });
    }

    private handleBaseClick:EventListener = () => {
        if (this.state === "CONTEXT_OPEN"){
            this.trigger("CLOSE");
        }
    }

    private spawnTextNode:EventListener = (e:Event) => {
        console.log("spawn");
        // TODO: calc local pos for side
        this.trigger("CLOSE");
        this.update({
            left: [...this.model.left, {
                value: "Lorem ipsum",
                pos: [this.model.contextMenuPos[0], this.model.contextMenuPos[1]],
                width: 300,
                height: 78
            }],
            contextMenuPos: null,
        });
    }

    connected(){
        this.addEventListener("click", this.handleBaseClick);
    }

    render(){
        const view = html`
            <card-editor-bar>
                <a href="/" class="bttn" kind="text" color="grey" shape="rounded" icon="left">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                    </i>
                    go back
                </a>
                <button class="bttn" kind="text" color="grey" shape="rounded" iron="left">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </i>
                    Add to cart
                </button>
            </card-editor-bar>
            <card-canvas>
                <content-container data-side="left" @contextmenu=${this.openContextMenu}>
                    ${this.model.left.length ? 
                        html`
                            ${this.model.left.map(node => {
                                return html`
                                    <text-node style="left:${node.pos[0]}px;top:${node.pos[1]}px;width:${node.width}px;height:${node.height}px;">
                                        <textarea>${node.value}</textarea>
                                    </text-node>
                                `;
                            })}
                        ` 
                        : 
                        html`<p class="font-bold font-grey-400 text-center w-300 absolute center events-none">Right click or press and hold to begin.</p>`
                    }
                </content-container>
                <content-container data-side="right" @contextmenu=${this.openContextMenu}>
                    ${this.model.right.length ? html`` : html`<p class="font-bold font-grey-400 text-center w-300 absolute center events-none">Right click or press and hold to begin.</p>`}
                </content-container>
            </card-canvas>
            ${this.state === "CONTEXT_OPEN" ? html`
                <context-menu style="left: ${this.model.contextMenuPos[0]}px;top: ${this.model.contextMenuPos[1]}px;">
                    <button @click=${this.spawnTextNode} class="bttn w-full" kind="text" color="grey" shape="rounded">Add text</button>
                </context-menu>
            ` : ""}
        `;
        render(view, this);
    }
}