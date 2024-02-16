import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    try {
      const formData = new FormData(form);
      const response = await fetch("/api/klaviyo", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.message) {
        setIsSubscribed(true);
        form.reset();
      }
    } catch (error) {
      console.log(error);
      form.reset();
    }
  }

  return (
    <div>
      {isSubscribed && (
        <p className="text-primary">Welcome! Check your inbox soon.</p>
      )}
      {!isSubscribed && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-x-2">
            <input
              className="input text-gray-600 shadow-xl"
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
            />
            <button className="btn btn-outline btn-primary shadow-xl">
              Sign up
            </button>
          </div>
          <div className="form-control mt-4 flex max-w-80 justify-center">
            <label className=" flex cursor-pointer items-start justify-center gap-x-2">
              <span className="text-pretty text-xs text-gray-400">
                By submitting this form you agree to our{" "}
                <a
                  className="underline"
                  href="https://mygiddi.com/policies/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  className="underline"
                  href="https://mygiddi.com/policies/terms-of-service"
                  target="_blank"
                >
                  Terms of Service
                </a>
                .
              </span>
              <input
                type="checkbox"
                defaultChecked
                required
                className="checkbox-accent checkbox checkbox-sm"
              />
            </label>
          </div>
        </form>
      )}
    </div>
  );
}
