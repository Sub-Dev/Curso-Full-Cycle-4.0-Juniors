interface ValidationStrategy {
  validate(value: string): boolean;
}

class EmailValidator implements ValidationStrategy {
  validate(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
  }
}

class PhoneValidator implements ValidationStrategy {
  validate(value: string): boolean {
    return /^\d{10}$/.test(value);
  }
}

class Validator {
  private strategies: Record<string, ValidationStrategy> = {};

  addStrategy(field: string, strategy: ValidationStrategy) {
    this.strategies[field] = strategy;
  }

  validate(field: string, value: string): boolean {
    const strategy = this.strategies[field];
    if (!strategy) {
      throw new Error(`No validator found for field: ${field}`);
    }
    return strategy.validate(value);
  }
}

const validator = new Validator();
validator.addStrategy("email", new EmailValidator());
validator.addStrategy("phone", new PhoneValidator());

console.log(validator.validate("email", "test@example.com")); // true
console.log(validator.validate("phone", "1234567890")); // true
