import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fr } from 'date-fns/locale';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateForm } from '../utils/validate';

export default function SignUp() {
  let defaultTheme = createTheme();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ville: '',
    codePostal: '',
    selectedDate: null
  });
  const [errorMessages, setErrorMessages] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ville: '',
    codePostal: '',
    selectedDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Fonction pour gérer les changements de date dans le sélecteur de date.
   * @param {Date | null} date La date sélectionnée.
   */
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      selectedDate: date
    });
  };

  React.useEffect(() => {
    if (formData.firstName !== undefined) {
      setIsButtonDisabled(
        !(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.ville &&
          formData.codePostal &&
          formData.selectedDate
        )
      );
    }
  }, [formData]);

  /**
   * Vérifie que tous les champs sont valides avant de soumettre le formulaire.
   * Envoie une erreur toaster si le formulaire est invalide.
   * @param {Event} event L'événement de soumission de formulaire.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const { isFormValid, errorMessages } = validateForm(formData);

    setErrorMessages(errorMessages);

    if (isFormValid) {
      localStorage.setItem('userData', JSON.stringify(formData));

      toast.success('Inscription réussie !');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        ville: '',
        codePostal: '',
        selectedDate: null
      });
    } else {
      toast.error('Veuillez remplir tous les champs correctement.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={fr}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errorMessages.firstName}
                    helperText={errorMessages.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errorMessages.lastName}
                    helperText={errorMessages.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errorMessages.email}
                    helperText={errorMessages.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errorMessages.password}
                    helperText={errorMessages.password}
                  />
                </Grid>
                <Grid item xs={20}>
                  <DatePicker
                    value={formData.selectedDate}
                    onChange={handleDateChange}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        required
                        fullWidth
                        label="Date"
                        error={!!errorMessages.selectedDate}
                        helperText={errorMessages.selectedDate}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="ville"
                    label="ville"
                    type="ville"
                    id="ville"
                    autoComplete="new-ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    error={!!errorMessages.ville}
                    helperText={errorMessages.ville}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="codePostal"
                    label="code postal"
                    type="code postal"
                    id="codePostal"
                    autoComplete="new-code postal"
                    value={formData.codePostal}
                    onChange={handleInputChange}
                    error={!!errorMessages.codePostal}
                    helperText={errorMessages.codePostal}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isButtonDisabled}
              >
                S'inscrire
              </Button>
            </Box>
            <ToastContainer />
          </Box>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}