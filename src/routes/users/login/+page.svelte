<script>
  
  import { goto } from '$app/navigation';
  import { authenticateUser } from './../../../utils/auth.js';
  import Alert from '../../../comoponents/alert.svelte';
  let formErrors = {};

  async function signIn(evt){
    evt.preventDefault()

    const result = {
            email: evt.target['email'].value,
            password: evt.target['password'].value,
    }

    const res = await authenticateUser(result.email,result.password)

    if(res.success){
        goto("/"); 
    }else{
        console.log(res.res.message);
        let errorBox = document.getElementById("errorBox");
        errorBox.innerHTML = res.res.message;
    }
  }

  
  
</script>


<Alert/>
<main>
    <div class="p40">
        <h1 class="text-center text-xl" style = "margin-top:20px;">Log in</h1>
        <div class="text-center">
            <a class="link-hover italic text-xs" href="./new">You don't have an account? Click here to sign up instead.</a>
        </div>
        <div class="flex justify-center items-center mt-8">
            <form on:submit={signIn} class="w-1/3">
        
                <div class="form-control w-full">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
                    {#if 'email' in formErrors}
                    <label class="label" for="email">
                        <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
                    </label>
                    {/if}
                </div>
        
                <div class="form-control w-full">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
                    {#if 'password' in formErrors}
                    <p>error!</p>
                    <label class="label" for="password">
                        <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                    </label>
                    {/if}
                </div>
        
                <div class="form-control w-full mt-4">
                    <button class="btn btn-md">Login</button>
                </div>
                <span class="label-text-alt text-red-500" id="errorBox"></span>
                
            </form>
        </div>
    </div>
</main>