export default class Resizable extends HTMLElement{
    private resizing:boolean;
    private pos1:number;
    private pos2:number;
    private pos3:number;
    private pos4:number;

    constructor(){
        super();
        this.resizing = false;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }

    private handleMouseDown:EventListener = (e:MouseEvent|TouchEvent) => {
        this.resizing = true;
        if (e instanceof MouseEvent){
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
        } else if (e instanceof TouchEvent){
            this.pos3 = e.touches[0].clientX;
            this.pos4 = e.touches[0].clientY;
        }
    }

    private handleMouseUp:EventListener = () => {
        this.resizing = false;
        this.parentElement.setAttribute("resizing", "false");
    }

    private handleMouseMove:EventListener = (e:MouseEvent|TouchEvent) => {
        if (this.resizing){
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

            this.parentElement.setAttribute("resizing", "true");

            let height = parseInt(this.parentElement.dataset.height) - this.pos2;
            let width = parseInt(this.parentElement.dataset.width) - this.pos1;

            switch (this.dataset?.direction){
                case "x":
                    this.parentElement.style.width = `${width}px`;
                    this.parentElement.dataset.width = `${width}`;
                    break;
                case "y":
                    this.parentElement.style.height = `${height}px`;
                    this.parentElement.dataset.height = `${height}`;
                    break;
                default:
                    this.parentElement.style.width = `${width}px`;
                    this.parentElement.dataset.width = `${width}`;
                    this.parentElement.dataset.height = `${height}`;
                    this.parentElement.style.height = `${height}px`;
                    break;
            }
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
