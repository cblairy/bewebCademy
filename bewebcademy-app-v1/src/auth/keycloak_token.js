import axios from 'axios';
import qs from 'qs';
const token = async () => {
  var token = null;
  var data = qs.stringify({
    'username': 'admin',
    'password': 'admin123',
    'grant_type': 'password',
    'client_id': 'react-client'
  });
  var config = {
    method: 'post',
    url: 'https://51.83.69.138:8443/realms/Bewebcademy/protocol/openid-connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  await axios(config)
    .then(function (response) {
      token = response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
  return token;
}
export default token;