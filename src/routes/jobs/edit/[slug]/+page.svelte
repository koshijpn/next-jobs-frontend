<script>
    export let data;
    import { PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
    import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { getUserId, getTokenFromLocalStorage} from '../../../../utils/auth';

    let isLoading = false   
    let formErrors = {}

	const userId = getUserId();

	console.log(userId )
	console.log(data.job.user)


    function afterUpdateJobs(){
        goto('/')
    }

    async function updateJobs(evt){
        evt.preventDefault() 
    
    const inputData = {
			user: getUserId(),
			title: evt.target['title'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			employer: evt.target['employer'].value,
			location: evt.target['location'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirements'].value,
			applicationInstructions: evt.target['applicationInstructions'].value
		};
        isLoading = true

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
			},
			body: JSON.stringify(inputData)
		});

		if (resp.status === 200) {
			afterUpdateJobs();
		} else {
			const res = await resp.json;
			formErrors = res.data;
		}
        isLoading = false
    }

    async function deleteJob() {
    isLoading = true;

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLocalStorage()
        },
    });

    if (resp.status === 204) {
        // 削除成功時の処理
        // 例: 削除後に別のページにリダイレクトするなど
        goto('/');
    } else {
        console.error('Error:', resp.statusText);
        // エラー時の処理を追加
        // 例: エラーメッセージを表示するなど
    }
    isLoading = false;
}

</script>
<h1 class="text-center text-3xl font-bold display-flex align-middle">EDIT JOBS</h1>
{#if userId !== data.job.user}
<h2 class="text-center text-3l font-bold display-flex align-middle">You cannot change </h2>
{/if}
{#if userId === data.job.user}
<div>
	<form on:submit={updateJobs}>
		<div class="form-control w-full left px-36 mt-5">
			<label class="label" for="job title">
				<span class="label-text">Job Title</span>
			</label>
			<input
				type="text"
				name="title"
				class="input input-bordered w-full"
                value={data.job.title}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="minAnnualCompensation">
				<span class="label-text">Minimum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="minAnnualCompensation"
				class="input input-bordered w-full"
                value={data.job.minAnnualCompensation}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="maxAnnualCompensation">
				<span class="label-text">Maximum Annual Compensation</span>
			</label>
			<input
				type="text"
				name="maxAnnualCompensation"
				class="input input-bordered w-full"
                value={data.job.maxAnnualCompensation}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="employer">
				<span class="label-text">Company Name</span>
			</label>
			<input
				type="text"
				name="employer"
				class="input input-bordered w-full"
                value={data.job.employer}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="location">
				<span class="label-text">Job Location</span>
			</label>
			<input
				type="text"
				name="location"
				class="input input-bordered w-full"
                value={data.job.location}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea
				type="text"
				name="description"
				class="textarea textarea-bordered w-full h-56"
                value={data.job.description}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<input
				type="text"
				name="requirements"
				class="input input-bordered w-full"
                value={data.job.requirements}
				required
			/>
		</div>
		<div class="form-control w=full px-36 mt-5">
			<label class="label" for="applicationInstructions">
				<span class="label-text">Application Instructions</span>
			</label>
			<input
				type="text"
				name="applicationInstructions"
				class="input input-bordered w-full"
                value={data.job.applicationInstructions}
				required
			/>
		</div>
		<div class="form-control w-full px-36 mt-5">
            {#if isLoading}
            <div class="flex justify-center mt-5">
              <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
            </div>
          {:else}
            <button class="btn text 3xl">UPDATE JOB</button>
          {/if}
		</div>
	</form>
</div>
<div class="form-control w-full px-36 mt-5">
    {#if isLoading}
        <div class="flex justify-center mt-5">
            <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
        </div>
    {:else}
        <button class="btn text-3xl" on:click={deleteJob}>DELETE JOB</button>
    {/if}
</div>
{/if}




