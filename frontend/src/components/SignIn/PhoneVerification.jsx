import "./signin.scss";
import PropTypes from "prop-types";
import {
    getCountries,
    getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import { useState } from "react";

export const PhoneVerification = () => {
    const CountrySelect = ({ value, onChange, labels, ...rest }) => (
        <select
            {...rest}
            value={value}
            onChange={(event) => onChange(event.target.value || undefined)}
        >
            <option value="">{labels["ZZ"]}</option>
            {getCountries().map((country) => (
                <option key={country} value={country}>
                    {labels[country]} +{getCountryCallingCode(country)}
                </option>
            ))}
        </select>
    );

    CountrySelect.propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        labels: PropTypes.objectOf(PropTypes.string).isRequired,
    };

    const [country, setCountry] = useState("PH");

    console.log(getCountryCallingCode(country));

    return (
        <>
            <div className="form-row">
                <label>Country/Region</label>
                <CountrySelect
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    className="country-dropdown"
                />
            </div>
            <div className="form-row">
                <label>Phone Number</label>
                <div className="phone-group">
                    <div>
                        {" "}
                        <span>+63</span>
                    </div>
                    <input
                        type="number"
                        className="phone-number"
                        autoComplete="tel-national"
                    />
                </div>
            </div>
            <div className="form-row">
                <label>Email</label>
                <div className="phone-group">
                    <input
                        type="email"
                        className="phone-number"
                        autoComplete="tel-national"
                        placeholder="Email"
                    />
                </div>
            </div>
            <div className="auth-btn">
                <button className="phone-auth-btn">Continue</button>
            </div>
        </>
    );
};
