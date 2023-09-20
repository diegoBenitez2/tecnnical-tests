import Header from '../components/Header/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {
  const handleColorsRowMock = jest.fn();
  const handleCountriesSortMock = jest.fn();
  const handleRestoreUsersMock = jest.fn();
  beforeEach(() => {
    render(<Header 
      handleColorsRow={handleColorsRowMock} 
      handleCountriesSort={handleCountriesSortMock} 
      handleRestoreUsers={handleRestoreUsersMock}
      handleFilterByCountry={() => ({})}
      />)
    console.log('beforeEach');
  })
console.log('describe Header');
describe('Header props', () => {
  console.log('describe Header props');
  it('should render props', () => {
  console.log('test 1');
    //Assert
    expect(screen.getByText('Lista de usuarios')).toBeInTheDocument();
  })
});

describe('Header event', () => {
  console.log('describe Header event');
  it('should click buttons and handler called', () => {
    console.log('test 2');
    //Act
    fireEvent.click(screen.getByText('Colorea filas'));
    fireEvent.click(screen.getByText('Ordena por país'));
    fireEvent.click(screen.getByText('Restaurar Usuarios'));
  
    //Assert
    expect(handleColorsRowMock).toHaveBeenCalledTimes(1);
    expect(handleCountriesSortMock).toHaveBeenCalledTimes(1);
    expect(handleRestoreUsersMock).toHaveBeenCalledTimes(1);
  })
})
})