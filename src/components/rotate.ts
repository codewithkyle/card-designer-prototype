export default class Rotate extends HTMLElement{
    private rotating:boolean;

    constructor(){
        super();
        this.rotating = false;
    }

    private handleMouseDown:EventListener = (e:MouseEvent|TouchEvent) => {
        this.rotating = true;
    }

    private handleMouseUp:EventListener = () => {
        this.rotating = false;
        this.parentElement.parentElement.setAttribute("rotating", "false");
    }

    private getCenter(el){
        const {left, top, width, height} = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        return {
            x: centerX,
            y: centerY,
        };
    }
    
    private calcOffsetAngle(p1,p2,p3){
        const p12 = Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
        const p13 = Math.sqrt(Math.pow((p1.x - p3.x),2) + Math.pow((p1.y - p3.y),2));
        const p23 = Math.sqrt(Math.pow((p2.x - p3.x),2) + Math.pow((p2.y - p3.y),2));
        return Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));
    }

    private handleMouseMove:EventListener = (e:MouseEvent|TouchEvent) => {
        if (this.rotating){
            let currX, currY;
            if (e instanceof MouseEvent){
                currX = e.clientX;
                currY = e.clientY;
            }else if (e instanceof TouchEvent){
                currX = e.touches[0].clientX;
                currY = e.touches[0].clientY;
            }

            const target = this.parentElement;
            const targetPos = this.getCenter(target);
            const handlePos = this.getCenter(this);
            const cursorPos = {
                x: currX,
                y: currY,
            };

            const angle = (Math.atan2(cursorPos.y - targetPos.y, cursorPos.x - targetPos.x) * 180 / Math.PI);

            target.style.transform = `rotate(${angle}deg)`;
            target.parentElement.setAttribute("rotating", "true");
        }
    }

    connectedCallback(){        
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseleave", this.handleMouseMove);
        window.addEventListener("mouseout", this.handleMouseMove);
        window.addEventListener("mouseleave", this.handleMouseUp);
        window.addEventListener("touchend", this.handleMouseUp);
        window.addEventListener("touchmove", this.handleMouseMove);
        window.addEventListener("touchcancel", this.handleMouseMove);
        this.addEventListener("mousedown", this.handleMouseDown);
        this.addEventListener("touchstart", this.handleMouseDown);
    }
}
