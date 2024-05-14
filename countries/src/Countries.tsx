import React, { useState, useEffect, useMemo } from 'react';
import { ICountries, IUser } from './interface';
import Users from './Users';

const Countries = () => {
  const CountriesData: ICountries[] = [];
  const [list, setList] = useState(CountriesData);

  useEffect(() => {
    getCountriesList();
  }, []);

  const showUsers = (target: ICountries) => {
    console.log('country: ', target);
    const newList = list.filter((listItem) => {
      if (listItem.country === target.country) {
        listItem.showUsers = true;
      } else {
        listItem.showUsers = false;
      }
      return listItem;
    });
    setList(newList);
  }

  const getCountriesList = () => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch data: ', data);
        const listMap: ICountries[] = data.results.reduce((curr: ICountries[], user: IUser) => {
          const country = user.location.country;
          if (curr && curr.length && curr.findIndex((item: ICountries) => item.country === country) > -1) {
            const index = curr.findIndex((item: ICountries) => item.country === country);
            curr[index].users.push(user);
          }

          if ((curr && curr.length && curr.findIndex((item: ICountries) => item.country === country) === -1) || (!curr.length)) {
            curr.push({
              country,
              showUsers: false,
              users: [user],
            });
          }
          return curr;
        }, []).sort((left: ICountries, right: ICountries) => right.users.length - left.users.length);
        setList(listMap);
      });
  }
  const listItems = list.map((listItem: ICountries) => {
    return (<li key={listItem.country}>
      {listItem.country}
      <button onClick={() => showUsers(listItem)}>
        查看用户列表
      </button>
      {listItem.showUsers && <Users usersProps={{ users: listItem.users }} />}
    </li>);
  });

  return (
    <div className="countries">
      Countries List:
      <ul>{listItems}</ul>
    </div>
  );
}

export default Countries;
