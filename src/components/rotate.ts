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
            const {left, top, width, height} = target.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const angle = Math.atan2(currY - centerY, currX - centerX) * 180 / Math.PI;
            // TODO: fudge angle to reduce pop -- by height?
            this.parentElement.style.transform = `rotate(${angle}deg)`;

            this.parentElement.parentElement.setAttribute("rotating", "true");
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
