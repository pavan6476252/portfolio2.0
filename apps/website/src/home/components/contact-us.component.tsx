import React, { useState } from "react";
import axios from "axios";
import { FaX } from "react-icons/fa6";
import { cn } from "../../utils/tailwind-merge";
import ContactUsSvg from "../../assets/contact_us.svg";
import apiClient from "../../store/api/apiClient";

interface Props {
  toggleFormVisibility: () => void;
  visibility: boolean;
  email?: string;
}

export default function ContactUsFormComponent({
  toggleFormVisibility,
  email,
  visibility,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await apiClient.post("/graphql", {
        query: `
            mutation {
              sendEmail(emailInput: {
                to: "${email ?? "meesalapavan2003@gmail.com"}",
                subject: "${formData.name} sent a message",
                html: "<!DOCTYPE html>\
                  <html lang='en'>\
                  <head>\
                    <meta charset='UTF-8'>\
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\
                    <title>Contact Us Email</title>\
                    <style>\
                      body {\
                        font-family: Arial, sans-serif;\
                        background-color: #f4f4f4;\
                        margin: 0;\
                        padding: 0;\
                      }\
                      .container {\
                        width: 100%;\
                        max-width: 600px;\
                        margin: 0 auto;\
                        background-color: #ffffff;\
                        padding: 20px;\
                        border: 1px solid #e4e4e4;\
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\
                      }\
                      h2 {\
                        color: #333333;\
                        font-size: 24px;\
                      }\
                      p {\
                        color: #555555;\
                        line-height: 1.6;\
                      }\
                      .footer {\
                        text-align: center;\
                        margin-top: 20px;\
                        font-size: 12px;\
                        color: #888888;\
                      }\
                    </style>\
                  </head>\
                  <body>\
                    <div class='container'>\
                      <h2>Contact Us Message</h2>\
                      <p><strong>Name of Sender:</strong> ${formData.name}</p>\
                      <p><strong>Email of Sender:</strong> ${
                        formData.email
                      }</p>\
                      <p><strong>Message:</strong></p>\
                      <p>${formData.message}</p>\
                      <div class='footer'>\
                        <p>This email was sent from the contact form on your portfolio website.</p>\
                      </div>\
                    </div>\
                  </body>\
                  </html>"
              })
            }
          `,
      });

      if (response.data.data?.sendEmail) {
        setStatus("success");
        setFormData({ email: "", message: "", name: "" });
      } else {
        setStatus("error");
        console.log(response.data);
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 min-h-screen bg-opacity-75 z-[100] flex items-center justify-center",
        `${visibility ? "flex" : "hidden"}`
      )}
      onClick={toggleFormVisibility}
    >
      <div
        className="relative w-full mx-5 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 border border-gray-300 rounded-lg bg-white dark:bg-slate-600/10 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={ContactUsSvg}
          className="hidden lg:block w-full h-full object-cover rounded-l-lg"
        />
        <form
          className="col-span-1 grid grid-cols-1 gap-6 p-8"
          onSubmit={handleSubmit}
        >
          <FaX
            size={20}
            className="absolute top-4 right-4 text-gray-500 cursor-pointer"
            onClick={toggleFormVisibility}
          />
          <h2 className="text-4xl font-bold dark:text-white text-gray-800">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="block w-full">
              <span className="dark:text-white text-gray-800">Your name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:bg-slate-800 focus:ring-opacity-50"
                placeholder="Joe Bloggs"
              />
            </label>
            <label className="block w-full">
              <span className="dark:text-white text-gray-800">
                Email address
              </span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 dark:bg-slate-800  focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="joe.bloggs@example.com"
                required
              />
            </label>
          </div>
          <label className="block">
            <span className="dark:text-white text-gray-800">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 dark:bg-slate-800   focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={5}
              placeholder="Tell us what you're thinking about..."
            ></textarea>
          </label>
          <div className="text-right">
            <button
              type="submit"
              className="inline-block h-10 px-6 text-white bg-indigo-600 rounded-lg transition-colors duration-150 hover:bg-indigo-700 focus:shadow-outline"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </div>
          {status === "success" && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
