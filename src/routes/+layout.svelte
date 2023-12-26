<script>
  import logo from "../static/logo.png"
  import "../app.css";
  import { onMount } from 'svelte';
  import { isLoggedInStore, logOut, showuser } from '../utils/auth';

  let user = {};

	// トップレベルでリアクティブ宣言を行う
	$: user;

    // isLoggedInStoreが変更されたときにユーザー情報を更新
    $: if ($isLoggedInStore) {
    updateUserInfo( user.username);
  }


  // ユーザー情報をロードする関数
  async function updateUserInfo() {
    // ユーザーがログインしているか確認
    const loggedIn = await isLoggedInStore;

    if (loggedIn) {
      // ログインしている場合はユーザー情報を取得
      const userData = await showuser();
      // console.log('User Data:', userData);

      // ユーザー情報を更新
      user = userData;
    }
  }

  // マウント時にユーザー情報をロード
  onMount(() => {
    updateUserInfo();
  });

  // isLoggedInStoreが変更されたときにユーザー情報を更新
  $: {
    updateUserInfo();
  }
</script>



<header style = "
background-color:#000;
">
  <nav class="flex">
    <a style = "margin-left:10px;"
      href="/"><img src={logo} alt="download icon" style = "
      max-height:100px;
      "
      /></a>
      

      <a class="hover-line font-thin" 
      style = "margin-right:10px;
              margin-left: auto;
              top: 0;
              bottom: 0;
              margin-top: auto;
              margin-bottom: auto;
              color:#fff;" 
      href="http://localhost:8080/_/"
      target="_blank">DB</a>

      {#if $isLoggedInStore}
        <a class="hover-line font-thin " 
        style = "margin-right:10px;

                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                color:#fff" 
        href="/jobs/new">Post Jobs</a>

        <a class="hover-line font-thin " 
        style = "margin-right:10px;

                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                color:#fff" 
        href="/users/edit">Edit User</a>

        <button class="hover-line font-thin " 
          style = "margin-right:10px;
          top: 0;
          bottom: 0;
          margin-top: auto;
          margin-bottom: auto;
          color:#fff" 
          on:click={logOut}>Logout</button>
      {:else}
      <a class="hover-line font-thin " 
      style = "margin-left:10px;
              margin-right:10px;
              top: 0;
              bottom: 0;
              margin-top: auto;
              margin-bottom: auto;
              color:#fff" 
      href="/users/new">Signup</a>

    <a class="hover-line font-thin "  
      style = "margin-left:10px;
      margin-right:10px;
      top: 0;
      bottom: 0;
      margin-top: auto;
      margin-bottom: auto;
      color:#fff" 
      href="/users/login">login</a>
      {/if}

  </nav>

  {#if $isLoggedInStore}
  <p style = "margin-left:10px;
  margin-right:10px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  padding-top:10px;
  padding-bottom:10px;
  color:#fff"
  class="font-thin">HELLO! {user.username}</p>
  {/if}

</header>

<slot/>
