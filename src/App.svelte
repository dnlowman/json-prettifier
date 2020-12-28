<script lang="ts">
import type { bubble } from "svelte/internal";

let jsonInput = '';
let prettified = '';
let textArea;
let isValid = true;

function onSubmit () {
    isValid = true;
    textArea.setCustomValidity("");
    try {
        const parsed = JSON.parse(jsonInput);
        prettified = JSON.stringify(parsed, null, 4);
        history.pushState(null, null, '');
    } catch (e: Error) {
        isValid = false;
        textArea.setCustomValidity("Please insert valid JSON");
    }
}

window.addEventListener('popstate', (event) => {
    prettified = '';
});

</script>

{#if prettified?.length === 0}
    <div id="container">
        <h1>JSON Prettifier</h1>
        <ol>
            <li>Enter JSON in the text area below</li>
            <li>Click 'Submit' to prettify!</li>
        </ol>
        {#if !isValid}
        <div class="errorMessage">
            <h3>Invalid JSON</h3>
            <p>The JSON you have entered is invalid, please correct it and try again!</p>
        </div>
        {/if}
        <form id="prettifierForm">
            <textarea bind:this={textArea} bind:value={jsonInput} class:invalid="{!isValid}" required />
            <input id="submitButton" type="button" on:click={onSubmit} value="Submit">
        </form>
    </div>
{/if}

{#if prettified?.length > 0}
<pre>{@html prettified}</pre>
{/if}

<style>
    h1 {
        margin-block-end: 0;
    }

    pre {
        margin: 0;
    }

    textarea {
        font-family: monospace;
        min-height: 20em;
        max-height: 40em;
        resize: vertical;
    }

    .invalid {
        border-color: #f5c6cb;
    }

    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #prettifierForm {
        display: flex;
        width: 60em;
        flex-direction: column;
    }

    #submitButton {
        width: 5em;
        align-self: center;
    }

    .errorMessage {
        color: #721c24;
        border-radius: 5px;
        background-color: #f8d7da;
        border-color: #f5c6cb;
        border-width: 1px;
        border-style: solid;
        margin-bottom: 10px;
        width: 58em;
        padding: 1em;
    }
</style>