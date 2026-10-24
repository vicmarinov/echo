export default function Signup () {
    return (
        <main>
            <h1>Sign Up</h1>

            <form>
                <label htmlFor="name">Name</label>
                <input id="name"/>

                <label htmlFor="surname">Surname</label>
                <input id="surname" />

                <label htmlFor="username">Username</label>
                <input id="username" />

                <label htmlFor="bio">Bio</label>
                <textarea id="bio"></textarea>

                <label htmlFor="email">Email</label>
                <input id="email" />

                <label htmlFor="password">Password</label>
                <input id="password" />

                <label htmlFor="repeatPassword">Repeat password</label>
                <input id="repeatPassword" />

                <input id="isMinAge" />
                <label htmlFor="isMinAge">I am at least 13 years old.</label>
                
                {/* TODO: Add link to the Terms and Conditions page */}
                <input id="agreeTerms" />
                <label htmlFor="agreeTerms">I agree to the <a href="/about">Terms and Conditions</a>.</label>

                {/* TODO: Remove the following inputs, they are just for testing purposes: */}

                <label htmlFor="region">Region</label>
                <select id="region">
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="other">Other</option>
                </select>

                <fieldset>
                    <legend>Gender</legend>

                    <input id="genderMale" />
                    <label htmlFor="genderMale">Male</label>

                    <input id="genderFemale" />
                    <label htmlFor="genderFemale">Female</label>

                    <input id="genderOther" />
                    <label htmlFor="genderOther">Other</label>
                </fieldset>

                <label htmlFor="age">Age</label>
                <input id="age" />

                <button type="submit">
                    {/* {formStatus === 'submitting' ? 'Signing Up...' : 'Sign Up'} */}
                    {'Sign Up'}
                </button>
            </form>
        </main>
    );
}