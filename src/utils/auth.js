import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const isLoggedInStore = writable(false);

const emptyAuth = {
  "token": "",
  "userId": ""
}

export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  isLoggedInStore.set(false);
  goto("/"); 
  return true
}

export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function isLoggedIn() {
  
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      isLoggedInStore.set(true)
      return true
    }

    return false
  } catch {
    return false
  }
}

export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: email,
        password
      })
    }
  );

  const res = await resp.json();

  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.token,
      "userId": res.record.id
    }));

    isLoggedInStore.set(true);

    return {
      success: true,
      res: res
    }
  }

  return {
    success: false,
    res: res
  }
}


export async function showuser() {
  let userid = getUserId();
  let user = {};

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records/' + userid, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenFromLocalStorage()
    },
  });

  const res = await resp.json();
  if (resp.status === 200) {
    user = res; // レスポンスをuserに設定
  }

  return user;
}