<script lang="ts">
	let {
		jobId = '',
		jobTitle = ''
	}: {
		jobId?: string;
		jobTitle?: string;
	} = $props();
</script>

<input type="hidden" name="job_id" value={jobId} />
<input type="hidden" name="job_title" value={jobTitle} />
