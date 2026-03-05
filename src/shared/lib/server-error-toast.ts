import { AxiosError } from "axios";
import { toast } from "sonner";

/** Shape of error response bodies from the API */
interface ApiErrorBody {
  message?: string;
  error?: string;
  path?: string;
  errors?: Array<{ message?: string; field?: string }>;
}

/**
 * Maps known server messages + request path to user-friendly copy.
 * First matching entry wins; path is matched with includes().
 */
const FRIENDLY_MESSAGES: Array<{
  message: string;
  pathContains?: string;
  friendly: string;
}> = [
  {
    message: "Unique constraint violation.",
    pathContains: "recipe",
    friendly: "A recipe with that name already exists.",
  },
  {
    message: "Unique constraint violation.",
    pathContains: "ingredient",
    friendly: "An ingredient with that name already exists.",
  },
  {
    message: "Unique constraint violation.",
    pathContains: "auth",
    friendly: "An account with that email already exists.",
  },
  {
    message: "Unique constraint violation.",
    pathContains: "signup",
    friendly: "An account with that email already exists.",
  },
  {
    message: "Unique constraint violation.",
    friendly: "That name or value is already in use. Please try something different.",
  },
  {
    message: "Record not found.",
    pathContains: "recipe",
    friendly: "That recipe wasn't found.",
  },
  {
    message: "Record not found.",
    pathContains: "ingredient",
    friendly: "That ingredient wasn't found.",
  },
  {
    message: "Record not found.",
    friendly: "That item wasn't found.",
  },
  {
    message: "Invalid data provided.",
    friendly: "The information you entered isn't valid. Please check and try again.",
  },
  {
    message: "Request validation failed",
    friendly: "Please check your input and try again.",
  },
];

function toFriendlyMessage(serverMessage: string, path: string): string {
  const normalizedPath = path.toLowerCase();
  const entry = FRIENDLY_MESSAGES.find(
    (e) =>
      (serverMessage === e.message || serverMessage.startsWith(e.message)) &&
      (!e.pathContains || normalizedPath.includes(e.pathContains)),
  );
  return entry?.friendly ?? serverMessage;
}

/**
 * Extracts a user-facing message from an Axios error response.
 * Handles validation errors (multiple messages), standard message field,
 * and maps known server messages to friendlier copy.
 */
export function getServerErrorMessage(error: unknown): string | null {
  if (!(error instanceof AxiosError) || !error.response?.data) {
    return null;
  }

  const data = error.response.data as ApiErrorBody;
  const path = data.path ?? error.config?.url ?? "";

  if (data.message) {
    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const first = data.errors[0];
      if (first?.message) {
        return toFriendlyMessage(first.message, path);
      }
    }
    return toFriendlyMessage(data.message, path);
  }

  if (data.errors?.length) {
    const first = data.errors[0];
    if (first?.message) {
      return toFriendlyMessage(
        data.message ?? "Request validation failed",
        path,
      );
    }
  }

  const status = error.response.status;
  if (status >= 500) return "Something went wrong. Please try again.";
  if (status === 401) return "Please sign in again.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "Not found.";

  return "Something went wrong.";
}

/**
 * Shows a toast with the server error message when present.
 * Call from axios response interceptor on rejection.
 */
export function showServerErrorToast(error: unknown): void {
  const message = getServerErrorMessage(error);
  if (message) {
    toast.error(message);
  }
}
