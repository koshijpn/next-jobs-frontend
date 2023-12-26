<script>
    import humanize from 'humanize-plus';
    export let data;

</script>
<main>

    <h1 class="text-center font-thin" style="
        font-size: 24px;
        margin-top:20px;
        margin-bottom:20px;
    
    ">Find Your Next Job</h1>
    
    <div class="p40" style="
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    ">
        {#each data.jobs as job}
            <a class="card w-96 bg-base-100 shadow-xl" href="/jobs/{job.id}" style="margin:10px;">
                    <div class="card-body" style="overflow-wrap: anywhere;">
                        <div class="card-title" >{job.title}</div>
                        <div>
                            <div class="text-sm mt-1 ml-10">
                                {job.employer} . {job.location} .
                                <br>
                                <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
                            </div>
                            <div class="italic text-xs opacity-50 mt-2 ml-10"
                                >posted {new Date(job.created).toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div style="padding: var(--padding-card, 2rem);">
                                {job.description.slice(0, 240)}...
                            </div>
                        </div>
                    </div>
            </a>
    
                
        {/each}
    </div>
</main>

