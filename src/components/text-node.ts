export default class TextNode extends HTMLElement{
    private textarea: HTMLTextAreaElement;
    private overflowWarningButton:HTMLElement;

    constructor(){
        super();
    }

    public checkOverflowStatus(){
        const bounds = this.textarea.getBoundingClientRect();
        if (Math.ceil(this.textarea.scrollHeight) > bounds.height){
            this.setAttribute("overflowing", "true");
        } else {
            this.setAttribute("overflowing", "false");
        }
    }

    private handleTextInput:EventListener = (e:KeyboardEvent) => {
        if (e instanceof KeyboardEvent){
            const target = e.currentTarget as HTMLTextAreaElement;
            const key = e.key.toLowerCase();
            const bounds = target.getBoundingClientRect();
            const scrollHeight = Math.ceil(target.scrollHeight);
            if (key === "enter" && scrollHeight > bounds.height){
                const height = parseInt(this.dataset.height) + (24 * 1.618);
                this.dataset.height = `${height}`;
                this.style.height = `${height}px`;
            }
            target.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });
        }
    }

    private handlePaste:EventListener = (e:ClipboardEvent) => {
        if (e instanceof ClipboardEvent){
            const target = e.currentTarget as HTMLTextAreaElement;
            // Paste event fires before DOM updates ¯\_(ツ)_/¯
            setTimeout(()=>{
                this.checkOverflowStatus();
            }, 150);
        }
    }

    private autoResizeTextbox:EventListener = (e:Event) => {
        this.dataset.height = `${Math.ceil(this.textarea.scrollHeight)}`;
        this.style.height = `${Math.ceil(this.textarea.scrollHeight)}px`;
        this.setAttribute("overflowing", "false");
    }

    connectedCallback(){
        this.textarea = this.querySelector("textarea");
        this.textarea.addEventListener("keydown", this.handleTextInput);
        this.textarea.addEventListener("paste", this.handlePaste);
        this.overflowWarningButton = this.querySelector("overflow-warning");
        this.overflowWarningButton.addEventListener("click", this.autoResizeTextbox);
    }
}