class r extends HTMLElement{constructor(){super();this.handleTextInput=t=>{if(t instanceof KeyboardEvent){const e=t.currentTarget,a=t.key.toLowerCase(),s=e.getBoundingClientRect(),n=Math.ceil(e.scrollHeight);if(a==="enter"&&n>s.height){const i=parseInt(this.dataset.height)+24*1.618;this.dataset.height=`${i}`,this.style.height=`${i}px`}e.scrollTo({top:0,left:0,behavior:"auto"})}};this.handlePaste=t=>{if(t instanceof ClipboardEvent){const e=t.currentTarget;setTimeout(()=>{this.checkOverflowStatus()},150)}};this.autoResizeTextbox=t=>{this.dataset.height=`${Math.ceil(this.textarea.scrollHeight)}`,this.style.height=`${Math.ceil(this.textarea.scrollHeight)}px`,this.setAttribute("overflowing","false")}}checkOverflowStatus(){const t=this.textarea.getBoundingClientRect();Math.ceil(this.textarea.scrollHeight)>t.height?this.setAttribute("overflowing","true"):this.setAttribute("overflowing","false")}connectedCallback(){this.textarea=this.querySelector("textarea"),this.textarea.addEventListener("keydown",this.handleTextInput),this.textarea.addEventListener("paste",this.handlePaste),this.overflowWarningButton=this.querySelector("overflow-warning"),this.overflowWarningButton.addEventListener("click",this.autoResizeTextbox)}}export{r as default};
