import {getVerificationHistory, inCodeOnBoard, logout, showLoader} from './actions';
import {SERVER_URL} from '../../utils/baseUrl';
import {store} from '../stores/configureStore';

import Snackbar from 'react-native-snackbar';

export const fcmTokenApi = async fcmToken => {
  try {
    const token = store.getState().auth.customerInfo?.access_token;
    const response = await fetch(SERVER_URL + '/user/savefcmtoken', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({fcm_token: fcmToken}),
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    console.log('fcmTokenError =>', error);
  }
};

export const storeIncodeInfoApi = async (accessToken, status) => {
  try {
    const customerInterviewId = store.getState().auth?.customerInterviewId;
    const customerToken = store.getState().auth?.customerToken;
    const faceMatchInfo = store.getState().auth?.faceMatchInfo;
    const customerUUID = store.getState().auth?.customerUUID;
    const frontIDInfo = store.getState().auth?.frontIDInfo;
    const backIDInfo = store.getState().auth?.backIDInfo;
    const selfieInfo = store.getState().auth?.selfieInfo;

    store.dispatch(showLoader(true));

    if (!faceMatchInfo?.existingUser) {
      const response = await fetch(SERVER_URL + '/user/saveCustomerProfile', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          status: status,
          id_back: backIDInfo,
          selfie: selfieInfo,
          id_front: frontIDInfo,
          type: 'INCODE_ONBORDING',
          customer_uuid: customerUUID,
          customer_token: customerToken,
          customer_interViewId: customerInterviewId,
        }),
      });
      const resp = await response.json();
      if (resp?.onboarding) {
        store.dispatch(inCodeOnBoard(resp?.onboarding));
      } else {
        Snackbar.show({
          text: 'ID card verification failed, kindly try again',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#575DFB',
        });
      }
    }
  } catch (error) {
    console.log('incode onboarding =>', error);
    Snackbar.show({
      text: 'Something went wrong',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#575DFB',
    });
  } finally {
    store.dispatch(showLoader(false));
  }
};

export const selfieVerificationApi = async data => {
  try {
    const userID = store.getState().auth.customerInfo?.id;
    const token = store.getState().auth.customerInfo?.access_token;

    const response = await fetch(SERVER_URL + '/user/selfieVerification', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        type: 'SELFIE_VERIFICATION',
        data: data,
      }),
    });
    const resp = await response.json();
    Snackbar.show({
      text: resp?.message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#575DFB',
    });
    getCustomerHistory(userID);
  } catch (error) {
    console.log('incode onboarding =>', error);
    Snackbar.show({
      text: 'Something went wrong',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#575DFB',
    });
  }
};

export const getCustomerHistory = async (id) => {
  try {
    const token = store.getState().auth.customerInfo?.access_token;

    const response = await fetch(
      SERVER_URL + `/user/customer_verification_logs/${id}?type=all`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );
    const resp = await response.json();
    if (resp?.data) {
      store.dispatch(getVerificationHistory(resp?.data));
    } else if (resp?.errors[0]?.message === 'E_UNAUTHORIZED_ACCESS: Unauthorized access') {
      store.dispatch(logout());
      Snackbar.show({
        text: 'You are unauthorized user. Please contact administrator.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#575DFB',
      });
    }
  } catch (error) {
    Snackbar.show({
      text: 'Something went wrong',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#575DFB',
    });
  }
};

export const logoutApi = async () => {
  try {
    const token = store.getState().auth.customerInfo?.access_token;

    const response = await fetch(
      SERVER_URL + `/user/logout`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        method: 'POST',
      },
    );
    const resp = await response.json();
    if (resp?.status) {
      store.dispatch(logout());
    }
  } catch (error) {
    Snackbar.show({
      text: 'Something went wrong',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#575DFB',
    });
  } finally {
    store.dispatch(logout());
  }
};
