// -- Usage definitions --



// -- Driver definitions --



// -- Entry point definition --

declare class ClickBoss {
    static NODE_LIMIT: number
    static events: WeakMap<object, any>
    protected static listenerAdded: boolean
    private static eventCount
    static removeEvent(elem: any): boolean
    static addEvent({ elem, fn }: {
        elem: any
        fn: any
    }): boolean
    private static addListener
    private static removeListener
}
export default ClickBoss