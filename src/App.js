import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Используем useEffect с пустым массивом зависимостей []
  React.useEffect(() => {
    fetch('/api/users') // Убрал пробел перед URL
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(json => {
        setUsers(json.data);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Пустой массив [] = запрос выполнится только один раз при монтировании

  return (
    <div className="App">
      {/* Передаём состояние загрузки в компонент Users */}
      <Users items={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;