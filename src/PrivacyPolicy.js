import React from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const PrivacyPolicy = () => {

    const navigate = useNavigate();

    return (
        <div className="privacy-policy">
            <header className="header">
                <h1>Privacy Policy for Serpent Trail App</h1>
                <p><strong>Last Updated: 04/11/2024</strong></p>
            </header>

            <main className="privacy-policy-content">
                <section className="policy-section">
                    <p>
                        This Privacy Policy describes how Serpent Trail collects, uses, and discloses your personal information when you use our mobile application (the "App") and related services. By using the App, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please refrain from using the App.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>1. Information We Collect</h2>
                    
                    <h3>a. Information You Provide Directly</h3>
                    <p>The app does not collect personal data such as names, addresses, or email addresses unless you voluntarily submit such information for support or feedback purposes.</p>

                    <h3>b. Permissions and Access</h3>
                    <ul>
                        <li><strong>Notifications:</strong> The app requests permission to send push notifications at user-selected times for delivering daily or scheduled quotes.</li>
                        <li><strong>Gallery Access:</strong> The app requests access to your device’s gallery to enable the download and saving of quotes. This permission is used solely to allow you to store the downloaded quotes to your chosen location.</li>
                    </ul>

                    <h3>c. Usage Data</h3>
                    <p>The app may collect non-personal usage data such as interaction frequency with notifications or features for app improvement purposes. This data does not include personal information.</p>
                </section>

                <section className="policy-section">
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li><strong>Send Notifications:</strong> Deliver timely notifications with quotes as per user settings.</li>
                        <li><strong>Enable Downloads:</strong> Allow the saving of downloaded content to the device’s gallery.</li>
                        <li><strong>Enhance User Experience:</strong> Analyze usage patterns to improve functionality and user satisfaction.</li>
                        <li><strong>Security Purposes:</strong> Ensure that user interactions are secure and compliant with app policies.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. How We Share Your Information</h2>
                    <ul>
                        <li><strong>Third-Party Service Providers:</strong> We may use third-party services to facilitate notifications or manage certain app functionalities. These providers are contractually obligated to protect your information.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose information if legally required or to protect our rights and the safety of users.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. Cookies and Tracking Technologies</h2>
                    <p>
                        While the app may not use cookies as a mobile application, related website services may employ them for analytics. You can manage cookie preferences via your browser settings.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>5. Security Measures</h2>
                    <p>
                        We implement reasonable security measures to protect your information. We recommend safeguarding your device and using appropriate security features to prevent unauthorized access.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>6. Your Choices</h2>
                    <ul>
                        <li><strong>Notification Preferences:</strong> You can manage or disable push notifications through your device settings.</li>
                        <li><strong>Gallery Permissions:</strong> You can revoke or modify gallery permissions at any time through your device’s privacy settings.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>7. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Please review the policy periodically for updates.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>8. Contact Us</h2>
                    <p> If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@serpenttrail.org">support@serpenttrail.org</a>.</p>
                     </section>
            </main>

            <footer className="privacy-footer">
            <button className="prButton" onClick={() => navigate('/welcomep')}>
          <FontAwesomeIcon icon={faHome} />
        </button>
                

            </footer>
        </div>
    );
};

export default PrivacyPolicy;
