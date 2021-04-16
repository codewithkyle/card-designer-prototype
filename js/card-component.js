import{html as a,render as d}from"./lit-html.js";import h from"./css.js";import c from"./supercomponent.js";import p from"./text-node.js";customElements.define("text-node",p);import u from"./draggable.js";customElements.define("move-handle",u);import m from"./resizable.js";customElements.define("resize-handle",m);import g from"./rotate.js";customElements.define("rotate-handle",g);class w extends c{constructor(){super();this.openContextMenu=e=>{e.preventDefault();const t=e.currentTarget;this.trigger("OPEN_CONTEXT"),this.update({contextMenuPos:[e.clientX+this.scrollLeft,e.clientY+this.scrollTop],contentMenuSide:t.dataset.side})};this.handleBaseClick=()=>{this.state==="CONTEXT_OPEN"&&this.trigger("CLOSE")};this.spawnTextNode=e=>{const n=this.querySelector(`content-container[data-side="${this.model.contentMenuSide}"]`).getBoundingClientRect();let o=this.model.contextMenuPos[0]-n.x-this.scrollLeft,i=this.model.contextMenuPos[1]-n.y-this.scrollTop;switch(this.model.contentMenuSide){case"left":this.update({left:[...this.model.left,{type:"text",value:"Lorem ipsum",pos:[o,i],width:300,height:78}],contextMenuPos:[0,0]});break;case"right":this.update({right:[...this.model.right,{type:"text",value:"Lorem ipsum",pos:[o,i],width:300,height:78}],contextMenuPos:[0,0]});break;default:break}};this.deleteNode=e=>{const t=e.currentTarget,n=parseInt(t.dataset.index),o={...this.model};switch(t.dataset.side){case"left":o.left.splice(n,1,null);break;case"right":o.right.splice(n,1,null);break;default:break}this.update(o)};this.handleFile=e=>{const t=e.currentTarget;var n=new FileReader;n.addEventListener("load",o=>{const i=new Image;i.title=t.files[0].name,i.src=o.target.result,i.draggable=!1;const s=this.querySelector(`content-container[data-side="${this.model.contentMenuSide}"]`).getBoundingClientRect();let r=this.model.contextMenuPos[0]-s.x-this.scrollLeft,l=this.model.contextMenuPos[1]-s.y-this.scrollTop;switch(this.model.contentMenuSide){case"left":this.update({left:[...this.model.left,{type:"image",img:i,pos:[r,l],width:150,height:150}],contextMenuPos:[0,0]});break;case"right":this.update({right:[...this.model.right,{type:"image",img:i,pos:[r,l],width:150,height:150}],contextMenuPos:[0,0]});break;default:break}},!1),n.readAsDataURL(t.files[0])};this.spawnImageNode=e=>{const t=document.createElement("input");t.type="file",t.accept="image/*",t.addEventListener("change",this.handleFile),t.click()};this.state="IDLING",this.stateMachine={IDLING:{OPEN_CONTEXT:"CONTEXT_OPEN"},CONTEXT_OPEN:{CLOSE:"IDLING"}},this.model={left:[],right:[],contextMenuPos:[0,0],contentMenuSide:null},h(["card-canvas","card-editor-bar","buttons","context-menu","text-node","image-node"]).then(()=>{this.render()})}renderNode(e,t,n){if(e===null)return"";if(e.type==="text")return a`
                <text-node node tabindex="0" data-top="${e.pos[1]}" data-left="${e.pos[0]}" data-width="${e.width}" data-height="${e.height}" style="top:0;left:0;width:${e.width}px;height:${e.height}px;transform: translate(${e.pos[0]}px, ${e.pos[1]}px);">
                    <node-wrapper>
                        <textarea>${e.value}</textarea>
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
                        <delete-button tabindex="0" title="Delete text box" @click=${this.deleteNode} data-index="${t}" data-side="${n}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </delete-button>
                    </node-wrapper>
                </text-node>
            `;if(e.type==="image")return a`
                <image-node node tabindex="0" data-top="${e.pos[1]}" data-left="${e.pos[0]}" data-width="${e.width}" data-height="${e.height}" style="top:0;left:0;width:${e.width}px;height:${e.height}px;transform: translate(${e.pos[0]}px, ${e.pos[1]}px);">
                    <node-wrapper>
                        ${e.img}
                        <resize-handle data-direction="y"></resize-handle>
                        <resize-handle data-direction="x"></resize-handle>
                        <resize-handle data-direction="both"></resize-handle>
                        <move-handle></move-handle>
                        <rotate-handle></rotate-handle>
                        <delete-button tabindex="0" title="Delete text box" @click=${this.deleteNode} data-index="${t}" data-side="${n}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </delete-button>
                    </node-wrapper>
                </image-node>
            `}checkOnlyNull(e){let t=!1;switch(e){case"left":for(let n=0;n<this.model.left.length;n++)if(this.model.left[n]!==null){t=!0;break}break;case"right":for(let n=0;n<this.model.right.length;n++)if(this.model.right[n]!==null){t=!0;break}break;default:break}return t}connected(){this.addEventListener("click",this.handleBaseClick)}render(){const e=a`
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
                    ${this.checkOnlyNull("left")?a`
                            ${this.model.left.map((t,n)=>this.renderNode(t,n,"left"))}
                        `:a`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none">Right click or tap and hold to begin.</p>`}
                </content-container>
                <content-container data-side="right" @contextmenu=${this.openContextMenu}>
                    ${this.checkOnlyNull("right")?a`
                        ${this.model.right.map((t,n)=>this.renderNode(t,n,"right"))}
                    `:a`<p class="font-bold font-grey-700 text-center w-300 absolute center events-none">Right click or tap and hold to begin.</p>`}
                </content-container>
            </card-canvas>
            ${this.state==="CONTEXT_OPEN"?a`
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
            `:""}
        `;d(e,this)}}export{w as default};
