import { html, render } from "lit-html";
import css from "utils/css";
import SuperComponet from "@codewithkyle/supercomponent";

import TextNode from "components/text-node";
customElements.define("text-node", TextNode);

import Draggable from "components/draggable";
customElements.define("move-handle", Draggable);

import Resizable from "components/resizable";
customElements.define("resize-handle", Resizable);

import Rotate from "components/rotate";
customElements.define("rotate-handle", Rotate);

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
            contextMenuPos: [0,0],
            contentMenuSide: null,
        };
        css(["card-canvas", "card-editor-bar", "buttons", "context-menu", "text-node", "image-node", "fonts"]).then(() => {
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
        let x = this.model.contextMenuPos[0] - canvasBounds.x - this.scrollLeft,
            y = this.model.contextMenuPos[1] - canvasBounds.y - this.scrollTop;
        switch (this.model.contentMenuSide){
            case "left":
                this.update({
                    left: [...this.model.left, {
                        type: "text",
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
                        type: "text",
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

    private deleteNode:EventListener = (e:Event)=>{
        const target = e.currentTarget as HTMLElement;
        const index = parseInt(target.dataset.index);
        const updatedData = {...this.model};
        switch (target.dataset.side){
            case "left":
                updatedData.left.splice(index, 1, null);
                break;
            case "right":
                updatedData.right.splice(index, 1, null);
                break;
            default:
                break;
        }
        this.update(updatedData);
    }

    private renderNode(node, index, side){
        if (node === null){
            return "";
        } else if (node.type === "text"){
            return html`
                <text-node node tabindex="0" data-top="${node.pos[1]}" data-left="${node.pos[0]}" data-width="${node.width}" data-height="${node.height}" style="top:0;left:0;width:${node.width}px;height:${node.height}px;transform: translate(${node.pos[0]}px, ${node.pos[1]}px);">
                    <node-wrapper data-angle="0">
                        <textarea>${node.value}</textarea>
                        <resize-handle data-direction="y"></resize-handle>
                        <resize-handle data-direction="x"></resize-handle>
                        <resize-handle data-direction="both"></resize-handle>
                        <move-handle></move-handle>
                        <move-handle></move-handle>
                        <rotate-handle></rotate-handle>
                        <overflow-warning tabindex="0" title="Text box contains overflowing text">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </overflow-warning>
                        <delete-button tabindex="0" title="Delete text box" @click=${this.deleteNode} data-index="${index}" data-side="${side}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </delete-button>
                    </node-wrapper>
                </text-node>
            `;
        } else if (node.type === "image"){
            return html`
                <image-node node tabindex="0" data-top="${node.pos[1]}" data-left="${node.pos[0]}" data-width="${node.width}" data-height="${node.height}" style="top:0;left:0;width:${node.width}px;height:${node.height}px;transform: translate(${node.pos[0]}px, ${node.pos[1]}px);">
                    <node-wrapper data-angle="0">
                        ${node.img}
                        <resize-handle data-direction="y"></resize-handle>
                        <resize-handle data-direction="x"></resize-handle>
                        <resize-handle data-direction="both"></resize-handle>
                        <move-handle></move-handle>
                        <rotate-handle></rotate-handle>
                        <delete-button tabindex="0" title="Delete text box" @click=${this.deleteNode} data-index="${index}" data-side="${side}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </delete-button>
                    </node-wrapper>
                </image-node>
            `;
        }
    }

    private checkOnlyNull(side:"right"|"left"):boolean{
        let containsNonNullEntities = false;
        switch(side){
            case "left":
                for (let i = 0; i < this.model.left.length; i++){
                    if (this.model.left[i] !== null){
                        containsNonNullEntities = true;
                        break;
                    }
                }
                break;
            case "right":
                for (let i = 0; i < this.model.right.length; i++){
                    if (this.model.right[i] !== null){
                        containsNonNullEntities = true;
                        break;
                    }
                }
                break;
            default:
                break;
        }
        return containsNonNullEntities;
    }

    private handleFile:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLInputElement;
        var reader = new FileReader();
        reader.addEventListener("load", (event) => {
            const image = new Image();
            image.title = target.files[0].name;
            // @ts-ignore
            image.src = event.target.result;
            image.draggable = false;
            const canvasEl = this.querySelector(`content-container[data-side="${this.model.contentMenuSide}"]`);
            const canvasBounds = canvasEl.getBoundingClientRect();
            let x = this.model.contextMenuPos[0] - canvasBounds.x - this.scrollLeft,
                y = this.model.contextMenuPos[1] - canvasBounds.y - this.scrollTop;
            switch (this.model.contentMenuSide){
                case "left":
                    this.update({
                        left: [...this.model.left, {
                            type: "image",
                            img: image,
                            pos: [x, y],
                            width: 150,
                            height: 150
                        }],
                        contextMenuPos: [0,0],
                    });
                    break;
                case "right":
                    this.update({
                        right: [...this.model.right, {
                            type: "image",
                            img: image,
                            pos: [x, y],
                            width: 150,
                            height: 150
                        }],
                        contextMenuPos: [0,0],
                    });
                    break;
                default:
                    break;
            }
        }, false);
        reader.readAsDataURL(target.files[0]);
    }

    private spawnImageNode:EventListener = (e:Event) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/*";
        input.addEventListener("change", this.handleFile);
        input.click();
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
                    ${this.checkOnlyNull("left") ? 
                        html`
                            ${this.model.left.map((node, index) => this.renderNode(node, index, "left"))}
                        ` 
                        : 
                        html`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none select-none">Right click or tap and hold to begin.</p>`
                    }
                </content-container>
                <content-container data-side="right" @contextmenu=${this.openContextMenu}>
                    ${this.checkOnlyNull("right") ? html`
                        ${this.model.right.map((node, index) => this.renderNode(node, index, "right"))}
                    `
                    :
                    html`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none select-none">Right click or tap and hold to begin.</p>`}
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
                    <button @click=${this.spawnImageNode} class="bttn w-full" kind="text" color="grey" shape="rounded" icon="left">
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