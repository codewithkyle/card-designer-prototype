class r extends HTMLElement{constructor(){super();this.handleMouseDown=t=>{this.rotating=!0};this.handleMouseUp=()=>{this.rotating=!1,this.parentElement.parentElement.setAttribute("rotating","false")};this.handleMouseMove=t=>{if(this.rotating){let e,n;t instanceof MouseEvent?(e=t.clientX,n=t.clientY):t instanceof TouchEvent&&(e=t.touches[0].clientX,n=t.touches[0].clientY);const o=this.parentElement,s=this.getCenter(o),a=this.getCenter(this),i={x:e,y:n},h=Math.atan2(i.y-s.y,i.x-s.x)*180/Math.PI;o.style.transform=`rotate(${h}deg)`,o.parentElement.setAttribute("rotating","true")}};this.rotating=!1}getCenter(t){const{left:e,top:n,width:o,height:s}=t.getBoundingClientRect(),a=e+o/2,i=n+s/2;return{x:a,y:i}}calcOffsetAngle(t,e,n){const o=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),s=Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)),a=Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2));return Math.acos((Math.pow(o,2)+Math.pow(s,2)-Math.pow(a,2))/(2*o*s))}connectedCallback(){window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseleave",this.handleMouseMove),window.addEventListener("mouseout",this.handleMouseMove),window.addEventListener("mouseleave",this.handleMouseUp),window.addEventListener("touchend",this.handleMouseUp),window.addEventListener("touchmove",this.handleMouseMove),window.addEventListener("touchcancel",this.handleMouseMove),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("touchstart",this.handleMouseDown)}}export{r as default};
