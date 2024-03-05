<script lang="ts">
  import Button from './Button.svelte';

  const buttonStyle = `
    --button-light-bg: transparent;
    --button-light-bg-hover: rgba(var(--primary-lighter), 0.12);
    --button-light-bg-active: rgba(var(--primary-lighter), 0.20);
    --button-light-border-color: transparent;
    height: 40px;
    font-weight: 600;
  `;
</script>

<div class="quick-escape">
  <Button style={buttonStyle} href="/">
    <span>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
        />
      </svg>
      Return home
    </span>
  </Button>
  <div
    onclick="window.open('https://weather.com/'); location.replace('https://www.google.com/search?q=weather.com');"
  >
    <Button style={buttonStyle}>
      <span>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13.34,8.17C12.41,8.17 11.65,7.4 11.65,6.47A1.69,1.69 0 0,1 13.34,4.78C14.28,4.78 15.04,5.54 15.04,6.47C15.04,7.4 14.28,8.17 13.34,8.17M10.3,19.93L4.37,18.75L4.71,17.05L8.86,17.9L10.21,11.04L8.69,11.64V14.5H7V10.54L11.4,8.67L12.07,8.59C12.67,8.59 13.17,8.93 13.5,9.44L14.36,10.79C15.04,12 16.39,12.82 18,12.82V14.5C16.14,14.5 14.44,13.67 13.34,12.4L12.84,14.94L14.61,16.63V23H12.92V17.9L11.14,16.21L10.3,19.93M21,23H19V3H6V16.11L4,15.69V1H21V23M6,23H4V19.78L6,20.2V23Z"
          />
        </svg>
        Quick escape
      </span>
    </Button>
  </div>
</div>

<style>
  div.quick-escape {
    display: flex;
    flex-direction: row;
    background-color: #f0f0f0;
    border: 1px solid var(--border-dark);
    border-radius: var(--radius);
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  span {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  svg {
    width: 18px;
  }
</style>
