class User {

  constructor(
    public age: number,
  ) { }

  public isAccessAllowed(): boolean {
    return this.age >= 18 && this.age <= 65;
  }

}


export { }