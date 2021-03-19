export class AppConstants {
  public static env = 'mx'; // nelumbo, mx

  public static get baseURL(): string {
    if (this.env == 'mx')
      return 'https://kg85vhonp8.execute-api.us-east-2.amazonaws.com/dev';
    if (this.env == 'nelumbo')
      return 'https://6mx1tdn5jb.execute-api.us-east-2.amazonaws.com/dev';
  }

  public static get loginURL(): string {
    if (this.env == 'mx') return 'http://d8augfgcn3cw7.cloudfront.net/login';
    if (this.env == 'nelumbo')
      return 'https://d3eyeduwkwyhna.cloudfront.net/login';
  }
}
