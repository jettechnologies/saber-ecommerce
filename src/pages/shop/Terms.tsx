import React from 'react';

const Terms = () => {
  return (
    <div className="w-full min-h-screen font-medium text-[#484848] pt-8 px-20">
      <h2 className="text-3xl font-bold uppercase text-center text-gray-900 mb-10">Terms and Conditions</h2>
      <p className="text-base mb-8">
        Welcome to Gearmates! These terms and conditions outline the rules and regulations for the use of Gearmates' Website and our services.
      </p>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Introduction
        </h3>
        <p className="text-base mb-4">
          By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Gearmates' website if you do not accept all of the terms and conditions stated on this page.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Intellectual Property Rights
        </h3>
        <p className="text-base mb-4">
          Unless otherwise stated, Gearmates and/or its licensors own the intellectual property rights for all material on Gearmates. All intellectual property rights are reserved. You may view and/or print pages from http://www.gearmates.com for your own personal use subject to restrictions set in these terms and conditions.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Restrictions
        </h3>
        <p className="text-base mb-4">
          You are specifically restricted from all of the following:
        </p>
        <ul className="list-disc pl-10 mb-4 flex flex-col gap-y-3">
          <li>Publishing any Website material in any other media without permission.</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material.</li>
          <li>Using this Website in any way that is or may be damaging to this Website.</li>
          <li>Using this Website in any way that impacts user access to this Website.</li>
          <li>Using this Website contrary to applicable laws and regulations.</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website.</li>
        </ul>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Limitation of Liability
        </h3>
        <p className="text-base mb-4">
          In no event shall Gearmates, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Gearmates, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
        </p>
      </article>
      <article className="mt-8">
        <h3 className="text-lg uppercase font-bold underline mb-6 text-gray-900">
          Governing Law & Jurisdiction
        </h3>
        <p className="text-base mb-4">
          These Terms will be governed by and interpreted in accordance with the laws of the State of [Your State], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your State] for the resolution of any disputes.
        </p>
      </article>
    </div>
  );
};

export default Terms;
