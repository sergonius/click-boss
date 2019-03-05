// -- Usage definitions --



// -- Driver definitions --



// -- Entry point definition --

interface Typa {
    id: number
    opts: {
        strings: Array<string>
        speed: number
        delay: number
        loop: boolean
        selector: string
    }
    selector: HTMLElement
    timeout: any
}
declare class Typa {
    constructor(opts: any)
    start(): void
    stop(): void
    typing(elem: HTMLElement, strings: Array<string>, currentLetter: any, currentWord: any, speed: any, delay: any, loop: any, reverse?: boolean): void
}
export default Typa