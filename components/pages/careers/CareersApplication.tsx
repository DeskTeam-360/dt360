"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { careersApplication } from "@/data/careers";

const inputClass =
  "w-full rounded-[12px] border border-[#C5C9E0] bg-white px-4 py-3 font-[var(--font-montserrat)] text-[16px] font-medium leading-normal text-[#11104C] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#E3058D] focus:ring-2 focus:ring-[#E3058D]/20";

const labelClass =
  "mb-2 block font-[var(--font-montserrat)] text-[15px] font-bold leading-snug text-[#11104C]";

type FieldErrors = {
  name?: string;
  email?: string;
  position?: string;
  experience?: string;
};

export function CareersApplication() {
  const d = careersApplication;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [about, setAbout] = useState("");
  const [cvName, setCvName] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: FieldErrors = {};
    if (!fullName.trim()) next.name = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!position) next.position = "Please choose a position.";
    if (!experience) next.experience = "Please choose your experience level.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // UI-only for now — wire to careers API / Gravity Form when ready.
    setIsSuccess(true);
  }

  return (
    <section
      id="apply"
      className="scroll-mt-28 relative overflow-hidden bg-gradient-to-br from-[#E3058D] via-[#C026D3] to-[#7C3AED] py-16 sm:py-24"
    >
      <Container className="relative z-10 max-w-[1440px] !px-6 lg:!px-20">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="text-white lg:pt-8">
            <h2 className="font-[var(--font-poppins)] text-[40px] font-semibold leading-[1.12] sm:text-[52px] lg:text-[56px]">
              {d.titleBefore}
              <span className="text-[#FFE4F1]">{d.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-md font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.8] text-white/90">
              {d.body}
            </p>
            <p className="mt-10 rotate-[-4deg] font-[var(--font-poppins)] text-[22px] font-semibold italic text-white/95 sm:text-[26px]">
              {d.handwritten}
            </p>
            <svg
              className="mt-2 ml-8 hidden text-white/80 sm:block"
              width="120"
              height="48"
              viewBox="0 0 120 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 8c28 4 48 20 72 28M80 36c8 2 16 4 28 2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M96 28l14 10-16 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
            {isSuccess ? (
              <div className="py-10 text-center">
                <p className="font-[var(--font-montserrat)] text-[20px] font-bold text-[#11104C]">
                  {d.successMessage}
                </p>
                <button
                  type="button"
                  className="mt-6 font-[var(--font-montserrat)] text-[15px] font-bold text-[#E3058D] underline-offset-2 hover:underline"
                  onClick={() => {
                    setIsSuccess(false);
                    setFullName("");
                    setEmail("");
                    setPosition("");
                    setExperience("");
                    setPortfolio("");
                    setAbout("");
                    setCvName(null);
                    setErrors({});
                  }}
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="careers-name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="careers-name"
                    name="fullName"
                    className={inputClass}
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.name ? (
                    <p className="mt-1 text-[13px] font-medium text-red-600">{errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="careers-email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="careers-email"
                    name="email"
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-[13px] font-medium text-red-600">{errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="careers-position" className={labelClass}>
                    Which position(s) interest you?
                  </label>
                  <select
                    id="careers-position"
                    name="position"
                    className={inputClass}
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Select a position</option>
                    {d.positions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.position ? (
                    <p className="mt-1 text-[13px] font-medium text-red-600">{errors.position}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="careers-experience" className={labelClass}>
                    Relevant Experience
                  </label>
                  <select
                    id="careers-experience"
                    name="experience"
                    className={inputClass}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Select experience</option>
                    {d.experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experience ? (
                    <p className="mt-1 text-[13px] font-medium text-red-600">{errors.experience}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="careers-cv" className={labelClass}>
                    Upload CV
                  </label>
                  <label
                    htmlFor="careers-cv"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-[#C5C9E0] bg-[#FAFBFF] px-4 py-8 text-center transition hover:border-[#E3058D]/50"
                  >
                    <span className="font-[var(--font-montserrat)] text-[14px] font-semibold text-[#11104C]">
                      {cvName ?? "Click to upload PDF or DOC"}
                    </span>
                    <span className="mt-1 font-[var(--font-montserrat)] text-[12px] font-medium text-[#9CA3AF]">
                      Max 5MB · stored with your application when backend is wired
                    </span>
                    <input
                      id="careers-cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setCvName(file ? file.name : null);
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="careers-portfolio" className={labelClass}>
                    Portfolio / LinkedIn URL
                  </label>
                  <input
                    id="careers-portfolio"
                    name="portfolio"
                    type="url"
                    className={inputClass}
                    placeholder="https://"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="careers-about" className={labelClass}>
                    Tell us about yourself!
                  </label>
                  <textarea
                    id="careers-about"
                    name="about"
                    rows={4}
                    className={`${inputClass} resize-y`}
                    placeholder="A short note about your background and what you’re looking for."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#e4277a] to-[#f97316] px-6 py-4 font-[var(--font-montserrat)] text-[16px] font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  {d.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
