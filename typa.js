class Typa {
    constructor(opts) {
        this.id = +new Date();
        this.opts = opts;
    }
    start() {
        const { strings, speed, delay, loop, selector } = this.opts;
        this.selector = document.querySelector(selector);
        if (this.selector) {
            this.selector.innerHTML =
                '<span id="typer"></span><span class="typed-cursor"></span>';
            const typer = document.getElementById('typer');
            const { strings, speed, delay, loop } = this.opts;
            this.typing(typer, strings, 0, 0, speed, delay, loop);
        }
    }
    stop() {
        clearTimeout(this.timeout());
    }
    typing(elem, strings, currentLetter, currentWord, speed, delay, loop, reverse) {
        if (!reverse) {
            if (strings[currentWord]) {
                if (currentLetter < strings[currentWord].length) {
                    elem.innerHTML = strings[currentWord].substring(0, currentLetter + 1);
                    currentLetter += 1;
                    this.timeout = setTimeout(() => {
                        this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop);
                    }, speed);
                }
                else {
                    this.timeout = setTimeout(() => {
                        this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop, true);
                    }, delay);
                }
            }
            else {
                currentWord = 0;
                this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop);
            }
        }
        else {
            if (currentLetter > 0) {
                if (loop) {
                    elem.innerHTML = strings[currentWord].substring(0, currentLetter - 1);
                    currentLetter -= 1;
                    this.timeout = setTimeout(() => {
                        this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop, reverse);
                    }, speed);
                }
                else {
                    if (strings.length - 1 !== currentWord) {
                        elem.innerHTML = strings[currentWord].substring(0, currentLetter - 1);
                        currentLetter -= 1;
                        this.timeout = setTimeout(() => {
                            this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop, reverse);
                        }, speed);
                    }
                }
            }
            else {
                currentWord += 1;
                this.timeout = setTimeout(() => {
                    this.typing(elem, strings, currentLetter, currentWord, speed, delay, loop);
                }, speed);
            }
        }
    }
}

export default Typa;
