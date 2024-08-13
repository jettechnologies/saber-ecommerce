import { useCallback, useEffect } from "react";
// import { load } from "@cashfreepayments/cashfree-js";
import { load } from "@cashfreepayments/cashfree-js";
import { useNavigate } from "react-router-dom";

const CashfreeCheckout = ({ cashfreePaymentSession }: { cashfreePaymentSession: string }) => {
  const navigate = useNavigate();

  const initializeSDK = async () => {
    try {
      const cashfree = await load({
        mode: "sandbox", // Change to "production" in live environment
      });
      return cashfree;
    } catch (error) {
      console.error("Error initializing Cashfree SDK:", error);
      return null;
    }
  };

  const doPayment = useCallback(async (cashfree: any) => {
    if (!cashfree) {
      console.error("Cashfree SDK is not initialized");
      return;
    }

    const checkoutOptions = {
      paymentSessionId: cashfreePaymentSession,
      redirectTarget: "_modal",
    };

    try {
      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        console.log("User has closed the popup or there is some payment error, Check for Payment Status");
        console.log(result.error);
        navigate("/payment-failure", { replace: true });
      } else if (result.redirect) {
        console.log("Payment will be redirected");
        // Handle redirection if needed
      } else if (result.paymentDetails) {
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result.paymentDetails.paymentMessage);
        navigate("/payment-success", { replace: true });
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      navigate("/payment-failure", { replace: true });
    }
  }, [cashfreePaymentSession, navigate]);

  useEffect(() => {
    const handleCheckout = async () => {
      if (cashfreePaymentSession) {
        const cashfree = await initializeSDK();
        await doPayment(cashfree);
      }
    };

    handleCheckout();
  }, [cashfreePaymentSession, navigate, doPayment]);

  return null; // Return null or any other component you want to render
};

export default CashfreeCheckout;
