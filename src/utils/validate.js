/**
 * Fonction de validation d'une chaîne de caractères contenant uniquement des lettres.
 * @param {string} input La chaîne de caractères à valider.
 * @returns {boolean} True si la chaîne est valide, sinon False.
 */
const validateStringOnly = (input) => {
  return /^[a-zA-ZÀ-ÿ]+$/.test(input.trim());
};

/**
 * Fonction de validation d'une adresse email.
 * @param {string} email L'adresse email à valider.
 * @returns {boolean} True si l'adresse email est valide, sinon False.
 */
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Fonction de validation d'un mot de passe non vide.
 * @param {string} password Le mot de passe à valider.
 * @returns {boolean} True si le mot de passe est non vide, sinon False.
 */
const validatePassword = (password) => {
  return password.trim() !== "";
};

/**
 * Fonction de validation d'un code postal à 5 chiffres.
 * @param {string} codePostal Le code postal à valider.
 * @returns {boolean} True si le code postal est valide, sinon False.
 */
const validateCodePostal = (codePostal) => {
  return /^\d{5}$/.test(codePostal.trim()) && /^\d+$/.test(codePostal.trim());
};

/**
 * Fonction de validation de la présence d'une date sélectionnée.
 * @param {Date | null} selectedDate La date sélectionnée.
 * @returns {boolean} True si une date est sélectionnée, sinon False.
 */
const validateDate = (selectedDate) => {
  return selectedDate !== null;
};

/**
 * Fonction de validation de l'âge (18 ans ou plus).
 * @param {Date | null} selectedDate La date de naissance sélectionnée.
 * @returns {boolean} True si l'âge est valide (18 ans ou plus), sinon False.
 */
const validateAge = (selectedDate) => {
  const currentDate = new Date();
  const birthDate = new Date(selectedDate);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    return false;
  } else {
    return true;
  }
};

/**
 * Fonction de validation du formulaire complet.
 * @param {Object} formData Les données du formulaire à valider.
 * @returns {Object} Un objet contenant un indicateur de validité du formulaire et les messages d'erreur associés.
 */
const validateForm = (formData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    ville,
    codePostal,
    selectedDate,
  } = formData;

  const isFirstNameValid = validateStringOnly(firstName);
  const isLastNameValid = validateStringOnly(lastName);
  const isVilleValid = validateStringOnly(ville);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isCodePostalValid = validateCodePostal(codePostal);
  const isDateValid = validateDate(selectedDate);
  const isAgeValid = validateAge(selectedDate);

  const errorMessages = {
    firstName: isFirstNameValid ? "" : "Le prénom est invalide.",
    lastName: isLastNameValid ? "" : "Le nom de famille est invalide.",
    email: isEmailValid ? "" : "L'adresse email est invalide.",
    password: isPasswordValid ? "" : "Le mot de passe est requis.",
    ville: isVilleValid ? "" : "La ville est invalide.",
    codePostal: isCodePostalValid
      ? ""
      : "Le code postal doit contenir exactement 5 chiffres.",
    selectedDate: isDateValid
      ? ""
      : "Vous devez être âgé de 18 ans ou plus pour vous inscrire.",
  };

  return {
    isFormValid:
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isVilleValid &&
      isCodePostalValid &&
      isDateValid &&
      isAgeValid,
    errorMessages: errorMessages,
  };
};

module.exports = {
  validateStringOnly,
  validateEmail,
  validatePassword,
  validateCodePostal,
  validateDate,
  validateAge,
  validateForm,
};