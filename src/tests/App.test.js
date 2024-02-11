import { render } from '@testing-library/react';

import React from 'react';
import App from '../App';

describe('Tests d\'intégration pour l\'app', () => {
  test("Rendu de l'app", () => {
    render(<App />);
  });
});