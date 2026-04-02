"use client";

import { FormEvent, useMemo, useState } from "react";

const serviceOptions = [
  "Exterior Detail",
  "Interior Detail",
  "Full Detail",
  "Paint Correction",
  "Ceramic Coating",
  "Paint Protection Film (PPF)",
  "Window Tinting",
  "Overnight Detail",
  "Other / Not Sure",
];

export function QuoteForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return firstName.trim() && email.trim() && vehicle.trim() && selectedServices.length > 0;
  }, [firstName, email, vehicle, selectedServices]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please complete the required fields and select at least one service.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          vehicle,
          services: selectedServices,
          message,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setVehicle("");
      setMessage("");
      setWebsite("");
      setSelectedServices([]);
    } catch {
      setError("We couldn't submit your request right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-success" id="formSuccess" style={{ display: "block" }}>
        <h4>Request Sent Successfully!</h4>
        <p>Thanks for reaching out. We received your quote request and will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="quote-form" id="quoteForm" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="vehicle">Vehicle (Year, Make, Model) *</label>
        <input id="vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Services Interested In *</label>
        <div className="checkbox-group" id="services">
          {serviceOptions.map((service) => {
            const checked = selectedServices.includes(service);
            return (
              <label key={service} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(service)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{service}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Additional Details</label>
        <textarea id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <div className="form-group" style={{ position: "absolute", left: -9999, opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn-submit" id="submitBtn" disabled={loading}>
        <span>{loading ? "Sending..." : "Send Quote Request"}</span>
      </button>

      {error ? <p className="form-note" style={{ color: "#ef4444" }}>{error}</p> : null}
      <p className="form-note">* Required fields. We respect your privacy and never share your info.</p>
    </form>
  );
}
