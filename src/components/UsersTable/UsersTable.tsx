import type { User, Picture, ItemSort, Name, Location } from "@/types";
import './UsersTable.css'

type InfoUser = Pick<User, 'email'> 
  & { picture: Pick<Picture, 'thumbnail'>} 
  & { name: Pick<Name, 'first' | 'last'>} 
  & { location: Pick<Location, 'country'>};

interface UserTableProps {
  users: InfoUser[];
  isZebraRow: boolean;
  handleItemSort: (item: keyof ItemSort) => void;
  handleDeleteRow: (email: string) => void;
}


const  UserTable: React.FC<UserTableProps>  = ({ 
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

export default UserTable;