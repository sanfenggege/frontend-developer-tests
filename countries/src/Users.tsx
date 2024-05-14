import React from 'react';
import { IUser } from './interface';

interface IUsersProps {
  usersProps: {
    users: IUser[];
  };
}

const Users: React.FC<IUsersProps> = ({ usersProps }) => {
  let { users } = usersProps;
  // console.log('users: ', users);
  users = users.sort((left: IUser, right: IUser) => {
    const dateA = new Date(left.registered.date).getTime();;
    const dateB = new Date(right.registered.date).getTime();;
    return dateB - dateA;
  });

  const listItems = users.map((user: IUser) => {
    return <div key={user.id.name}>
      {/* 姓名、性别、城市、州和注册日期 */}
      姓名：<span>{user.id.name}</span>
      性别：<span>{user.gender}</span>
      城市：<span>{user.location.city}</span>
      洲：<span>{user.location.state}</span>
      注册日期：<span>{user.registered.date}</span>
    </div>
  });

  return (
    <div className="users">
      Users List:
      {listItems}
    </div>
  );
}

export default Users;
