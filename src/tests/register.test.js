import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../components/Register';
import { toast } from 'react-toastify';


describe('SignUp component', () => {
  it('renders the sign up form', async () => {
    const { getByLabelText, getByText } = await render(<SignUp />);
    
    // Vérifie si les champs et le bouton sont présents
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email Address')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByLabelText('ville')).toBeInTheDocument();
    expect(getByLabelText('code postal')).toBeInTheDocument();
    expect(getByText('S\'inscrire')).toBeInTheDocument();
  });

  it('displays error messages for invalid form fields', async () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    
    // Remplir les champs du formulaire avec des données invalides
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John123' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: '' } }); // Champ vide
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'johnexample.com' } }); // Email invalide
    fireEvent.change(getByLabelText('Password'), { target: { value: '' } }); // Champ vide
    fireEvent.change(getByLabelText('ville'), { target: { value: '123' } }); // Valeur numérique
    fireEvent.change(getByLabelText('code postal'), { target: { value: 'abcde' } }); // Code postal invalide

    // Soumettre le formulaire
    fireEvent.click(getByText('S\'inscrire'));

    // Attendre que les messages d'erreur s'affichent
    await waitFor(() => {
      // Vérifier que les messages d'erreur sont affichés pour les champs invalides
      expect(getByText('Le prénom est invalide.')).toBeInTheDocument();
      expect(getByText('Le nom de famille est invalide.')).toBeInTheDocument();
      expect(getByText('L\'adresse email est invalide.')).toBeInTheDocument();
      expect(getByText('Le mot de passe est requis.')).toBeInTheDocument();
      expect(getByText('La ville est invalide.')).toBeInTheDocument();
      expect(getByText('Le code postal doit contenir exactement 5 chiffres.')).toBeInTheDocument();
      // Vous pouvez également vérifier d'autres messages d'erreur selon votre implémentation
    });
  });

  it('disables the sign up button if fields are not filled', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    
    // Vérifie que le bouton est désactivé initialement
    expect(getByText('S\'inscrire')).toBeDisabled();

    // Remplir quelques champs du formulaire
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john@example.com' } });

    // Vérifie que le bouton reste désactivé si tous les champs ne sont pas remplis
    expect(getByText('S\'inscrire')).toBeDisabled();

    // Remplir tous les champs requis du formulaire
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('ville'), { target: { value: 'Paris' } });
    fireEvent.change(getByLabelText('code postal'), { target: { value: '75000' } });

    // Vérifie que le bouton est désormais activé
    expect(getByText('S\'inscrire')).toBeEnabled();
  });

  it('saves data to local storage and displays success toaster on successful signup', async () => {
    const { getByLabelText, getByText, queryByText } = render(<SignUp />);
    
    // Remplir tous les champs du formulaire avec des données valides
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('ville'), { target: { value: 'Paris' } });
    fireEvent.change(getByLabelText('code postal'), { target: { value: '75000' } });
    fireEvent.change(getByLabelText('Date'), { target: { value: '2024-02-10' } });

    // Soumettre le formulaire
    fireEvent.click(getByText('S\'inscrire'));

    // Attendre que le toaster de succès s'affiche
    await waitFor(() => {
      expect(queryByText('Inscription réussie !')).toBeInTheDocument();
    });

    // Vérifier que les champs du formulaire sont vidés après inscription réussie
    expect(getByLabelText('First Name')).toHaveValue('');
    expect(getByLabelText('Last Name')).toHaveValue('');
    expect(getByLabelText('Email Address')).toHaveValue('');
    expect(getByLabelText('Password')).toHaveValue('');
    expect(getByLabelText('ville')).toHaveValue('');
    expect(getByLabelText('code postal')).toHaveValue('');
  });

  it('displays error toaster and corresponding error messages in red on failed signup', async () => {
    const { getByLabelText, getByText, queryByText } = render(<SignUp />);
    
    // Remplir quelques champs du formulaire avec des données invalides
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John123' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: '' } }); // Champ vide
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'johnexample.com' } }); // Email invalide
    fireEvent.change(getByLabelText('Password'), { target: { value: '' } }); // Champ vide
    fireEvent.change(getByLabelText('ville'), { target: { value: '123' } }); // Valeur numérique
    fireEvent.change(getByLabelText('code postal'), { target: { value: 'abcde' } }); // Code postal invalide

    // Soumettre le formulaire
    fireEvent.click(getByText('S\'inscrire'));

    // Attendre que le toaster d'erreur s'affiche
    await waitFor(() => {
      expect(queryByText('Veuillez remplir tous les champs correctement.')).toBeInTheDocument();
    });

    // Vérifier que les messages d'erreur sont affichés en rouge
    expect(getByText('Le prénom est invalide.')).toHaveStyle('color: red');
    expect(getByText('Le nom de famille est invalide.')).toHaveStyle('color: red');
    expect(getByText('L\'adresse email est invalide.')).toHaveStyle('color: red');
    expect(getByText('Le mot de passe est requis.')).toHaveStyle('color: red');
    expect(getByText('La ville est invalide.')).toHaveStyle('color: red');
    expect(getByText('Le code postal doit contenir exactement 5 chiffres.')).toHaveStyle('color: red');
  });
});
