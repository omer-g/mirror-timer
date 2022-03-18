<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { addNoSleepListener, removeNoSleepListener } from "../stayAwake"; 
    
    const timerFormId = "timerForm";

    function fluff() {
        return 1;
    }
    // // KEEP DEVICE AWAKE WHILE TIMER IS IN FOCUS
    onMount(() => {
        addNoSleepListener(document.getElementById(timerFormId));
    });
    onDestroy(removeNoSleepListener);

    let timerRunning = false;

    const pad = (num: number) => {
        return num.toString().length === 1 ? "0" + num : num.toString();
    };

    const inSeconds = (minutes: number) => minutes * 60;
    const returnMinutes = (time: number) => Math.floor(time / 60);
    const returnSeconds = (time: number) => Math.floor(time % 60);
    
    let intervalId = 0;

    let initialMinutes = 1;
    let initialTime = inSeconds(initialMinutes);
    let duration: number; // in minutes - bound to input

    $: time = initialTime;
    $: minutes = pad(returnMinutes(time));
    $: seconds = pad(returnSeconds(time));

    $: if (time <= 0) {
        clearInterval(intervalId);
        timerRunning = false;
    }

    function updateTime(currentTime: number) {
        return currentTime - 1;
    }

    function startTimer(minutes: number) {
        clearInterval(intervalId);
        if (Number.isInteger(minutes) && minutes > 0) {
            time = inSeconds(minutes);
        }
        intervalId = window.setInterval(() => (time = updateTime(time)), 1000);
        timerRunning = true;
    }
</script>

<main>
    <div class="mirror timer">{minutes}:{seconds}</div>
    <form
    id={timerFormId}
    on:submit|preventDefault={() => startTimer(duration)}
    class="start"
    >
        {#if timerRunning === false}
            <input type="number" placeholder="MINUTES" bind:value={duration} />
            <input type="submit" class="buttons" value="START" />
        {/if}
    </form>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .timer {
        color: white;
        font-weight: 100;
        font-size: 150px;
    }

    .start {
        font-size: 20px;
        color: white;
        font-weight: 100;
    }

    .buttons {
        background-color: teal;
    }

    .mirror {
        transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        transform: scale(-1, 1);
    }
</style>
