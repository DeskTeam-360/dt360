"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersApplication } from "@/data/careers";

const inputClass =
  "w-full rounded-[12px] border border-[#C5C9E0] bg-white px-4 py-3 font-[var(--font-inter)] text-[13px] font-normal leading-[1.5] tracking-normal text-[#080F40] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#F60996] focus:ring-2 focus:ring-[#F60996]/20";

const labelClass =
  "mb-2 block font-[var(--font-inter)] text-[12px] font-semibold leading-[1.4] tracking-normal text-[#080F40]";

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
      className="scroll-mt-28 relative overflow-hidden bg-[#F60996] py-12 sm:py-16 lg:py-24"
    >
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        quality={100}
        unoptimized
        sizes="100vw"
        className="h-full w-full object-cover object-center lg:object-fill"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-4 sm:!px-6 lg:!px-20">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="text-white lg:pt-8">
            <p className="pt-[30px] font-[var(--font-poppins)] text-[13px] font-bold uppercase leading-[1.4] tracking-[2px] text-white sm:pt-5 sm:text-[15px] lg:pt-0 lg:text-[17px]">
              {d.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[550px] font-[var(--font-poppins)] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] sm:text-[34px] lg:text-[45px] lg:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#fcb44e]">{d.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-[520px] font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] tracking-normal text-white sm:mt-5 sm:text-[14px] lg:text-[15px]">
              {d.body}
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none mb-4 ml-auto w-full max-w-[260px] sm:mb-6 sm:max-w-[320px] lg:absolute lg:-left-8 lg:top-8 lg:mb-0 lg:max-w-[300px] xl:-left-16 xl:max-w-[340px]">
              <SafeImage
                src={d.handwrittenImage}
                alt={d.handwrittenImageAlt}
                width={d.handwrittenWidth}
                height={d.handwrittenHeight}
                className="h-auto w-full object-contain mix-blend-screen"
                quality={100}
                unoptimized
              />
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10 lg:mt-28">
            {isSuccess ? (
              <div className="py-10 text-center">
                <p className="font-[var(--font-inter)] text-[15px] font-semibold text-[#080F40]">
                  {d.successMessage}
                </p>
                <button
                  type="button"
                  className="mt-6 font-[var(--font-poppins)] text-[14px] font-semibold text-[#F60996] underline-offset-2 hover:underline"
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
                    <p className="mt-1 font-[var(--font-inter)] text-[12px] font-medium text-red-600">{errors.name}</p>
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
                    <p className="mt-1 font-[var(--font-inter)] text-[12px] font-medium text-red-600">{errors.email}</p>
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
                    <p className="mt-1 font-[var(--font-inter)] text-[12px] font-medium text-red-600">{errors.position}</p>
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
                    <p className="mt-1 font-[var(--font-inter)] text-[12px] font-medium text-red-600">{errors.experience}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="careers-cv" className={labelClass}>
                    Upload CV
                  </label>
                  <label
                    htmlFor="careers-cv"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-[12px] border border-dashed border-[#C5C9E0] bg-[#FAFBFF] px-4 py-8 text-center transition hover:border-[#F60996]/50"
                  >
                    <span className="font-[var(--font-inter)] text-[13px] font-semibold text-[#080F40]">
                      {cvName ?? "Click to upload PDF or DOC"}
                    </span>
                    <span className="mt-1 font-[var(--font-inter)] text-[12px] font-normal text-[#9CA3AF]">
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
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-[#F60996] to-[#f97316] px-6 py-4 font-[var(--font-poppins)] text-[14px] font-semibold leading-[1.4] text-white shadow-lg transition hover:brightness-110"
                >
                  {d.submitLabel}
                </button>
              </form>
            )}
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
