class DiscountCalculator {
  calculateDiscount(userType: string): number {
    if (userType === "Premium") {
      return 20;
    } else if (userType === "Regular") {
      return 10;
    } else {
      return 0;
    }
  }
}
