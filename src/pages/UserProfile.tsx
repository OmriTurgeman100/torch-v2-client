import { useAuthContext } from "../Context/UseAuthContext";
import { fetch_user_details } from "../services/Get-User-Details";
import { useEffect, useState } from "react";

interface user_data {
  username: string;
  role: string;
  id: number;
}

export const UserProfile = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<user_data[]>([]);

  const get_data = async () => {
    try {
      const response = await fetch_user_details(user.token);
      setData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.token) {
      get_data();
    }
  }, [user.token]);

  return (
    <div>
      <h1>User Profile</h1>

      {data.map((user) => (
        <div key={user.id}>
          <h1>{user.role}</h1>
          <h2>{user.username}</h2>
        </div>
      ))}
    </div>
  );
};
