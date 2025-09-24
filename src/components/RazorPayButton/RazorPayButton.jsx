import React from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";
import { useNavigate } from "react-router-dom";


const RazorpayButton = ({ orderDetails }) => {
 const userData = JSON.parse(localStorage.getItem("user") || "{}");
 console.log("sadasdsad",userData)

 const navigate = useNavigate()

    const handlePayment = async () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const BASEURL= import.meta.env.VITE_BASE_URL
        const token = sessionStorage.getItem("jwtToken");
        const { amount, orderId, currency, razorpayKeyId } = orderDetails;

        const options = {
            key: razorpayKeyId,
            amount: amount.toString(),
            currency,
            name: "2+1 Dating",
            description: orderDetails?.plan?.description,
            order_id: orderId,

            
            handler: async function (response) {
                // console.log("✅ Payment successful!", response);
                // alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                // 🔒 Call your backend here to verify the signature
                const res = await axios.post(
                    `${BASEURL}/payments/verify-payment`,
                    {
                        razorpay_order_id: response?.razorpay_order_id,
                        razorpay_payment_id: response?.razorpay_payment_id,
                        razorpay_signature: response?.razorpay_signature,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if(res){
                    console.log("wert",res)
                    showSuccessToast(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    navigate("/feed")
                }
                
            },

            prefill: {
                name: userData?.data?.user?.username,
                email: userData?.data?.user?.email,
                contact: userData?.data?.user?.phone,
            },

            notes: {
                address: userData?.data?.user?.profile?.address?.fullAddress,
            },

            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            // alert(`❌ Payment failed. Error: ${response.error.description}`);
            // console.error("Payment failed", response.error);
            showErrorToast(response.error.description)
        });
    };

    return (
        <div className="payment-container">
            <button onClick={handlePayment} className="btn btn-lg text-uppercase" style={{ backgroundColor: "var(--color-primary-green)", color: "#000000" }}>
                Pay Now (₹{orderDetails.amount})
            </button>
        </div>
    );
};

export default RazorpayButton;
