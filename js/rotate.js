class h extends HTMLElement{constructor(){super();this.handleMouseDown=t=>{this.rotating=!0;let e,n;t instanceof MouseEvent?(e=t.clientX,n=t.clientY):t instanceof TouchEvent&&(e=t.touches[0].clientX,n=t.touches[0].clientY);const s=this.parentElement,o=this.getCenter(s),a={x:e,y:n};this.startAngle=Math.atan2(a.y-o.y,a.x-o.x)-parseFloat(s.dataset.angle)};this.handleMouseUp=()=>{this.rotating=!1,this.parentElement.parentElement.setAttribute("rotating","false")};this.handleMouseMove=t=>{if(this.rotating){let e,n;t instanceof MouseEvent?(e=t.clientX,n=t.clientY):t instanceof TouchEvent&&(e=t.touches[0].clientX,n=t.touches[0].clientY);const s=this.parentElement,o=this.getCenter(s),a=this.getCenter(this),i={x:e,y:n},r=Math.atan2(i.y-o.y,i.x-o.x)-this.startAngle;s.style.transform=`rotate(${r}rad)`,s.dataset.angle=`${r}`,s.parentElement.setAttribute("rotating","true")}};this.rotating=!1}getCenter(t){const{left:e,top:n,width:s,height:o}=t.getBoundingClientRect(),a=e+s/2,i=n+o/2;return{x:a,y:i}}calcOffsetAngle(t,e,n){const s=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),o=Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)),a=Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2));return Math.acos((Math.pow(s,2)+Math.pow(o,2)-Math.pow(a,2))/(2*s*o))}connectedCallback(){window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseleave",this.handleMouseMove),window.addEventListener("mouseout",this.handleMouseMove),window.addEventListener("mouseleave",this.handleMouseUp),window.addEventListener("touchend",this.handleMouseUp),window.addEventListener("touchmove",this.handleMouseMove),window.addEventListener("touchcancel",this.handleMouseMove),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("touchstart",this.handleMouseDown)}}export{h as default};
