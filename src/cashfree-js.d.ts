// src/types/cashfree-js.d.ts
declare module '@cashfreepayments/cashfree-js' {
    // Type for the load function
    export function load(options: { mode: 'sandbox' | 'production' }): Promise<Cashfree>;
  
    // Type for the Cashfree object
    export interface Cashfree {
      checkout(options: CheckoutOptions): Promise<CheckoutResult>;
    }
  
    // Type for checkout options
    export interface CheckoutOptions {
      paymentSessionId: string;
      redirectTarget: '_modal' | '_self';
    }
  
    // Type for the result of the checkout method
    export interface CheckoutResult {
      error?: {
        message: string;
      };
      redirect?: boolean;
      paymentDetails?: {
        paymentMessage: string;
      };
    }
  }
  