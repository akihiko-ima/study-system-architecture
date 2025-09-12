export class Book {
  constructor(
    private _id: string,
    private _title: string,
    private _isAvailable: boolean = true,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date()
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }
  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  loan() {
    if (!this._isAvailable) {
      throw new Error("この本はすでに貸し出されています。");
    }
    this._isAvailable = false;
    this._updatedAt = new Date();
  }

  return() {
    if (this._isAvailable) {
      throw new Error("この本はすでに返却されています。");
    }
    this._isAvailable = true;
    this._updatedAt = new Date();
  }
}
