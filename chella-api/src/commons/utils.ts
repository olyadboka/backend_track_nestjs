import jwt from 'jsonwebtoken';

export class CommonUtils {
  static generateReferralCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let Code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      Code += characters[randomIndex];
    }
    return Code.toLocaleUpperCase();
  }

  static generateJwtToken(jwtData) {
    const generatedToken = jwt.sign(jwtData, process.env.JWT_SECRET!, {
      expiresIn: '10m',
    });
    return generatedToken;
  }
}
