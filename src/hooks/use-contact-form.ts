import { ChangeEvent, FormEvent, useState } from "react";
import { ContactFormErrors, ContactFormValues } from "../types/contact";

const initialValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = "idle" | "success" | "error";

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = (formValues: ContactFormValues): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};

    if (!formValues.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formValues.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(formValues.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (formValues.phone.trim().length < 6) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!formValues.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formValues.message.trim().length < 20) {
      nextErrors.message = "Message should be at least 20 characters long.";
    }

    return nextErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name as keyof ContactFormErrors];
      return updated;
    });

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus("idle");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Form endpoint is missing. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to your .env.local file.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      setSubmitMessage("");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thanks, your message has been sent successfully.");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    handleChange,
    handleSubmit,
  };
}
