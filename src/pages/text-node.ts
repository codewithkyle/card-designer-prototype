export default class TextNode extends HTMLElement{
    private textarea: HTMLTextAreaElement;

    constructor(){
        super();
        this.textarea = this.querySelector("textarea");
    }

    public checkOverflowStatus(){
        const bounds = this.textarea.getBoundingClientRect();
        if (Math.ceil(this.textarea.scrollHeight) > bounds.height){
            this.textarea.parentElement.setAttribute("overflowing", "true");
        } else {
            this.textarea.parentElement.setAttribute("overflowing", "false");
        }
    }
}