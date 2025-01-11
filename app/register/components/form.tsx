


const RegistrationForm = () => {
    return (
        <>
            <p>Please fill in your details to register for the RCCG Shift Talent Hunt Season 3</p>
            <h5 className="borderr">Step One: Bio Data</h5>
            <form className="form-box">
                <label>Full name :</label>
                <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    required
                    maxLength={50}
                />

                <label>Email address :</label>
                <input
                    type="email"
                    name="senderEmail"
                    id="senderEmail"
                    required
                    maxLength={50}
                    // placeholder="Must be a valid email address"
                />

                <label>Phone Number :</label>
                <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                />

                <label>Gender :</label>
                <select>
                    <option>Male</option>
                </select>

                <input
                    type="submit"
                    id="sendMessage"
                    name="sendMessage"
                    value="Send Message"
                />
            </form>
        </>
    )
}

export default RegistrationForm