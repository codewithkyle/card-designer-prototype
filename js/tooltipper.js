class h{constructor(){this.showTooltip=e=>{const t=e.currentTarget;let i=t.getAttribute("tooltip");if(i.length||(i=t.getAttribute("aria-label")),!i.length){console.warn("Tooltip could not be created -- missing aria-label or tooltip attribute values.");return}const s=document.body.querySelector(`tool-tip[uid="${t.dataset.tooltipUid}"]`);s&&s.remove();const o=document.createElement("tool-tip");o.setAttribute("uid",t.dataset.tooltipUid),o.innerHTML=i,o.setAttribute("role","tooltip");const n=t.getBoundingClientRect();o.style.position="absolute",o.style.zIndex="999999",o.style.opacity="0",document.body.appendChild(o);const d=o.getBoundingClientRect();let l=n.left+n.width/2-d.width/2;l+d.width>window.innerWidth-4?l-=l+d.width-window.innerWidth+4:l<4&&(l=4);let r=n.top+n.height;r+d.height>window.innerHeight-4&&(r=n.top-d.height),o.style.top=`${r}px`,o.style.left=`${l}px`,o.classList.add("visible"),o.style.opacity="1"},this.hideTooltip=e=>{const t=e.currentTarget,i=document.body.querySelector(`tool-tip[uid="${t.dataset.tooltipUid}"]`);i==null||i.remove()},this.elements=[],this.nextUid=0,this.addTooltips()}purgeTooltips(){const e=Array.from(document.body.querySelectorAll("[tooltip]"));for(let t=this.elements.length-1;t>=0;t--){let i=!1;for(let s=0;s<e.length;s++)if(e[s].dataset.tooltipUid===this.elements[t].dataset.tooltipUid){i=!0;break}i||(this.elements[t].removeEventListener("mouseenter",this.showTooltip),this.elements[t].removeEventListener("focus",this.showTooltip),this.elements[t].removeEventListener("mouseleave",this.hideTooltip),this.elements[t].removeEventListener("blur",this.hideTooltip),this.elements.splice(t,1))}}addTooltips(){const e=Array.from(document.body.querySelectorAll("[tooltip]:not([data-tooltip-uid])"));if(e.length)for(let t=0;t<e.length;t++)e[t].dataset.tooltipUid=`${this.nextUid}`,this.nextUid++,e[t].addEventListener("mouseenter",this.showTooltip),e[t].addEventListener("focus",this.showTooltip),e[t].addEventListener("mouseleave",this.hideTooltip),e[t].addEventListener("blur",this.hideTooltip);this.elements=[...this.elements,...e],this.purgeTooltips()}refresh(){this.addTooltips()}}const p=new h,a=p.refresh.bind(p);export{h as Tooltipper,a as refresh};
