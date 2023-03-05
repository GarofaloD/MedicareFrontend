export class Product {

  constructor(public id: number,
              public sku: number,
              public name: string,
              public description: string,
              public manufacturer: string,
              public unitPrice: number,
              public unitsInStock: number,
              public active: boolean,
              public imageUrl: string,
              public dateCreated: Date,
              public dateUpdated: Date){
  }



}
