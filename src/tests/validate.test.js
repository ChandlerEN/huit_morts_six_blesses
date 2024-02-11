import {
  validateStringOnly,
  validateEmail,
  validatePassword,
  validateCodePostal,
  validateDate,
  validateAge,
  validateForm,
} from "../utils/validate";

describe("Validation Functions", () => {
  describe("validateStringOnly", () => {
    it("should return true for valid strings", () => {
      expect(validateStringOnly("John")).toBe(true);
      expect(validateStringOnly("Doe")).toBe(true);
    });

    it("should return false for invalid strings", () => {
      expect(validateStringOnly("John123")).toBe(false);
      expect(validateStringOnly("Doe@")).toBe(false);
    });
  });

  describe("validateEmail", () => {
    it("should return true for valid email addresses", () => {
      expect(validateEmail("john@example.com")).toBe(true);
      expect(validateEmail("jane.doe@example.co.uk")).toBe(true);
    });

    it("should return false for invalid email addresses", () => {
      expect(validateEmail("john@example")).toBe(false);
      expect(validateEmail("jane@doe")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should return true for non-empty passwords", () => {
      expect(validatePassword("password123")).toBe(true);
      expect(validatePassword("secret")).toBe(true);
    });

    it("should return false for empty passwords", () => {
      expect(validatePassword("")).toBe(false);
    });
  });

  describe("validateCodePostal", () => {
    it("should return true for valid postal codes", () => {
      expect(validateCodePostal("12345")).toBe(true);
    });

    it("should return false for invalid postal codes", () => {
      expect(validateCodePostal("1234")).toBe(false);
      expect(validateCodePostal("1234567")).toBe(false);
      expect(validateCodePostal("abcde")).toBe(false);
    });
  });

  describe("validateDate", () => {
    it("should return true for non-null dates", () => {
      expect(validateDate(new Date())).toBe(true);
    });

    it("should return false for null dates", () => {
      expect(validateDate(null)).toBe(false);
    });
  });

  describe("validateAge", () => {
    it("should return true for adults", () => {
      const currentDate = new Date();
      const birthDate = new Date(
        currentDate.getFullYear() - 20,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      expect(validateAge(birthDate)).toBe(true);
    });

    it("should return false for minors", () => {
      const currentDate = new Date();
      const birthDate = new Date(
        currentDate.getFullYear() - 10,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      expect(validateAge(birthDate)).toBe(false);
    });

    it('should decrement age if birth month is later in the current year', () => {
      const currentDate = new Date(2024, 1, 8); // 8th February 2024
      const birthDate = new Date(2006, 2, 15); // 15th March 2006
      // La différence de mois est positive mais le jour de naissance n'est pas encore passé
      expect(validateAge(birthDate)).toBe(false); // L'âge devrait être de 17 ans
    });
  });

  describe("validateForm", () => {
    it("should validate all fields in the form", () => {
      const formData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "password123",
        ville: "Paris",
        codePostal: "12345",
        selectedDate: new Date(1990, 0, 1),
      };
      const validationResult = validateForm(formData);
      expect(validationResult.isFormValid).toBe(true);
    });

    it("should return error messages for invalid fields", () => {
      const formData = {
        firstName: "",
        lastName: "",
        email: "john@example",
        password: "",
        ville: "123",
        codePostal: "abc",
        selectedDate: null,
      };
      const validationResult = validateForm(formData);
      expect(validationResult.isFormValid).toBe(false);
      expect(validationResult.errorMessages.firstName).toBeTruthy();
      expect(validationResult.errorMessages.lastName).toBeTruthy();
      expect(validationResult.errorMessages.email).toBeTruthy();
      expect(validationResult.errorMessages.password).toBeTruthy();
      expect(validationResult.errorMessages.ville).toBeTruthy();
      expect(validationResult.errorMessages.codePostal).toBeTruthy();
      expect(validationResult.errorMessages.selectedDate).toBeTruthy();
    });
  });
});
