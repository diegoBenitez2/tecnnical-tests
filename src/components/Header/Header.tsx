
interface HeaderProps {
  handleColorsRow: () => void;
  handleCountriesSort: () => void;
  handleRestoreUsers: () => void;
  handleFilterByCountry: (filterCountry: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header:React.FC<HeaderProps> = ({
  handleColorsRow,
  handleCountriesSort,
  handleRestoreUsers,
  handleFilterByCountry
}) => {
  return(
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
  )
}

export default Header