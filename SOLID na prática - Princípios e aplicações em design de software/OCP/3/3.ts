class Validator {
  validate(field: string, value: string): boolean {
    if (field === "email") {
      return /\S+@\S+\.\S+/.test(value);
    } else if (field === "phone") {
      return /^\d{10}$/.test(value);
    }
    return false;
  }
}
