import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza a tela de logon', () => {
  render(<App />);
  expect(screen.getByText(/faça seu logon/i)).toBeTruthy();
});
