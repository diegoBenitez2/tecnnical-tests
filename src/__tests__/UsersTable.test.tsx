import UserTable from "../components/UsersTable/UsersTable";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

describe('UsersTable', () => {
  const props = {
    users: [
      {
        name: {
          first: 'first',
          last: 'last',
        },
        location: {
          country: 'country',        
        },
        email: 'email',
        picture: {
          thumbnail: 'thumbnail'
        },

      },
      {
        name: {
          first: 'first2',
          last: 'last2',
        },
        location: {
          country: 'country2',        
        },
        email: 'email2',
        picture: {
          thumbnail: 'thumbnail'
        },

      }
  ],
    isZebraRow: false,
    handleItemSort: jest.fn((field: string) => field),
    handleDeleteRow: jest.fn((email: string) => email),
  }
  describe('UsersTable props', () => {
    it('should render props', () => {
      //Arrage
      render(<UserTable {...props} />);
      //Assert
      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.getByText('last')).toBeInTheDocument();
      expect(screen.getByText('country')).toBeInTheDocument();
    })
    it('should change zebra row', () => {
      //Arrage
      props.isZebraRow = true;
      render(<UserTable { ...props } />);
      screen.debug();
      //Assert
      expect(screen.getAllByRole('row')[1]).toHaveStyle('background: rgb(51, 51, 51)');
      expect(screen.getAllByRole('row')[2]).toHaveStyle('background: rgb(68, 68, 68)');
    });
    it('should call handleItemSort', () => {
      //Arrage
      render(<UserTable {...props} />);
      //Act
      screen.getByRole('button', { name: 'Nombre' }).click();
      screen.getByRole('button', { name: 'Apellido' }).click();
      screen.getByRole('button', { name: 'País' }).click();
      //Assert
      expect(props.handleItemSort).toHaveBeenNthCalledWith(1, 'name');
      expect(props.handleItemSort).toHaveBeenNthCalledWith(2, 'lastname');
      expect(props.handleItemSort).toHaveBeenNthCalledWith(3, 'country');
    });
    it('should call handleDeleteRow', () => {
      //Arrage
      render(<UserTable {...props} />);
      //Act
      screen.getAllByRole('button', { name: 'Borrar' })[0].click();
      screen.getAllByRole('button', { name: 'Borrar' })[1].click();

      //Assert
      expect(props.handleDeleteRow).toHaveBeenNthCalledWith(1, 'email');
      expect(props.handleDeleteRow).toHaveBeenNthCalledWith(2, 'email2');
    });

  })
})