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
            contextMenuPos: [e.clientX + this.scrollLeft, e.clientY + this.scrollTop],
            contentMenuSide: <Side>target.dataset.side,
        });
    }

    private handleBaseClick:EventListener = () => {
        if (this.state === "CONTEXT_OPEN"){
            this.trigger("CLOSE");
        }
    }

    private spawnTextNode:EventListener = (e:Event) => {
        const canvasEl = this.querySelector(`content-container[data-side="${this.model.contentMenuSide}"]`);
        const canvasBounds = canvasEl.getBoundingClientRect();
        console.log(canvasBounds, this.scrollLeft);
        let x = this.model.contextMenuPos[0] - canvasBounds.left - this.scrollLeft,
            y = this.model.contextMenuPos[1] - canvasBounds.top - this.scrollTop;
        this.trigger("CLOSE");
        switch (this.model.contentMenuSide){
            case "left":
                this.update({
                    left: [...this.model.left, {
                        value: "Lorem ipsum",
                        pos: [x, y],
                        width: 300,
                        height: 78
                    }],
                    contextMenuPos: [0,0],
                });
                break;
            case "right":
                this.update({
                    right: [...this.model.right, {
                        value: "Lorem ipsum",
                        pos: [x, y],
                        width: 300,
                        height: 78
                    }],
                    contextMenuPos: [0,0],
                });
                break;
            default:
                break;
        }
        
    }

    connected(){
        this.addEventListener("click", this.handleBaseClick);
    }

    render(){
        const view = html`
            <card-editor-bar>
                <a href="/" class="bttn" kind="outline" color="grey" shape="rounded" icon="left">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </i>
                    go back
                </a>
                <button class="bttn" kind="outline" color="grey" shape="rounded" icon="left">
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
                        html`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none">Right click or tap and hold to begin.</p>`
                    }
                </content-container>
                <content-container data-side="right" @contextmenu=${this.openContextMenu}>
                    ${this.model.right.length ? html`
                        ${this.model.right.map(node => {
                            return html`
                                <text-node style="left:${node.pos[0]}px;top:${node.pos[1]}px;width:${node.width}px;height:${node.height}px;">
                                    <textarea>${node.value}</textarea>
                                </text-node>
                            `;
                        })}
                    `
                    :
                    html`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none">Right click or tap and hold to begin.</p>`}
                </content-container>
            </card-canvas>
            ${this.state === "CONTEXT_OPEN" ? html`
                <context-menu style="left: ${this.model.contextMenuPos[0]}px;top: ${this.model.contextMenuPos[1]}px;">
                    <button @click=${this.spawnTextNode} class="bttn w-full" kind="text" color="grey" shape="rounded" icon="left">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </i>
                        Add text</button>
                    <button @click=${this.spawnTextNode} class="bttn w-full" kind="text" color="grey" shape="rounded" icon="left">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </i>    
                        Add Doodles</button>
                    <button @click=${this.spawnTextNode} class="bttn w-full" kind="text" color="grey" shape="rounded" icon="left">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </i>
                        Add image</button>
                </context-menu>
            ` : ""}
        `;
        render(view, this);
    }
}