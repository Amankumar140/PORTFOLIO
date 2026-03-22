import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = async ({ name, email, message }) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: name,
        reply_to: email,
        to_name: "Aman",
        message,
      },
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, error };
  }
};
