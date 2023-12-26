<script>
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from 'humanize-plus';
    export let data;
	import { getUserId,isLoggedInStore } from "../../../utils/auth";

    const userId = getUserId();

</script>

<main>
    <div class="p40">
        <div class="flex" style="overflow-wrap: anywhere;">
            <div class="flex-1">
                <h1 class="text-3xl font-extrabold ml-5">{data.job.title}</h1>
                <p class="text-xl ml-5">{data.job.employer}</p>
            </div>
        </div>
    
        <div class="flex flex-row w-full mt-8" style="overflow-wrap: anywhere;"az>
            <div class="basis-2/3 prose max-w-none w-full ml-5" >
                <h2 class="text-xl font-thin">Description</h2>
                <SvelteMarkdown source={data.job.description} />
                <div class="mt-6 ml-5" />
                <h2 class="text-xl font-thin">Requirements</h2>
                <SvelteMarkdown source={data.job.requirements} />
                <div class="mt-6" />
                <h2 class="text-xl font-thin">How to Apply?</h2>
                <p class="m">{data.job.applicationInstructions}</p>
            </div>
            <div class="basis-1/3 ml-4">
                <h2 class="text-xl font-thin" style="margin-bottom: 1em;">Location</h2>
                <p>{data.job.location}</p>
                <div class="mt-6" />
                <h2 class="text-xl font-thin" style="margin-bottom: 1em;">Salary Range</h2>
                <p>
                    USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
                        data.job.maxAnnualCompensation
                    )}
                </p>
                {#if userId === data.job.user}
                {#if $isLoggedInStore}
                <a class="link-hover text-xs uppercase btn ml-20 mt-10 "
                  href="./edit/{data.job.id}">Edit Job</a>
                  {/if}
                  {/if}
            </div>
        </div>
    </div>
</main>