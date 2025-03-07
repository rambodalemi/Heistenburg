import axios from "axios"
import { useMutation } from "@tanstack/react-query"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const API_URL = "/api/contact"

// Create a new contact
const createContact = async (contactData: ContactFormData) => {
  try {
    const response = await axios.post(API_URL, contactData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Extract the error message from the response
      throw new Error(error.response.data.error || "Failed to create contact")
    }
    throw new Error("Network error. Please try again later.")
  }
}

// Hook for creating a contact
export const useCreateContact = () => {
  return useMutation({
    mutationFn: (contactData: ContactFormData) => createContact(contactData),
  })
}

