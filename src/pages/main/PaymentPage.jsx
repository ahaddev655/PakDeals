import React, { useState } from "react";
import PaymentComponent from "./../../components/main/PaymentComponent";
import PaymentSuccessComponent from "./../../components/main/PaymentSuccessComponent";

function PaymentPage() {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  return (
    <div className="page">
      {isPaymentSuccess ? (
        <PaymentSuccessComponent />
      ) : (
          <PaymentComponent setIsPaymentSuccess={setIsPaymentSuccess} />
      )}
    </div>
  );
}

export default PaymentPage;
