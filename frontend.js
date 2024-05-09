// Start of the response

import React, { useState } from "react";
import "./App.css";

function Frontend() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengerType, setPassengerType] = useState("adult");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const requestBody = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
          },
        ],
        passengers: [
          {
            type: passengerType,
          },
        ],
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/duffel-flights-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log(data); // Log the response data
      setResults(data.data.offers); // Set the results state with the offers from the response
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav />

      <div className="search-area">
        <span>Demo Travel Tool</span>
        <div className="search">
          <input
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      <ul>
        <h2>Results</h2>
        {results.map((offer, index) => (
          <li
            key={index}
            style={{ border: "1px solid black", marginBottom: "10px" }}
          >
            <p>Total Amount: {offer.total_amount}</p>
            <p>Total Emissions: {offer.total_emissions_kg}</p>
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex}>
                <h4>Slice {sliceIndex + 1}</h4>
                <p>Origin: {slice.origin.name}</p>
                <p>Destination: {slice.destination.name}</p>
                {slice.segments.map((segment, segmentIndex) => (
                  <div key={segmentIndex}>
                    {segmentIndex === 0 && (
                      <>
                        <p>Carrier: {segment.operating_carrier.name}</p>
                        <p>Departure: {segment.departing_at}</p>
                        <p>Arrival: {segment.arriving_at}</p>
                        <p>Duration: {segment.duration}</p>
                        <p>Stops: {segment.stops.length}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Frontend;

// End of the response