interface IChainNode {
    element: any;
    next: ChainNode;
    pre: ChainNode;
}

export class ChainNode implements IChainNode {
    public element: any;
    public next: ChainNode;
    public pre: ChainNode;

    constructor(element: any, next: ChainNode, pre: ChainNode) {
        this.element = element
        this.next = next
        this.pre = pre
    }
}

export class Chain {
    public head: ChainNode | null;
    public size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    getNode(index: number) {
        let cur = this.head
        for(let i=0; i<index; i++) {
            cur = cur?.next || null
        }
        return cur
    }
}