// import React from 'react'
import cashfree_icon from "@/assets/icons/cashfree-icon.svg";
import razorpay_icon from "@/assets/icons/razorpay-icon.svg";
import payumoney_icon from "@/assets/icons/payumoney-icon.png";

const PaymentGateway = () => {
  return (
    <div className="w-full h-full px-8 pt-8 lg:px-16">
        <div className="gap-8 min-h-screen grid place-items-center">
            
            {/* Payment method */}
            <div className="p-10">
              <h3 className="text-size-500 text-text-black font-medium uppercase mb-6">select desired payment gateway</h3>
              <div className="flex max-sm:justify-center gap-4 flex-wrap">
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="radio"
                    // value=""
                    // checked={selectedOption === 'door_service'}
                    // onChange={handleRadioChange}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0]  shadow-md gap-x-2 text-text-black rounded-md"
                  >
                   <div className="w-4 h-4 rounded-full border-2 border-[#c0c0c0] " />
                   <a href = "#">
                    <img src={razorpay_icon} alt = "razor pay icon" className="w-[5rem] h-[5rem] object-contain"/>
                   </a>
                  </span>
                </label>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="radio"
                    // value="pickup"
                    // checked={selectedOption === 'option2'}
                    // onChange={handleRadioChange}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-4 text-text-black rounded-md"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-[#c0c0c0] " />
                      <a href = "#">
                        <img src={payumoney_icon} alt = "payumoney icon" className="w-[5rem] h-[5rem] object-contain"/>
                      </a>
                  </span>
                </label>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="radio"
                    // value="door-service"
                    // checked={selectedOption === 'option2'}
                    // onChange={handleRadioChange}
                    className="hidden"
                  />
                  <span
                    // className={`radio-box inline-block w-20 h-10 border-2 ${
                    //   selectedOption === 'option2'
                    //     ? 'bg-blue text-white'
                    //     : 'bg-white text-black'
                    // } flex items-center justify-center`}
                    className="radio-box flex items-center py-7 px-10 h-10 border-2 border-[#c0c0c0] shadow-md gap-x-2 text-text-black rounded-md"
                  >
                   <div className="w-4 h-4 rounded-full border-2 border-[#c0c0c0] " />
                   <a href = "#">
                    <img src={cashfree_icon} alt = "cashfree icon" className="w-[5rem] h-[5rem] object-contain"/>
                   </a>
                  </span>
                </label>
              </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentGateway