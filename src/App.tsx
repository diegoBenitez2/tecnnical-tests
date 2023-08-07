import { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react'
import type { User, ItemSort } from './types.d'
import ApiFetch from './api'
import './App.css'
import { UserTable } from './components/UsersTable';

declare function structuredClone<T>(object: T): T;


function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isZebraRow, setIsZebraRow] = useState<boolean>(false)
  const [isSorted, setIsSorted] = useState<boolean>(false)
  const [itemSort, setItemSort] = useState<keyof ItemSort | null >(null)
  const [filterCountry, setFilterCountry] = useState<string | null >(null)
  const usersRestore = useRef<User[]>([]);


  const getItemToSort = (user: User):ItemSort =>  ({
    country: user.location.country,
    name: user.name.first,
    lastname: user.name.last,
  })
  const handleColorsRow = () => {
    setIsZebraRow(!isZebraRow)
  }
  
  const handleDeleteRow = (id:string) => {
    const userFiltererd = users.filter((user: User) => user.email !== id);
    setUsers(userFiltererd);
  }

  const handleFilterByCountry = (filterCountry: ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(filterCountry.target.value)
  }

  const handleRestoreUsers = () => {
    console.log('restore')
    setUsers(usersRestore.current)
  }

  const handleCountriesSort = () =>  {
    console.log('sort')
    setIsSorted(isSorted => !isSorted)
  }


  const handleItemSort = (item:keyof ItemSort) => {
    setItemSort(item)
  }
  const filterByCountry = useMemo(() => {
    console.log('filter')
    return filterCountry 
      ? users
        .filter((users: User) => users.location.country.toLowerCase().includes(filterCountry))
      : users;
  }, [filterCountry, users])

  const sortAndFilteredUsers = useMemo((): User[] => {
    console.log('sorted')
    return isSorted 
          ?  structuredClone(filterByCountry)
            .sort((a:User, b:User) => a.location.country
                .localeCompare(b.location.country, 'en', { sensitivity: 'base' }))
          : itemSort 
            ? structuredClone(filterByCountry)
                  .sort((a:User, b:User) => getItemToSort(a)[itemSort]
                    .localeCompare(getItemToSort(b)[itemSort], 'en', { sensitivity: 'base' }))
          :filterByCountry;
  }, [filterByCountry, isSorted, itemSort])



  const usersItems =  sortAndFilteredUsers;
  
  useEffect(() => {
    ApiFetch()
      .then((users) => {
        setUsers(users)
        usersRestore.current = users;
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <main>
      <header>
        <h1>Lista de usuarios</h1>
        <nav style={{marginBottom: '30px'}}>
          <button onClick={handleColorsRow}>Colorea filas</button>
          <button onClick={handleCountriesSort}>Ordena por país</button>
          <button onClick={handleRestoreUsers}>Restaurar Usuarios</button>
          <label>
            <input type="text" placeholder="Filtrar por pais" onInput={handleFilterByCountry}/>
          </label>
        </nav>
      </header>
      <section>
        <UserTable 
          users={usersItems}
          isZebraRow={isZebraRow}
          handleDeleteRow={handleDeleteRow}
          handleItemSort={handleItemSort} /> 
      </section>
    </main>
  )
}

export default App
