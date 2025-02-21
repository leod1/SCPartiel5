export class Patient {
    constructor(
      public id: string,
      public whiteBloodCellCount: number,  
      public protocol?: string,            
      public hasRelapseAfter2019?: boolean, 
      public geneticMarkers?: string[],    
    ) {}
  }