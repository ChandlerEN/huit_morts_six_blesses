// // Fonction de validation du prénom
//  const validateFirstName = (firstName) => {
//     return /^[a-zA-ZÀ-ÿ]+$/.test(firstName.trim());
//   };

//   // Fonction de validation du nom de famille
//    const validateLastName = (lastName) => {
//     return /^[a-zA-ZÀ-ÿ]+$/.test(lastName.trim());
//   };

//   // Fonction de validation de la ville
//    const validateVille = (ville) => {
//     return /^[a-zA-ZÀ-ÿ]+$/.test(ville.trim());
//   };

// Fonction de validation de la ville

const validateStringOnly = (input) => {
  return /^[a-zA-ZÀ-ÿ]+$/.test(input.trim());
};

// Fonction de validation de l'email
const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Fonction de validation du mot de passe
const validatePassword = (password) => {
  return password.trim() !== "";
};

// Fonction de validation du code postal
const validateCodePostal = (codePostal) => {
  return /^\d{5}$/.test(codePostal.trim()) && /^\d+$/.test(codePostal.trim());
};

// Fonction de validation de la date de naissance
const validateDate = (selectedDate) => {
  return selectedDate !== null;
};

// Fonction de validation de l'âge
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

// Fonction de validation du formulaire complet
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