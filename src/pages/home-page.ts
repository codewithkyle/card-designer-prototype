import { html, render } from "lit-html";
import css from "utils/css";

export default class Homepage extends HTMLElement{
    constructor(){
        super();
        css(["homepage"]).then(() => {
            this.render();
        });
    }

    private render(){
        const view = html`
            <h1 class="mt-4 mb-4 block text-center font-grey-800 font-xl font-bold">Select a card to begin.</h1>
            <div class="cards">
                <a href="/card/birthday-sloth">
                    <img alt="birthday card example" src="/images/party-sloth.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
                <a href="/card/dino-mite">
                    <img alt="birthday card example" src="/images/dino-mite.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
                <a href="/card/fox-in-the-clouds">
                    <img alt="birthday card example" src="/images/fox-in-the-clouds.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
                <a href="/card/purhell-card">
                    <img alt="birthday card example" src="/images/purhell-card.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
                <a href="/card/toilet-paper-love-run-out">
                    <img alt="birthday card example" src="/images/toilet-paper-love-run-out.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
                <a href="/card/with-each-passing-day">
                    <img alt="birthday card example" src="/images/with-each-passing-day.jpg" loading="lazy" style="opacity:0;transition:all 150ms var(--ease-in-out);" onload="this.style.opacity = '1';">
                </a>
            </div>
        `;
        render(view, this);
    }
}