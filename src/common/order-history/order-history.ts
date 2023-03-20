export class OrderHistory {

    constructor(public id: string,
                public orderTracker: string,
                public totalPrice: number,
                public totalQuantity: number,
                public dateCreated: Date) {
    }

}
