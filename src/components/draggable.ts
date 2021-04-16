export default class Draggable extends HTMLElement{
    private moving:boolean;
    private pos1:number;
    private pos2:number;
    private pos3:number;
    private pos4:number;

    constructor(){
        super();
        this.moving = false;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }

    private handleMouseDown:EventListener = (e:MouseEvent|TouchEvent) => {
        this.moving = true;
        if (e instanceof MouseEvent){
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
        } else if (e instanceof TouchEvent){
            this.pos3 = e.touches[0].clientX;
            this.pos4 = e.touches[0].clientY;
        }
    }

    private handleMouseUp:EventListener = () => {
        this.moving = false;
        const target = this.closest("[node]") as HTMLElement;
        target.setAttribute("moving", "false");
    }

    private handleMouseMove:EventListener = (e:MouseEvent|TouchEvent) => {
        if (this.moving){
            if (e instanceof MouseEvent){
                this.pos1 = this.pos3 - e.clientX;
                this.pos2 = this.pos4 - e.clientY;
                this.pos3 = e.clientX;
                this.pos4 = e.clientY;
            }else if (e instanceof TouchEvent){
                this.pos1 = this.pos3 - e.touches[0].clientX;
                this.pos2 = this.pos4 - e.touches[0].clientY;
                this.pos3 = e.touches[0].clientX;
                this.pos4 = e.touches[0].clientY;
            }

            const target = this.closest("[node]") as HTMLElement;
            let top = parseInt(target.dataset.top) - this.pos2;
            let left = parseInt(target.dataset.left) - this.pos1;

            // const topLimit = 0;
            // const bottomLimit = window.innerHeight - bounds.height;
            // if (top < topLimit){
            //     top = topLimit;
            // }
            // if (top > bottomLimit){
            //     top = bottomLimit;
            // }

            // const leftLimit = 0;
            // const rightLimit = window.innerWidth - bounds.width;
            // if (left < leftLimit){
            //     left = leftLimit;
            // }
            // if (left > rightLimit){
            //     left = rightLimit;
            // }

            target.style.transform = `translate(${left}px, ${top}px)`;
            target.setAttribute("moving", "true");
            target.dataset.top = `${top}`;
            target.dataset.left = `${left}`;
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
