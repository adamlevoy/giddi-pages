import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/klaviyo", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form className="flex justify-center gap-x-2" onSubmit={handleSubmit}>
      <input
        className="input"
        type="email"
        id="email"
        name="email"
        required
        placeholder="your@email.com"
      />
      <button className="btn btn-outline btn-primary">Sign up</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
