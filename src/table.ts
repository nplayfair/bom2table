export class PartsTable {
  constructor(
    public htmlTable: HTMLTableElement,
    public headers: string[],
    public jsonBOM: Part[],
  ) {}

  //Reset table
  public clearTable(): void {
    this.htmlTable.innerHTML = '';
  }

  //Header
  private createTableHeader(): void {
    const tHead = this.htmlTable.createTHead();
    const hRow = tHead.insertRow();
    //Populate headers with text
    for (const header of this.headers) {
      const th = document.createElement('th');
      const headerText = document.createTextNode(header);
      th.appendChild(headerText);
      hRow.appendChild(th);
    }
  }

  //Body
  private createTableBody(): void {
    this.jsonBOM.map((component) => {
      //Create a row
      const tRow = this.htmlTable.insertRow();
      //Insert part name
      const partName = tRow.insertCell();
      const partNameText = document.createTextNode(component.Part);
      partName.appendChild(partNameText);
      //Insert part value
      const partValue = tRow.insertCell();
      const partValText = document.createTextNode(component.Value);
      partValue.appendChild(partValText);
    });
  }

  //Create full table
  public createTable(): void {
    this.clearTable();
    this.createTableHeader();
    this.createTableBody();
  }
}
