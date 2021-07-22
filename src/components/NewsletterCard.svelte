<style>
  .card {
    width: 242.5px;
    margin-bottom: 10px;
    padding: 20px;
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    background-color: white;
  }
  @media (max-width: 540px) {
    .card {
      width: 100%;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  img {
    border: 2px solid var(--border-dark);
    border-radius: var(--radius);
  }
  .actions {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
  }
  .sub-button-form {
    position: absolute;
    left: auto;
    top: 0;
    right: 0;
    bottom: auto;
    background-color: white;
  }
  .frequency {
    margin-top: 10px;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 12px;
    text-align: left;
    letter-spacing: 1px;
    text-transform: none;
  }
  h3 {
    margin: 0 0 6px 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
  p {
    margin: 0 0 10px 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 15px;
    line-height: 22px;
  }
</style>

<script lang="ts">
  import IconButton from './IconButton.svelte';

  export let icon: string;
  export let listId: string;
  export let name: string;
  export let description: string;
</script>

<div class={'card'}>
  <div class={'top'}>
    <img src={icon} loading={'lazy'} width={'100'} height={'100'} alt={''} />
    <div class={'actions'}>
      <div class={'sub-button-form'}>
        <div class="emailoctopus-form-wrapper">
          <p class="emailoctopus-success-message" style="display: none;" />
          <p class="emailoctopus-error-message" style="display: none;" />
          <form
            action={`https://emailoctopus.com/lists/${listId}/members/embedded/1.3/add`}
            method={'post'}
            target={'formTarget'}
            class="emailoctopus-form">
            <div class="emailoctopus-form-row" style="display: none;">
              <label for="field_0">Email address</label>
              <input id="field_0" name="field_0" type="email" placeholder="" required />
            </div>
            <!-- EmailOctopus needs this -->
            <div aria-hidden="true" class="emailoctopus-form-row-hp" style="display: none;">
              <input
                type="text"
                name="hpc4b27b6e-eb38-11e9-be00-06b4694bee2a"
                tabindex="-1"
                autocomplete="nope" />
            </div>
            <input type="hidden" name="successRedirectUrl" />
            <!-- submit button -->
            <button
              type="submit"
              style="display: none;"
              on:click|preventDefault={() => console.log('submit')}>Subscribe</button>
            <div>
              <IconButton isOutlined on:click
                ><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
      <IconButton isOutlined disabled>
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </IconButton>
    </div>
  </div>
  <div class={'frequency'}>Every Sunday</div>
  <h3>{name}</h3>
  <p>{description}</p>
</div>
