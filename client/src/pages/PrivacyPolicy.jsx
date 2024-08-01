import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-14 py-6 bg-white rounded-lg ">
      <h1 className="text-3xl font-bold w-full mb-4 text-[#14a800]">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect information about you in a variety of ways. The information we may collect includes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Personal Data: Identifiable information such as your name, email address, and phone number that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.</li>
        <li>Derivative Data: Information our servers automatically collect when you access the site, such as your IP address, your browser type, and your operating system.</li>
        <li>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the site.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect about you in the following ways:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To facilitate account creation and the login process.</li>
        <li>To manage user accounts and provide customer support.</li>
        <li>To process your transactions and manage your orders.</li>
        <li>To send you a newsletter or other information about our services.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-2">3. Disclosure of Your Information</h2>
      <p className="mb-4">
        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
        <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-2">4. Security of Your Information</h2>
      <p className="mb-4">
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">5. Policy for Children</h2>
      <p className="mb-4">
        We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li className="mb-2">Address: 1234 Main Street, Anytown, USA</li>
        <li className="mb-2">Email: support@example.com</li>
        <li>Phone: (123) 456-7890</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
