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
  public getContents(addSpaces?: boolean): string {
    let s: string = "";
    this.queue.forEach(item => { s += `${item}` + (addSpaces ? ' ' : '') });
    return s;
  }
  public getResult(): string {
    try {
      if (!this.check()) return "Invalid input";
      return this.process().toString();
    } catch (e) {
      console.error(e);
    } finally { this.empty() }
  }
  private process(): number {
    let queue: string[] = this.clone(this.queue);
    let index = 0;
    while (queue.length != 1) {
      if (queue.includes("X") || queue.includes("/")) {
        let priorityIndex = queue.indexOf("X") > 0 ? queue.indexOf("X") : queue.indexOf("/");
        let num1 = queue[priorityIndex - 1];
        let operand = queue[priorityIndex];
        let num2 = queue[priorityIndex + 1];
        let result = this.operate(num1, operand, num2);
        queue.splice(priorityIndex - 1, 3, result.toString())
      } else if (queue.includes("+") || queue.includes("-")) {
        let num1 = queue[index];
        let operand = queue[index + 1];
        let num2 = queue[index + 2];
        let result = this.operate(num1, operand, num2);
        queue.splice(index, 3, result.toString())
      }
    }
    return parseFloat(queue[0]);
  }
  private clone(a: string[]) {
    return JSON.parse(JSON.stringify(a));
  }
  private operate(n1: string, o: string, n2: string): number {
    const a = parseFloat(n1);
    const b = parseFloat(n2);
    switch (o) {
      case "+": return a + b;
      case "-": return a - b;
      case "/": return a / b;
      case "X": return a * b;
      default: throw "unsupported operand " + o;
    }
  }
  private check(): boolean {
    let previousWasOperand = true;
    this.queue.forEach(item => {
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
