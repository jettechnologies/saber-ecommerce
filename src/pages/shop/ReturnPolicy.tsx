// import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="w-full min-h-screen font-medium text-[#484848] pt-8 lg:px-20 md:px-12 px-5">
      <h2 className="text-3xl font-bold uppercase text-center text-gray-900 mb-10">Return Policy</h2>
      <p className="text-base mb-8">
        At Gearmates, we are committed to ensuring your satisfaction with our products. If for any reason you are not completely satisfied with your purchase, we are here to help.
      </p>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Eligibility for Returns
        </h3>
        <p className="text-base mb-4">
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and you need to have the receipt or proof of purchase.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Return Process
        </h3>
        <p className="text-base mb-4">
          To initiate a return, please contact our customer service team at support@gearmates.com with your order number and details about the product you wish to return. We will respond promptly with instructions on how to return the items from your order.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Refunds
        </h3>
        <p className="text-base mb-4">
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Shipping
        </h3>
        <p className="text-base mb-4">
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Contact Us
        </h3>
        <p className="text-base mb-4">
          If you have any questions on how to return your item to us, please contact us at support@gearmates.com.
        </p>
      </article>
    </div>
  );
};

export default ReturnPolicy;
