import {SERVER_URL} from '../../utils/baseUrl';

export const fcmTokenApi = async (fcmToken, token) => {
  let postdata = new FormData();
  postdata.append('fcm_token', fcmToken);
  console.log('fcmTokenApi =>', fcmToken);
  const response = await fetch(SERVER_URL + '/user/savefcmtoken', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'POST',
    body: postdata,
  });
  // console.log(response);
  const resp = await response.json();
  console.log({resp});
  return resp;
};
