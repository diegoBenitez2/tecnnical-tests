import Header from '../components/Header/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {
    
  it('should render props', () => {
    //Arrange
    render(<Header 
      handleColorsRow={() => {}} 
      handleCountriesSort={() => {}} 
      handleRestoreUsers={() => {}}
      handleFilterByCountry={() => {}}
      />)
    //Assert
    expect(screen.getByText('Lista de usuarios')).toBeInTheDocument();
  })
  it('should click buttons and handler called', () => {
    //Arrange
    const handleColorsRowMock = jest.fn();
    const handleCountriesSortMock = jest.fn();
    const handleRestoreUsersMock = jest.fn();

    render(<Header 
      handleColorsRow={handleColorsRowMock} 
      handleCountriesSort={handleCountriesSortMock} 
      handleRestoreUsers={handleRestoreUsersMock}
      handleFilterByCountry={() => {}}
      />)

    //Act
    fireEvent.click(screen.getByText('Colorea filas'));
    fireEvent.click(screen.getByText('Ordena por país'));
    fireEvent.click(screen.getByText('Restaurar Usuarios'));

    //Assert
    expect(handleColorsRowMock).toHaveBeenCalledTimes(1);
    expect(handleCountriesSortMock).toHaveBeenCalledTimes(1);
    expect(handleRestoreUsersMock).toHaveBeenCalledTimes(1);
  })
});

