declare global {
  interface Window {
    MemberStack: {
      getToken: () => unknown;
      logout: () => void;
      onReady: Promise<unknown>;
      reload: () => void;
      selectMembership: (id: unknown) => void;
    };
    memberstack: {
      information: {
        email: string | undefined;
        id?: string;
        'first-name'?: string;
        'last-name'?: string;
      };
      isAuthenticated: false;
    };
  }
}

const Memberstack = {
  /**
   * Reloads memberstack.
   *
   * This is helpful if memberstack loaded before the current DOM state, which
   * causes it to not recognize some memberstack links and actions.
   */
  reload: function (): void {
    console.log('reloading');
    window.MemberStack.reload();
  },

  isModalPresent: {
    /**
     * Returns whether the elements relevant to the login process are present.
     */
    login: (): boolean => !!document.querySelector('#memberstack-signup-portal'),
  },

  /**
   * Opens the memberstack login modal.
   */
  openLogin: function (eventTarget: EventTarget): void {
    const target = eventTarget as HTMLElement;
    target.setAttribute('href', '#/ms/login');
    this.reload();
    target.click();
  },

  /**
   * Opens the memberstack profile modal.
   */
  openProfile: function (eventTarget: EventTarget): void {
    const target = eventTarget as HTMLElement;
    target.setAttribute('href', '#/ms/profile');
    this.reload();
    target.click();
  },

  /**
   *
   */
  onReady: async function (): Promise<boolean> {
    const ready = await window.MemberStack.onReady;
    console.log(ready);
    return !!ready;
  },
};

// MEMBERSTACK REST API TYPES
interface Member {
  id: string; // unique user identifier
  membership: Membership;
  email: string;
  created_at: string; // unix timestamp
  accessTokenExpires?: string; // unix timestamp
  customFields?: {
    [key: string]: string;
  };
}

interface Membership {
  oneTime: boolean;
  testMode: boolean;
  status:
    | 'trialing'
    | 'active'
    | 'expired'
    | 'past_due'
    | 'canceled'
    | 'unpaid'
    | 'incomplete'
    | 'incomplete_expired';
  plan: string; // plan id
  type: 'free' | 'paid';
  amount: null | number;
  cancel_at_period_end?: boolean;
  current_period_end?: string; // unix timestamp
}

export { Memberstack };
export type { Member, Membership };
