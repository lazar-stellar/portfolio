import { AiOutlineCloudDownload, AiOutlineMail } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import ContactItem from "../ui/ContactItem";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";
import { useContactForm } from "../../hooks/use-contact-form";
import { personalInfo } from "../../data/personal";
import ContactField from "../ui/ContactFiled";
import ContactTextarea from "../ui/ContactTextArea";

export default function ContactSection() {
  const {
    values,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-white/70 pt-14 pb-16 dark:border-white/10 dark:bg-white/[0.03] sm:pt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10">
            <div>
              <SectionHeading
                label="Contact"
                title="Let’s talk about your next project."
                className="max-w-3xl"
              />

              <p className="section-copy mt-5 max-w-xl text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8">
                Whether you need a modern web app, a polished dashboard, a
                strong backend foundation, or help improving an existing
                product, feel free to reach out.
              </p>

              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                <div className="rounded-[1.1rem] border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.25rem]">
                  <ContactItem
                    href={personalInfo.phoneHref}
                    label={personalInfo.phone}
                    icon={BsTelephoneFill}
                  />
                </div>

                <div className="rounded-[1.1rem] border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.25rem]">
                  <ContactItem
                    href={`mailto:${personalInfo.email}`}
                    label={personalInfo.email}
                    icon={AiOutlineMail}
                  />
                </div>

                <div className="rounded-[1.1rem] border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.25rem]">
                  <ContactItem
                    href={personalInfo.locationHref}
                    label={personalInfo.location}
                    icon={MdLocationPin}
                    external
                  />
                </div>

                <div className="rounded-[1.1rem] border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.25rem]">
                  <ContactItem
                    href={personalInfo.resume}
                    label="Download resume"
                    icon={AiOutlineCloudDownload}
                    external
                  />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:rounded-[1.5rem] sm:p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <ContactField
                    label="First name"
                    name="firstName"
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={handleChange}
                  />

                  <ContactField
                    label="Last name"
                    name="lastName"
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
                  <ContactField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    onChange={handleChange}
                  />

                  <ContactField
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    error={errors.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-3 sm:mt-4">
                  <ContactTextarea
                    label="Tell me a bit about your project..."
                    name="message"
                    value={values.message}
                    error={errors.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-6 text-zinc-500 dark:text-zinc-400 sm:text-sm sm:leading-7">
                    Best for project inquiries, freelance work, and
                    collaboration opportunities.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-900"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </button>
                </div>

                {submitStatus === "success" ? (
                  <p className="input-success-text mt-4">{submitMessage}</p>
                ) : null}

                {submitStatus === "error" ? (
                  <p className="input-error-text mt-4">{submitMessage}</p>
                ) : null}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
