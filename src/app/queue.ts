export class Queue {
  private queue: string[];

  public constructor() {
    this.queue = []
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  public push(val: string) {
    this.queue.push(val);
  }
  public pop(): string | undefined {
    return this.queue.shift();
  }

  public peek(): string {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }

    return this.queue[0];
  }
  public empty(): void {
    this.queue = [];
    this.queue.length = 0;
  }

  public printContents(): void {
    console.log('Queue Contents');
    this.queue.forEach(item => console.log(item));
  }
  public getContents(addSpaces?): string {
    let s: string = "";
    this.queue.forEach(item => { s += `${item}` + (addSpaces ? ' ' : '') });
    return s;
  }
  public getResult(): string {
    try {
      if (!this.check()) return "Invalid input";
      console.log(this.getContents());

      return this.process().toString();
    } catch (e) {
      console.log(e);
    } finally { this.empty() }
  }
  private process(): number {
    let queue: string[] = this.clone(this.queue);
    let index = 0;
    while (queue.length != 1) {

      if (queue.includes("X") || queue.includes("/")) {
        let priorityIndex = queue.indexOf("X");
        let num1 = queue[priorityIndex - 1];
        let operand = queue[priorityIndex];
        let num2 = queue[priorityIndex + 1];
        let result = this.operate(num1, operand, num2);
        console.log("before: " + queue);
        queue.splice(priorityIndex -1, 3, result.toString())
        console.log("after: " + queue);

      } else if(queue.includes("+") || queue.includes("-")){
        let num1 = queue[index];
        let operand = queue[index + 1];
        let num2 = queue[index + 2];
        let result = this.operate(num1, operand, num2);
        console.log("before: " + queue);
        queue.splice(index, 3, result.toString())
        console.log("after: " + queue);
      }
    }
    return parseInt(queue[0]);
  }
  private clone(a) {
    return JSON.parse(JSON.stringify(a));
  }
  private operate(n1: string, o: string, n2: string): number {
    const a = parseInt(n1);
    const b = parseInt(n2);
    switch (o) {
      case "+": return a + b;
      case "-": return a - b;
      case "/": return a / b;
      case "X": return a * b;
      default: throw "unsupported operand";
    }
  }
  private check(): boolean {
    console.log(this.queue);
    console.log(this.getContents());


    let previousWasOperand = true;

    this.queue.forEach(item => {
      console.log(previousWasOperand && this.isOperand(item));
      console.log(!previousWasOperand && !this.isOperand(item));
      console.log(this.queue.length);

      if (previousWasOperand && this.isOperand(item)) return false;
      if (!previousWasOperand && !this.isOperand(item)) return false;
      previousWasOperand = this.isOperand(item);
    })
    return this.queue.length > 1 && this.queue.length % 2 != 0;
  }
  private isOperand(i: string): boolean {
    return "+-/X".includes(i);
  }
}
