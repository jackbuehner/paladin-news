import { writable } from 'svelte/store';
import type { Subscriber } from 'svelte/store';

/**
 * Helper class for managing an applause button.
 */
class Applause {
  /**
   * The id of the document receiving applause. It is used to store the client's applause in `localstorage`.
   */
  id: string;
  /**
   * A writable svelte store to store the number of claps.
   * Can be accessed with the shorthand reactve assignement.
   *
   * ```js
   * const maxClaps = 5;
   * const initialClaps = 12;
   *
   * const claps = new Applause('document-id', maxClaps, initialClaps);
   *
   * console.log('Number of claps: ', $claps) // Output: 'Number of claps: 12'
   *
   * ```
   */
  clapsStore = writable(0);
  /**
   * Writable svelte store to store the number of claps from the
   * current client.
   */
  clientClapsStore = writable(0);
  /**
   * Whether the client is allowed to clap. It becomes false when the
   * client claps exceed to maximimum allowed client claps, `maxClaps`
   */
  _canClap = false;
  /**
   * Whether this client has clapped as least once.
   */
  hasClappedStore = writable(false);
  /**
   * The maximum number of claps allowed per client.
   */
  maxClaps = 5;
  _holdInterval: NodeJS.Timer | null = null;
  _holdTimeout: NodeJS.Timeout | null = null;

  constructor(id: string, maxClaps?: number, initialClaps?: number) {
    this.id = id;
    if (maxClaps) this.maxClaps = maxClaps;
    if (initialClaps) this.clapsStore.set(initialClaps);
    if (this._clientClaps < this.maxClaps) this._canClap = true;
    this.clientClapsStore.set(this._clientClaps);
  }

  get _clientClaps() {
    return parseInt(localStorage.getItem(`claps.${this.id}`) || '0');
  }

  /**
   * Set the number of claps made by the current client.
   * Track the claps in `localstorage` and in `clientClapsStore`.
   * @param claps
   */
  setClientClaps(claps: number) {
    localStorage.setItem(`claps.${this.id}`, `${claps}`);
    this.clientClapsStore.set(claps);
    this.hasClappedStore.set(claps !== 0);

    if (this._clientClaps >= this.maxClaps) {
      this._canClap = false;
    } else {
      this._canClap = true;
    }
  }

  /**
   * Add a single new clap.
   */
  once() {
    if (this._clientClaps < this.maxClaps) {
      this.setClientClaps(this._clientClaps + 1);
      this.clapsStore.update((claps) => claps + 1);
    }
  }

  /**
   * Clap continuously until the interval is cleared. A new clap
   * is added every 150 ms.
   */
  hold() {
    this._holdInterval = setInterval(() => {
      if (this._clientClaps >= this.maxClaps) {
        this.onMouseUp();
        return;
      }

      this.setClientClaps(this._clientClaps + 1);
      this.clapsStore.update((claps) => claps + 1);
    }, 150);
  }

  /**
   * Start clapping on mouse down.
   */
  onMouseDown() {
    // always clap once
    this.once();

    // set a timeout to continuously clap after 200ms
    // (cleared on mouseup)
    this._holdTimeout = setTimeout(() => {
      this.hold();
    }, 200);
  }

  /**
   * Clear the timeouts on mouse up.
   */
  onMouseUp() {
    if (this._holdTimeout) clearTimeout(this._holdTimeout);
    if (this._holdInterval) clearInterval(this._holdInterval);
    this._holdTimeout = null;
    this._holdInterval = null;
  }

  /**
   * This allows accessing and updating the value of `this.clapsStore`
   * by prepending '$' in front of the variable that contains an instance
   * of this object.
   */
  subscribe(run: Subscriber<number>) {
    return this.clapsStore.subscribe(run);
  }
}

export { Applause };
