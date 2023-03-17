import axios from "axios";
import User from "../models/user";
import token from "../auth/keycloak_token";

export const getUsers = async (): Promise<User[]> => {
  var users: User[] = [];
  try {
    const access_token = await token();
    var config = {
      method: "get",
      url: "https://51.83.69.138:8443/admin/realms/Bewebcademy/users/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    //return user list from keycloak
    const response = await axios(config);
    const data = response.data;
    data.forEach((user: any) => {
      console.log(user);
      users.push({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    });
    return users;
  } catch (error) {
    console.log(error);
    return users;
  }
};

export const getUser = async (id: string): Promise<User> => {
  var user: User = {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  try {
    const access_token = await token();
    var config = {
      method: "get",
      url: "https://51.83.69.138:8443/admin/realms/Bewebcademy/users/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    //return user list from keycloak
    const response = await axios(config);
    const data = response.data;
    data.forEach((user: any) => {
      user = ({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    });
    return user;
  } catch (error) {
    console.log(error);
    return user;
  }
};

export const updateUser = async (id: string, user: User) => {
  console.log(user);
  
  try {
    const access_token = await token();
    try {
      var data = JSON.stringify(user);

      var config = {
        method: "put",
        url: "https://51.83.69.138:8443/admin/realms/Bewebcademy/users/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function () {
          console.log("User updated");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const access_token = await token();
    try {
      var config = {
        method: "delete",
        url: "https://51.83.69.138:8443/admin/realms/Bewebcademy/users/" + id,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      };

      axios(config)
        .then(function () {
          console.log("User deleted");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
