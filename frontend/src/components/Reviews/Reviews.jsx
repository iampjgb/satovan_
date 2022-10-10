import "./reviews.scss";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Review } from "../Review/Review";

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const ratings = [
    { id: 1, rate: 5, percentage: 92, style: { width: "92%" } },
    { id: 2, rate: 4, percentage: 2, style: { width: "2%" } },
    { id: 3, rate: 3, percentage: 1, style: { width: "1%" } },
    { id: 4, rate: 2, percentage: 1, style: { width: "1%" } },
    { id: 5, rate: 1, percentage: 2, style: { width: "2%" } },
];

export const Reviews = () => {
    const value = 4.2;

    return (
        <div className="reviews">
            <div className="wrapper">
                <div className="header">
                    <h1>Reviews</h1>
                    <p>
                        Customer rated this pro highly for work
                        quality,professionalism and responsiveness.
                    </p>
                </div>
                <div className="summary">
                    <div className="left">
                        <div className="rating-group">
                            <Rating
                                className="rating"
                                name="text-feedback"
                                value={value}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                            />
                            <label>{value.toFixed(1)}</label>
                        </div>
                        <label>(106 reviews) {labels[Math.floor(value)]}</label>
                    </div>
                    <div className="right">
                        {ratings.map((item) => (
                            <div className="item" key={item.id}>
                                <div className="count">{item.rate}</div>
                                <div className="dot">•</div>
                                <div className="progress">
                                    <div
                                        className="bar"
                                        style={item.style}
                                    ></div>
                                </div>
                                <div className="percentage">
                                    {item.percentage}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Review/>
            </div>
        </div>
    );
};
