export class Person {
  constructor(
    public personId: number = null,
    public firstName: string = null,
    public lastName: string = null,
    public email: string = null,
    public phoneNumber: number = null,
    public status: status = null
  ) {}
}

export type status = 'Active' | 'Inactive';
