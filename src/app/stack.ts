export class Stack<T> {
  private stack: T[];
  private length: number;
  private readonly maxSize: number;

  public constructor(maxSize: number) {
    this.length = 0;
    this.maxSize = maxSize;
    this.stack = new Array<T>(this.maxSize);
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public isFull(): boolean {
    return this.length === this.maxSize;
  }

  public push(newItem: T): void {
    if (this.isFull()) {
      throw new Error('Stack overflow');
    }

    this.stack[this.length++] = newItem;
  }

  public pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    const retval = this.stack[--this.length];
    return retval;
  }

  public peek(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.stack[this.length - 1];
  }
  public empty(): void {
    this.stack = [];
    this.length = 0;
  }

  public printContents(): void {
    console.log('Stack Contents');
    for (let i = 0; i < this.length; ++i) {
      console.log(`stack[${i}]: ${this.stack[i]}`);
    }
  }
}