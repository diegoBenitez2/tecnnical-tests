import type { User, ItemSort } from '../types.d'
import './UsersTable.css'

interface UserTableProps {
  users: User[];
  isZebraRow: boolean;
  handleItemSort: (item: keyof ItemSort) => void;
  handleDeleteRow: (email: string) => void;
}


export const  UserTable: React.FC<UserTableProps>  = ({ 
  users,
  isZebraRow,
  handleItemSort,
  handleDeleteRow }) => {

  const backgrounsColor = (idx: number):string => {
    return idx % 2 === 0 ? '#333333' : '#444444'
  }

  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th><button onClick={() => handleItemSort('name')}>Nombre</button></th>
          <th><button onClick={() => handleItemSort('lastname')}>Apellido</button></th>
          <th><button onClick={() => handleItemSort('country')}>País</button></th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        { users.map((user, idx) => (
          <tr key={idx} style={{ background: isZebraRow ? backgrounsColor(idx) : '' }}>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handleDeleteRow(user.email)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}