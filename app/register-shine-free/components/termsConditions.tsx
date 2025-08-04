import React from 'react';

type Props = {};

const TermsAndConditionsDialog = (props: Props) => {
    return (
        <>
            <main>
                <div>
                    {/* <h1>
                        <span>Terms and Conditions</span>
                    </h1> */}
                </div>
                <div id="page-container">
                    <div className="grid">
                        <div>
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    1. Definitions
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        <strong>Event:</strong> refers to the
                                        International Shift Talent Hunt event,
                                        as outlined on the website.
                                    </li>
                                    <li>
                                        <strong>Participant:</strong> refers to
                                        the individual registering for the
                                        Event.
                                    </li>
                                    <li>
                                        <strong>Organizer:</strong> refers to
                                        the entity responsible for hosting the
                                        Event.
                                    </li>
                                    <li>
                                        <strong>Website:</strong> refers to the
                                        official website of the International
                                        Shift Talent Hunt.
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    2. Eligibility
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        The Event is open to individuals of all
                                        nationalities, no age limit!
                                    </li>
                                    <li>
                                        The Organizer reserves the right to
                                        verify the eligibility of any
                                        Participant.
                                    </li>
                                    <li>
                                        ⁠All participants shall be verified and
                                        identified by the Rccg Church
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    3. Registration
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        Registration for the Event is only
                                        available online through the Website.
                                    </li>
                                    <li>
                                        Participants may register individually
                                        or as a group.
                                    </li>
                                    <li>
                                        ⁠Participants shall provide accurate and
                                        complete information during the
                                        registration process.
                                    </li>
                                    <li>
                                        ⁠⁠Participants cannot swap registration
                                        on behalf of another person
                                    </li>
                                    <li>
                                        ⁠⁠Participants cannot get a refund for
                                        registration and for votes.
                                    </li>
                                    <li>
                                        The Organizer reserves the right to
                                        reject any registration that is
                                        incomplete, inaccurate, or does not
                                        comply with these Terms and Conditions.
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    4. Event Details
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        Event date & location as stated on the
                                        Website.
                                    </li>
                                    <li>
                                        The Organizer reserves the right to
                                        change the Event details, including the
                                        date, time, location, and format.
                                    </li>
                                </ul>
                            </div>

                            <div className="">
                                <h2 className="text-xl font-semibold">
                                    5. Participant Conduct
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        ⁠Participants must conduct themselves in
                                        a professional and respectful manner
                                        during the Event.
                                    </li>
                                    <li>
                                        ⁠Participants must comply with all
                                        instructions and rules provided by the
                                        Organizer and Event staff.
                                    </li>
                                    <li>
                                        The Organizer reserves the right to
                                        remove any Participant from the Event
                                        who fails to comply with these Terms and
                                        Conditions.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    6. Intellectual Property
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        ⁠Participants retain ownership of all
                                        intellectual property rights in their
                                        performances, materials, and
                                        submissions.
                                    </li>
                                    <li>
                                        By participating in the Event,
                                        Participants grant the Organizer a
                                        non-exclusive, worldwide license to use,
                                        reproduce, and distribute their
                                        performances, materials, and submissions
                                        for promotional and marketing purposes.
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    7. Confidentiality
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        {' '}
                                        ⁠Participants must keep confidential all
                                        information and materials provided by
                                        the Organizer, including but not limited
                                        to judging criteria, feedback, and Event
                                        results.
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    8. Liability and Indemnity
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        ⁠The Organizer shall not be liable for
                                        any damages, losses, or expenses arising
                                        from or in connection with the Event,
                                        including but not limited to any injury
                                        or damage to property.
                                    </li>
                                    <li>
                                        Participants agree to indemnify and hold
                                        harmless the Organizer, its officers,
                                        directors, employees, and agents against
                                        any claims, demands, or liabilities
                                        arising from or in connection with their
                                        participation in the Event.
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    9. Governing Law & Jurisdiction
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        ⁠These Terms and Conditions shall be
                                        governed by and construed in accordance
                                        with the laws of RCCG.
                                    </li>
                                    <li>
                                        Any disputes arising from or in
                                        connection with these Terms and
                                        Conditions shall be resolved through
                                        [Dispute Resolution Process].
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-xl font-semibold">
                                    10. Changes to Terms
                                </h2>
                                <ul className="list-disc pl-5">
                                    <li>
                                        The Organizer reserves the right to
                                        modify or update these Terms and
                                        Conditions at any time without prior
                                        notice.
                                    </li>
                                    <li>
                                        {' '}
                                        ⁠Participants agree to be bound by any
                                        changes to these Terms and Conditions.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TermsAndConditionsDialog;
