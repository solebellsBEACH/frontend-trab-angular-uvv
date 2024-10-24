export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public country: string,
    public gender: string,
    public acceptTerms: boolean,
    public imageURL: string
  ) {}
}
