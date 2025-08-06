// ==================== CONSTANTS ====================
// src/constants.ts
// Centralize constants for better maintainability
export const API = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "/api", // Use env var with fallback
  TIMEOUT_MS: 15000, // Slightly increased timeout
  USERS_ENDPOINT: "/users",
};

export const CACHE_KEYS = {
  USERS: "users",
  DETAIL: "detail",
  LIST: "list",
};

export const STALE_TIMES = {
  DEFAULT: 5 * 60 * 1000, // 5 minutes
  USER_DETAIL: 10 * 60 * 1000, // 10 minutes for specific user details
};

export const AUTH_TOKEN_KEY = "auth_token"; // Local storage key for token

// ==================== VALIBOT SCHEMAS ====================

// src/schemas/userSchemas.ts
import * as v from "valibot";
import { CACHE_KEYS } from "../constants"; // Assuming constants are in src/constants.ts

// Common field definitions for DRYness
const UserIdSchema = v.string([
  v.minLength(1, "User ID cannot be empty."),
  v.pattern(/^user-[a-zA-Z0-9]+$/, 'User ID must be in format "user-XXX".'),
]);

const NameSchema = v.string([
  v.minLength(2, "Name must be at least 2 characters."),
  v.maxLength(100, "Name cannot exceed 100 characters."),
]);

const EmailSchema = v.string([
  v.email("Please enter a valid email address."),
  // Removed redundant v.pattern - v.email is generally sufficient and more robust
]);

const IsoTimestampStringSchema = v.string([
  v.isoTimestamp(
    "Must be a valid ISO timestamp string (e.g., 2023-10-27T10:00:00.000Z).",
  ),
]);

/**
 * Schema for raw data received from an external source (e.g., API).
 * Validates incoming structure and types, including transforming date strings.
 * Use .strict() to prevent unexpected extra properties.
 */
export const RawUserSchema = v.strict(
  v.object({
    userId: UserIdSchema,
    name: NameSchema,
    email: EmailSchema,
    activeStatus: v.boolean("Active status must be true or false."),
    registered_at: v.pipe(
      v.string("Registration date is required."), // Keep initial string check
      IsoTimestampStringSchema, // Validate format strictly
      v.transform((input) => new Date(input)), // Transform valid string to Date
    ),
  }),
);
export type RawUser = v.Output<typeof RawUserSchema>;

/**
 * Schema for data being sent *to* the persistence layer (e.g., API).
 * Ensures the payload conforms to the expected API contract.
 * userId is optional for creation scenarios.
 * Uses .strict() to prevent sending extra properties.
 */
export const UserPersistenceSchema = v.strict(
  v.object({
    userId: v.optional(UserIdSchema), // Optional for create, required for update (logic handled in API call)
    name: NameSchema,
    email: EmailSchema,
    activeStatus: v.boolean("Active status must be true or false."),
    registered_at: IsoTimestampStringSchema, // Send as ISO string
  }),
);
export type UserPersistencePayload = v.Output<typeof UserPersistenceSchema>;

/**
 * Schema for the internal Domain Model (User class).
 * Ensures the domain object is always in a valid state.
 * Used internally, e.g., in the User class constructor.
 */
export const DomainUserSchema = v.object({
  // No strict needed if internally controlled
  id: v.string(), // Domain ID can be empty string initially before persistence
  fullName: NameSchema, // Map 'name' to 'fullName'
  emailAddress: EmailSchema, // Map 'email' to 'emailAddress'
  isActive: v.boolean(), // Map 'activeStatus' to 'isActive'
  registrationDate: v.instance(Date), // Domain uses Date object
});
export type DomainUser = v.Output<typeof DomainUserSchema>;

// ==================== USER DOMAIN MODEL ====================

// src/models/User.ts
import { DomainUserSchema, type DomainUser } from "../schemas/userSchemas";
import * as v from "valibot";
import { ValidationError } from "../errors/ApiErrors"; // Use custom error

class User implements DomainUser {
  public readonly id: string;
  public readonly fullName: string;
  public readonly emailAddress: string;
  public readonly isActive: boolean;
  public readonly registrationDate: Date;

  /**
   * Creates an instance of User.
   * Validates the input against the DomainUserSchema.
   * Freezes the object to ensure immutability.
   * @throws {ValidationError} if validation fails.
   */
  constructor(
    id: string,
    fullName: string,
    emailAddress: string,
    isActive: boolean,
    registrationDate: Date,
  ) {
    const userData = { id, fullName, emailAddress, isActive, registrationDate };
    try {
      // Validate the input data matches the domain schema definition
      const validated = v.parse(DomainUserSchema, userData);

      this.id = validated.id;
      this.fullName = validated.fullName;
      this.emailAddress = validated.emailAddress;
      this.isActive = validated.isActive;
      this.registrationDate = validated.registrationDate;

      // Ensure immutability after creation
      Object.freeze(this);
    } catch (error) {
      if (error instanceof v.ValiError) {
        // Convert Valibot error to our domain/app's ValidationError
        // This prevents leaking Valibot specifics beyond the model/mapper
        throw new ValidationError(
          "Failed to create User instance due to validation errors.",
          error.issues.map((issue) => ({
            path: issue.path?.map((p) => p.key).join("."), // Flatten path for easier use
            message: issue.message,
          })),
        );
      }
      // Re-throw unexpected errors
      throw error;
    }
  }

  getFirstName(): string {
    return this.fullName.split(" ")[0] || ""; // Handle empty name case
  }

  getLastName(): string | null {
    const parts = this.fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : null;
  }

  /**
   * Creates a *new* immutable User instance with updated properties.
   * Does not modify the original instance.
   * @param changes - An object containing the properties to update.
   * @returns A new User instance with the applied changes.
   * @throws {ValidationError} if the resulting user data is invalid.
   */
  withChanges(changes: Partial<Omit<DomainUser, "id">>): User {
    // Create a new instance with merged data, letting the constructor validate
    return new User(
      this.id, // ID remains the same
      changes.fullName ?? this.fullName,
      changes.emailAddress ?? this.emailAddress,
      changes.isActive ?? this.isActive,
      changes.registrationDate ?? this.registrationDate,
    );
  }

  /**
   * Factory method to create a new User domain object, typically before persistence.
   * Sets a default registration date and potentially a temporary ID strategy if needed.
   * @param fullName - The user's full name.
   * @param emailAddress - The user's email.
   * @param isActive - The active status (defaults to true).
   * @returns A new User instance.
   * @throws {ValidationError} if the initial data is invalid.
   */
  static createNew(
    fullName: string,
    emailAddress: string,
    isActive: boolean = true,
  ): User {
    // ID is empty initially, will be assigned upon successful persistence by the API/DB
    const initialId = "";
    const registrationDate = new Date(); // Set registration time on creation
    return new User(
      initialId,
      fullName,
      emailAddress,
      isActive,
      registrationDate,
    );
  }
}

export default User;

// ==================== ERROR HANDLING ====================

// src/errors/ApiErrors.ts

/**
 * Base application error class for easier identification.
 */
export class AppError extends Error {
  public readonly context?: Record<string, any>; // Optional context for logging

  constructor(message: string, context?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name; // Ensure name property is set correctly
    this.context = context;
    // Maintains proper stack trace in V8 environments (Node, Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Represents errors originating from API responses (e.g., 4xx, 5xx).
 */
export class ApiError extends AppError {
  constructor(
    message: string,
    public readonly statusCode?: number, // HTTP status code
    public readonly code?: string, // Optional API-specific error code
    context?: Record<string, any>,
  ) {
    super(message, context);
  }
}

/**
 * Represents data validation errors, typically from schema validation.
 */
export class ValidationError extends AppError {
  // Refined 'issues' structure for clarity
  public readonly issues: Array<{ path?: string; message: string }>;

  constructor(
    message: string,
    issues: Array<{ path?: any; message: string }>, // Keep input flexible
    context?: Record<string, any>,
  ) {
    super(message, context);
    // Standardize the path representation
    this.issues = issues.map((issue) => ({
      path: Array.isArray(issue.path)
        ? issue.path.map((p) => p?.key ?? String(p)).join(".") // Handle potential non-key paths
        : String(issue.path), // Fallback if path isn't the expected Valibot structure
      message: issue.message,
    }));
  }
}

/**
 * Represents network-level errors (e.g., connection refused, DNS lookup failed).
 */
export class NetworkError extends AppError {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message, { originalError: originalError?.message });
    // Link the original error if available for debugging
  }
}

// ==================== USER MAPPER ====================

// src/mappers/UserMapper.ts
import * as v from "valibot";
import {
  RawUserSchema,
  UserPersistenceSchema,
  type RawUser,
  type UserPersistencePayload,
} from "../schemas/userSchemas";
import User from "../models/User";
import { ValidationError } from "../errors/ApiErrors";

/**
 * Handles mapping between different representations of User data
 * (Raw API data <-> Domain Object <-> Persistence Payload).
 * Includes validation during mapping.
 */
export class UserMapper {
  /**
   * Maps raw data (e.g., from API response) to a User domain object.
   * Validates the raw data against RawUserSchema.
   * @param rawData - The unknown raw data to map.
   * @returns A valid User domain object.
   * @throws {ValidationError} if rawData fails validation.
   * @throws {Error} for other unexpected errors during mapping.
   */
  static mapToDomain(rawData: unknown): User {
    try {
      // 1. Validate and parse the raw input data (this also transforms date string)
      const parsedData = v.parse(RawUserSchema, rawData);

      // 2. Create the domain object using validated & transformed data
      // The User constructor performs its own domain validation
      return new User(
        parsedData.userId,
        parsedData.name,
        parsedData.email,
        parsedData.activeStatus,
        parsedData.registered_at, // Already a Date object due to transform pipe
      );
    } catch (error) {
      if (error instanceof v.ValiError) {
        // Convert Valibot error to our app's ValidationError
        throw new ValidationError(
          "Invalid user data received from source.",
          error.issues.map((issue) => ({
            path: issue.path, // Keep original path structure from Valibot
            message: issue.message,
          })),
          { rawData }, // Add context
        );
      }
      // Re-throw User constructor validation errors or other unexpected errors
      console.error("Error mapping raw data to domain:", error);
      throw error;
    }
  }

  /**
   * Maps a User domain object to the persistence payload format (e.g., for API request).
   * Validates the resulting payload against UserPersistenceSchema.
   * @param user - The User domain object.
   * @returns A valid payload object for persistence.
   * @throws {ValidationError} if the generated payload is invalid.
   * @throws {Error} for other unexpected errors.
   */
  static mapToPersistence(user: User): UserPersistencePayload {
    try {
      // 1. Construct the intermediate payload object from the domain model
      const payload: UserPersistencePayload = {
        // userId is included automatically if present in the object being parsed
        ...(user.id && { userId: user.id }), // Conditionally add userId only if it exists
        name: user.fullName,
        email: user.emailAddress,
        activeStatus: user.isActive,
        registered_at: user.registrationDate.toISOString(), // Format date back to ISO string
      };

      // 2. Validate the constructed payload against the persistence schema
      // This ensures we send correctly structured and typed data to the API
      return v.parse(UserPersistenceSchema, payload);
    } catch (error) {
      if (error instanceof v.ValiError) {
        throw new ValidationError(
          "User data failed validation for persistence.",
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
          { userId: user.id }, // Add context
        );
      }
      console.error(
        "Error mapping domain object to persistence payload:",
        error,
      );
      throw error; // Re-throw other errors
    }
  }
}

// ==================== API CLIENT ====================

// src/api/userApi.ts
import axios, { AxiosError } from "axios";
import { UserMapper } from "../mappers/UserMapper";
import User from "../models/User";
import { ApiError, NetworkError, ValidationError } from "../errors/ApiErrors";
import { API, AUTH_TOKEN_KEY } from "../constants"; // Use constants

const USERS_FULL_ENDPOINT = `${API.BASE_URL}${API.USERS_ENDPOINT}`;

// Create a reusable and configurable Axios instance
const apiClient = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT_MS, // Configurable timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Inject Authorization Token
apiClient.interceptors.request.use(
  (config) => {
    // Use a more secure token storage mechanism in production if possible (e.g., HttpOnly cookies)
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request configuration errors
    console.error("Axios request configuration error:", error);
    return Promise.reject(
      new AppError("Failed to configure API request.", {
        originalError: error,
      }),
    );
  },
);

// Response Interceptor: Centralized Error Handling
apiClient.interceptors.response.use(
  // On Success: Pass response through
  (response) => response,
  // On Error: Transform Axios error into custom App errors
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      // Attempt to extract a meaningful message and code from the response body
      const data = error.response.data as any; // Use 'any' carefully
      const message =
        data?.message ||
        data?.error?.message ||
        error.message ||
        `Request failed with status ${status}`;
      const code = data?.code || data?.error?.code; // API-specific error code

      console.error(`API Error: Status ${status}, Message: ${message}`, {
        url: error.config?.url,
        response: data,
        code: code,
      });

      // Optionally map specific status codes to specific error types if needed
      // if (status === 401) { return Promise.reject(new AuthenticationError(message)) }
      // if (status === 403) { return Promise.reject(new AuthorizationError(message)) }

      return Promise.reject(
        new ApiError(message, status, code, { url: error.config?.url }),
      );
    } else if (error.request) {
      // The request was made but no response was received
      // (e.g., network error, timeout, CORS issue if browser blocks response)
      console.error("Network Error: No response received from server.", {
        url: error.config?.url,
        error: error.message,
      });
      return Promise.reject(
        new NetworkError(
          "Could not connect to the server. Please check your network connection.",
          error,
        ),
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Axios setup Error:", error.message, error);
      return Promise.reject(
        new AppError(`Failed to send request: ${error.message}`, {
          originalError: error,
        }),
      );
    }
  },
);

// Type guard for our custom errors
function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Abstraction layer for user-related API operations.
 * Handles interaction with the Axios client and data mapping.
 */
export const UserApi = {
  /**
   * Fetch a user by their ID.
   * @param userId - The ID of the user to fetch.
   * @returns A Promise resolving to the User domain object.
   * @throws {ApiError} for API-related errors (404, 500, etc.).
   * @throws {NetworkError} for network issues.
   * @throws {ValidationError} if the received data is invalid.
   * @throws {AppError} for other configuration or unexpected errors.
   */
  async fetchUserById(userId: string): Promise<User> {
    if (!userId) {
      // Prevent API call with invalid input
      throw new ValidationError("User ID is required.", [
        { path: "userId", message: "User ID cannot be empty." },
      ]);
    }

    try {
      const response = await apiClient.get(`${API.USERS_ENDPOINT}/${userId}`);
      // Map and validate the response data to the domain model
      return UserMapper.mapToDomain(response.data);
    } catch (error) {
      // Log the specific error context before re-throwing
      console.error(`[UserApi.fetchUserById] Failed for ID ${userId}:`, error);
      // Re-throw the error (already transformed by interceptor or mapper)
      throw error;
    }
  },

  /**
   * Save a user (creates if no ID, updates if ID exists).
   * @param user - The User domain object to save.
   * @returns A Promise resolving to the saved (possibly updated) User domain object.
   * @throws {ApiError} for API-related errors.
   * @throws {NetworkError} for network issues.
   * @throws {ValidationError} if the user data fails validation before sending or response is invalid.
   * @throws {AppError} for other configuration or unexpected errors.
   */
  async saveUser(user: User): Promise<User> {
    try {
      // Map domain object to the format expected by the API, includes validation
      const payload = UserMapper.mapToPersistence(user);
      let response;

      if (user.id) {
        // Update existing user (PUT request)
        console.log(`[UserApi.saveUser] Updating user ${user.id}`);
        response = await apiClient.put(
          `${API.USERS_ENDPOINT}/${user.id}`,
          payload,
        );
      } else {
        // Create new user (POST request)
        console.log(`[UserApi.saveUser] Creating new user`);
        // Remove the empty userId field if backend expects it absent for creation
        const createPayload = { ...payload };
        delete createPayload.userId;
        response = await apiClient.post(API.USERS_ENDPOINT, createPayload);
      }

      // Map the response data (presumably the created/updated user) back to domain object
      return UserMapper.mapToDomain(response.data);
    } catch (error) {
      const context = user.id
        ? `updating user ${user.id}`
        : "creating new user";
      console.error(`[UserApi.saveUser] Failed ${context}:`, error);
      throw error; // Re-throw transformed error
    }
  },

  /**
   * Delete a user by their ID.
   * @param userId - The ID of the user to delete.
   * @returns A Promise resolving to true if deletion was successful (API returned 2xx).
   * @throws {ApiError} for API-related errors (e.g., 404 if not found, 500).
   * @throws {NetworkError} for network issues.
   * @throws {AppError} for other configuration or unexpected errors.
   */
  async deleteUser(userId: string): Promise<boolean> {
    if (!userId) {
      throw new ValidationError("User ID is required for deletion.", [
        { path: "userId", message: "User ID cannot be empty." },
      ]);
    }
    try {
      console.log(`[UserApi.deleteUser] Deleting user ${userId}`);
      await apiClient.delete(`${API.USERS_ENDPOINT}/${userId}`);
      // Typically, a successful DELETE returns 204 No Content or 200 OK.
      // We resolve true indicating the operation was accepted by the API.
      return true;
    } catch (error) {
      console.error(`[UserApi.deleteUser] Failed for ID ${userId}:`, error);
      throw error; // Re-throw transformed error
    }
  },

  /**
   * Fetches a list of users, potentially with filtering/pagination.
   * @param params - Optional query parameters for filtering, sorting, pagination.
   * @returns A Promise resolving to an array of User domain objects.
   * @throws {ApiError | NetworkError | ValidationError | AppError}
   */
  async fetchUsers(params?: Record<string, any>): Promise<User[]> {
    try {
      console.log(`[UserApi.fetchUsers] Fetching users with params:`, params);
      const response = await apiClient.get(API.USERS_ENDPOINT, { params });
      // Expecting an array of raw user objects
      if (!Array.isArray(response.data)) {
        throw new ValidationError(
          "API response for user list was not an array.",
          [],
          { responseData: response.data },
        );
      }
      // Map each raw user object to a domain User object
      // Consider Promise.allSettled for partial success if one item fails mapping
      return response.data.map(UserMapper.mapToDomain);
    } catch (error) {
      console.error(`[UserApi.fetchUsers] Failed:`, error);
      throw error;
    }
  },
};

// ==================== REACT QUERY HOOKS ====================

// src/hooks/useUserData.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryOptions, // Import for better typing
  UseMutationOptions, // Import for better typing
} from "@tanstack/react-query";
import { UserApi } from "../api/userApi";
import User from "../models/User";
import {
  ApiError,
  NetworkError,
  ValidationError,
  AppError,
} from "../errors/ApiErrors"; // Import base AppError too
import { CACHE_KEYS, STALE_TIMES } from "../constants"; // Use constants

// --- Query Keys Factory ---
// Provides a consistent structure for query keys, crucial for cache management.
export const userQueryKeys = {
  // Base key for all user-related queries
  all: [CACHE_KEYS.USERS] as const,
  // Keys for lists of users
  lists: () => [...userQueryKeys.all, CACHE_KEYS.LIST] as const,
  // Key for a specific list based on filters (use stable serialization for filters)
  list: (filters: Record<string, any> = {}) =>
    [...userQueryKeys.lists(), filters] as const,
  // Keys for individual user details
  details: () => [...userQueryKeys.all, CACHE_KEYS.DETAIL] as const,
  // Key for a specific user's detail
  detail: (id: string | null | undefined) =>
    [...userQueryKeys.details(), id ?? "null"] as const, // Use 'null' for consistency when id is null/undefined
};

// --- Hook Definitions ---

/**
 * Custom hook to fetch a single user by ID using React Query.
 * Handles loading, error states, caching, and retries.
 */
export const useUser = (
  userId: string | null | undefined,
  // Allow overriding query options for flexibility
  options?: Omit<
    UseQueryOptions<User, AppError, User, QueryKey>,
    "queryKey" | "queryFn" | "enabled"
  >,
) => {
  const queryKey = userQueryKeys.detail(userId);

  return useQuery<User, AppError, User, QueryKey>(
    queryKey,
    // Query function: Fetches data using the API client
    async () => {
      if (!userId) {
        // Should not happen if 'enabled' is false, but defensive check
        throw new Error("User ID is missing, cannot fetch user.");
      }
      return UserApi.fetchUserById(userId);
    },
    {
      // --- Query Configuration ---
      enabled: !!userId, // Only run the query if userId is truthy
      staleTime: STALE_TIMES.USER_DETAIL, // How long data is considered fresh (10 min)
      cacheTime: STALE_TIMES.USER_DETAIL * 6, // How long inactive data stays in cache (1 hour)
      retry: (failureCount, error) => {
        // Custom retry logic:
        // - Don't retry on validation errors (data issue)
        // - Don't retry on 404 Not Found (resource doesn't exist)
        // - Don't retry on 401/403 (auth issues)
        // - Retry other errors (network, 5xx) up to 2 times (total 3 attempts)
        if (
          error instanceof ValidationError ||
          (error instanceof ApiError &&
            [404, 401, 403].includes(error.statusCode || 0))
        ) {
          return false;
        }
        return failureCount < 2; // Retry twice
      },
      // Log errors centrally, components can still access the error object
      onError: (error) => {
        console.error(`[useUser query error] ID: ${userId}`, error);
        // Consider adding toast notifications or global error reporting here
      },
      // Spread any additional options passed in
      ...options,
    },
  );
};

/**
 * Custom hook to fetch a list of users.
 */
export const useUsers = (
  filters: Record<string, any> = {},
  options?: Omit<
    UseQueryOptions<User[], AppError, User[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  const queryKey = userQueryKeys.list(filters); // Use filters in query key

  return useQuery<User[], AppError, User[], QueryKey>(
    queryKey,
    () => UserApi.fetchUsers(filters),
    {
      staleTime: STALE_TIMES.DEFAULT, // Use default stale time for lists
      cacheTime: STALE_TIMES.DEFAULT * 6,
      retry: 1, // Retry list fetches once on transient errors
      onError: (error) => {
        console.error(
          `[useUsers query error] Filters: ${JSON.stringify(filters)}`,
          error,
        );
      },
      ...options,
    },
  );
};

/**
 * Custom hook for saving (creating or updating) a user.
 * Provides mutation function, loading state, and error handling.
 * Handles cache updates on success.
 */
export const useSaveUser = (
  // Allow overriding mutation options
  options?: UseMutationOptions<User, AppError, User>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, AppError, User>(
    // Mutation function: Calls the API save method
    (userToSave: User) => UserApi.saveUser(userToSave),
    {
      // --- Mutation Configuration ---
      onSuccess: (savedUser, variables) => {
        console.log(
          `User ${variables.id ? "updated" : "created"} successfully:`,
          savedUser,
        );

        // --- Cache Updates ---
        // 1. Update the specific user's detail cache with the fresh data
        queryClient.setQueryData(userQueryKeys.detail(savedUser.id), savedUser);

        // 2. Invalidate user lists to trigger refetching
        // Be more specific if possible (e.g., invalidate lists matching certain filters)
        queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });

        // Optional: Call user-defined onSuccess from options
        options?.onSuccess?.(savedUser, variables, undefined);
      },
      onError: (error, variables, context) => {
        const action = variables.id ? "update" : "create";
        console.error(
          `[useSaveUser mutation error] Failed to ${action} user ${variables.id || "(new)"}:`,
          error,
        );
        // Optional: Call user-defined onError from options
        options?.onError?.(error, variables, context);
        // Global error handling/toast can be triggered here or in the component
      },
      // Spread any additional options passed in
      ...options,
    },
  );
  // Consider adding optimistic updates here for better UX, but manage complexity.
};

/**
 * Custom hook for deleting a user.
 * Handles cache invalidation/removal on success.
 */
export const useDeleteUser = (
  // Allow overriding mutation options
  options?: UseMutationOptions<boolean, AppError, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<boolean, AppError, string>( // Mutates with userId, resolves to boolean
    // Mutation function: Calls the API delete method
    (userId: string) => UserApi.deleteUser(userId),
    {
      // --- Mutation Configuration ---
      onSuccess: (success, userId, context) => {
        if (success) {
          console.log(`User ${userId} deleted successfully.`);

          // --- Cache Updates ---
          // 1. Remove the deleted user's detail query from the cache
          queryClient.removeQueries({ queryKey: userQueryKeys.detail(userId) });

          // 2. Invalidate user lists
          queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });

          // Optional: Call user-defined onSuccess from options
          options?.onSuccess?.(success, userId, context);
        } else {
          // Should not happen if API call succeeded, but defensive check
          console.warn(
            `[useDeleteUser] API indicated success=false for user ${userId}`,
          );
          options?.onError?.(
            new AppError("Deletion reported unsuccessful by API."),
            userId,
            context,
          );
        }
      },
      onError: (error, userId, context) => {
        console.error(
          `[useDeleteUser mutation error] Failed to delete user ${userId}:`,
          error,
        );
        // Optional: Call user-defined onError from options
        options?.onError?.(error, userId, context);
      },
      // Spread any additional options passed in
      ...options,
    },
  );
};

// ==================== USER COMPONENTS ====================

// --- Reusable Loading/Error Components ---
// src/components/common/LoadingSpinner.tsx
import React from "react";
// Basic spinner - replace with a proper SVG or CSS animation library component
export const LoadingSpinner: React.FC<{
  size?: "small" | "medium" | "large";
}> = ({ size = "medium" }) => (
  <div className={`spinner spinner-${size}`} role="status" aria-live="polite">
    <span className="sr-only">Loading...</span> {/* Screen reader text */}
  </div>
);

// src/components/common/ErrorMessage.tsx
import React from "react";
export const ErrorMessage: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
}> = ({ title, message, onRetry }) => (
  <div className="error-container" role="alert">
    {title && <h4>{title}</h4>}
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary">
        Retry
      </button>
    )}
  </div>
);

// --- User Profile Component ---
// src/components/UserProfile.tsx
import React from "react";
import { useUser } from "../hooks/useUserData";
import { ApiError, NetworkError, AppError } from "../errors/ApiErrors";
import { LoadingSpinner } from "./common/LoadingSpinner"; // Use common component
import { ErrorMessage } from "./common/ErrorMessage"; // Use common component

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    isFetching, // Useful for background refetch indicators
    refetch, // Function to manually trigger refetch
  } = useUser(userId);

  // --- Loading State ---
  // Differentiate initial load vs background refetch
  if (isLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
        <p>Loading user profile...</p>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    let errorTitle = "Error Loading Profile";
    let errorMessage = "An unexpected error occurred.";
    let showRetry = true;

    if (error instanceof ApiError && error.statusCode === 404) {
      errorTitle = "User Not Found";
      errorMessage = `The user with ID "${userId}" could not be found.`;
      showRetry = false; // No point retrying a 404
    } else if (error instanceof NetworkError) {
      errorTitle = "Network Error";
      errorMessage =
        "Could not connect to the server. Please check your connection.";
    } else if (error instanceof AppError) {
      // Handle other custom app errors or generic ones
      errorMessage = error.message || "An unknown application error occurred.";
    }
    // Use the common ErrorMessage component
    return (
      <ErrorMessage
        title={errorTitle}
        message={errorMessage}
        onRetry={showRetry ? () => refetch() : undefined}
      />
    );
  }

  // --- Success State ---
  if (!user) {
    // Should ideally not happen if isLoading/isError are false, but safeguard
    return (
      <ErrorMessage
        title="Data Unavailable"
        message="User data could not be loaded."
      />
    );
  }

  // Render user profile details
  return (
    <article className="user-profile" aria-labelledby="user-profile-heading">
      <h2 id="user-profile-heading">
        User Profile {isFetching && <LoadingSpinner size="small" />}
      </h2>
      {/* Use definition list for semantic key-value pairs */}
      <dl>
        <div className="profile-field">
          <dt>ID:</dt>
          <dd>{user.id}</dd>
        </div>
        <div className="profile-field">
          <dt>Full Name:</dt>
          <dd>{user.fullName}</dd>
        </div>
        <div className="profile-field">
          <dt>First Name:</dt>
          <dd>{user.getFirstName()}</dd>
        </div>
        {user.getLastName() && ( // Only show if last name exists
          <div className="profile-field">
            <dt>Last Name:</dt>
            <dd>{user.getLastName()}</dd>
          </div>
        )}
        <div className="profile-field">
          <dt>Email:</dt>
          <dd>
            <a href={`mailto:${user.emailAddress}`}>{user.emailAddress}</a>
          </dd>
        </div>
        <div className="profile-field">
          <dt>Status:</dt>
          <dd>
            <span
              className={`status-badge ${user.isActive ? "status-active" : "status-inactive"}`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </dd>
        </div>
        <div className="profile-field">
          <dt>Registered:</dt>
          {/* Consider using a date formatting library like date-fns or Intl.DateTimeFormat */}
          <dd>
            <time dateTime={user.registrationDate.toISOString()}>
              {user.registrationDate.toLocaleDateString(undefined, {
                // Use user's locale
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </dd>
        </div>
      </dl>
    </article>
  );
};

export default UserProfile;

// --- User Form Component ---
// src/components/UserForm.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSaveUser } from "../hooks/useUserData";
import User from "../models/User";
import { ValidationError, AppError } from "../errors/ApiErrors"; // Import AppError
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";

// Define more specific types for form data and errors
type UserFormData = Omit<DomainUser, "id" | "registrationDate">;
type FormErrors = Partial<Record<keyof UserFormData | "form", string>>; // Include 'form' for general errors

interface UserFormProps {
  initialUser: User | null; // User object for editing, null for creating
  onSaveSuccess: (savedUser: User) => void; // Callback on successful save
  onCancel?: () => void; // Callback for cancellation
}

const UserForm: React.FC<UserFormProps> = ({
  initialUser,
  onSaveSuccess,
  onCancel,
}) => {
  // --- State ---
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    emailAddress: "",
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // --- Mutation Hook ---
  const {
    mutate: saveUserMutate,
    isLoading: isSaving,
    error: saveError, // Error from the mutation hook itself
    reset: resetMutation, // Function to reset mutation state
  } = useSaveUser();

  // --- Effects ---
  // Populate form when initialUser changes (for editing or clearing for new)
  useEffect(() => {
    if (initialUser) {
      setFormData({
        fullName: initialUser.fullName,
        emailAddress: initialUser.emailAddress,
        isActive: initialUser.isActive,
      });
    } else {
      // Reset form for creating a new user
      setFormData({ fullName: "", emailAddress: "", isActive: true });
    }
    // Clear errors and mutation state when the user context changes
    setFormErrors({});
    resetMutation();
  }, [initialUser, resetMutation]);

  // --- Event Handlers ---
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldName = name as keyof UserFormData;

      setFormData((prev) => ({
        ...prev,
        [fieldName]: type === "checkbox" ? checked : value,
      }));

      // Clear validation error for this specific field when user types
      if (formErrors[fieldName]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          // Also clear general 'form' error if it exists and we start typing
          delete newErrors.form;
          return newErrors;
        });
      }
    },
    [formErrors],
  ); // Dependency on formErrors to ensure closure has latest state

  // --- Client-Side Validation (Basic) ---
  // More robust validation is handled by the domain model/mapper via Valibot,
  // but basic checks improve UX by providing immediate feedback.
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      // Simple regex check
      errors.emailAddress = "Please enter a valid email format.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Form Submission ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous submission errors

    // Perform basic client-side validation first
    if (!validateForm()) {
      return;
    }

    try {
      // Create or update the User domain object
      // The constructor/withChanges will perform domain-level validation
      const userToSave = initialUser
        ? initialUser.withChanges(formData)
        : User.createNew(
            formData.fullName,
            formData.emailAddress,
            formData.isActive,
          );

      // Call the mutation hook
      saveUserMutate(userToSave, {
        onSuccess: (savedUser) => {
          // Call the success callback provided by the parent
          onSaveSuccess(savedUser);
          // Optionally reset form here if needed after success (e.g., for 'create')
          // if (!initialUser) { setFormData({ fullName: '', emailAddress: '', isActive: true }); }
        },
        onError: (error) => {
          // Handle errors specifically from the save mutation
          if (error instanceof ValidationError) {
            // Map Valibot validation issues (from mapper/API response) to form fields
            const validationErrors: FormErrors = {};
            error.issues.forEach((issue) => {
              // Map API field names (likely from UserPersistenceSchema) to form field names
              const fieldMap: Record<string, keyof UserFormData> = {
                name: "fullName",
                email: "emailAddress",
                activeStatus: "isActive",
                // Add other mappings if needed
              };
              const formField = fieldMap[issue.path || "form"] || "form"; // Default to general 'form' error
              if (!validationErrors[formField]) {
                // Take the first error per field
                validationErrors[formField] = issue.message;
              }
            });
            if (Object.keys(validationErrors).length > 0) {
              setFormErrors(validationErrors);
            } else {
              // If no specific field errors mapped, show a general message
              setFormErrors({ form: error.message || "Validation failed." });
            }
          } else if (error instanceof AppError) {
            // Handle other API errors, Network errors, etc.
            setFormErrors({
              form: error.message || "An error occurred while saving.",
            });
          } else {
            // Handle unexpected errors
            setFormErrors({ form: "An unexpected error occurred." });
          }
        },
      });
    } catch (domainError) {
      // Catch validation errors from User constructor or withChanges
      if (domainError instanceof ValidationError) {
        const domainValidationErrors: FormErrors = {};
        domainError.issues.forEach((issue) => {
          const fieldKey = issue.path as keyof UserFormData | undefined;
          if (fieldKey && !domainValidationErrors[fieldKey]) {
            domainValidationErrors[fieldKey] = issue.message;
          }
        });
        setFormErrors(domainValidationErrors);
      } else {
        console.error(
          "Unexpected error creating/updating user object:",
          domainError,
        );
        setFormErrors({ form: "An unexpected client-side error occurred." });
      }
    }
  };

  // Determine general form error message to display
  const generalError =
    formErrors.form ||
    (saveError && !(saveError instanceof ValidationError)
      ? saveError.message
      : null);

  return (
    <form onSubmit={handleSubmit} className="user-form" noValidate>
      {" "}
      {/* Disable browser validation */}
      <h2>
        {initialUser ? `Edit User: ${initialUser.fullName}` : "Create New User"}
      </h2>
      {/* Display general form errors */}
      {generalError && (
        <ErrorMessage message={generalError} title="Save Failed" />
      )}
      {/* Full Name Field */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={isSaving}
          required // Helps accessibility and basic browser hints, but validation is custom
          aria-invalid={!!formErrors.fullName} // Indicate error state for screen readers
          aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
          className={formErrors.fullName ? "input-error" : ""}
        />
        {formErrors.fullName && (
          <div id="fullName-error" className="field-error" role="alert">
            {formErrors.fullName}
          </div>
        )}
      </div>
      {/* Email Address Field */}
      <div className="form-group">
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          disabled={isSaving}
          required
          aria-invalid={!!formErrors.emailAddress}
          aria-describedby={
            formErrors.emailAddress ? "emailAddress-error" : undefined
          }
          className={formErrors.emailAddress ? "input-error" : ""}
        />
        {formErrors.emailAddress && (
          <div id="emailAddress-error" className="field-error" role="alert">
            {formErrors.emailAddress}
          </div>
        )}
      </div>
      {/* Active Status Field */}
      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          disabled={isSaving}
          aria-invalid={!!formErrors.isActive}
          aria-describedby={formErrors.isActive ? "isActive-error" : undefined}
        />
        <label htmlFor="isActive"> Active User</label>
        {formErrors.isActive && (
          <div id="isActive-error" className="field-error" role="alert">
            {formErrors.isActive}
          </div>
        )}
      </div>
      {/* Form Actions */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary" // Use consistent button classes
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoadingSpinner size="small" /> Saving...
            </>
          ) : initialUser ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </button>

        {/* Show Cancel button only if handler is provided */}
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;

// --- User Form Wrapper ---
// src/components/UserFormWrapper.tsx
import React from "react";
import { useUser } from "../hooks/useUserData";
import UserForm from "./UserForm";
import User from "../models/User";
import { ApiError, AppError } from "../errors/ApiErrors";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";

interface UserFormWrapperProps {
  userId: string | null; // Null means we are creating a new user
  onSaveSuccess: (savedUser: User) => void;
  onCancel?: () => void; // Optional cancel handler
}

/**
 * Wrapper component that fetches user data if editing,
 * handles loading/error states for the fetch, and then renders UserForm.
 */
const UserFormWrapper: React.FC<UserFormWrapperProps> = ({
  userId,
  onSaveSuccess,
  onCancel,
}) => {
  // Fetch user data only if userId is provided (i.e., we are editing)
  const {
    data: userToEdit,
    isLoading: isLoadingUser,
    isError: isLoadError,
    error: loadError,
    refetch, // Allow retrying the fetch
  } = useUser(userId, {
    enabled: !!userId, // Only fetch if userId exists
    // Don't refetch stale data automatically when the form mounts if editing
    // Let the user explicitly refresh if needed elsewhere
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // --- Loading State (for fetching user to edit) ---
  if (userId && isLoadingUser) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
        <p>Loading user data for editing...</p>
      </div>
    );
  }

  // --- Error State (for fetching user to edit) ---
  if (userId && isLoadError) {
    let errorTitle = "Error Loading User Data";
    let errorMessage = "Could not load user details for editing.";
    let showRetry = true;

    if (loadError instanceof ApiError && loadError.statusCode === 404) {
      errorTitle = "User Not Found";
      errorMessage = `Cannot edit user: ID "${userId}" not found.`;
      showRetry = false;
    } else if (loadError instanceof AppError) {
      errorMessage = loadError.message;
    }

    return (
      <div className="error-wrapper">
        <ErrorMessage
          title={errorTitle}
          message={errorMessage}
          onRetry={showRetry ? () => refetch() : undefined}
        />
        {/* Provide a way back if loading fails */}
        {onCancel && (
          <button onClick={onCancel} className="btn btn-secondary mt-2">
            Go Back
          </button>
        )}
      </div>
    );
  }

  // --- Render Form ---
  // If userId is null (creating) or if fetching user data was successful (editing)
  return (
    <UserForm
      // Pass the fetched user if editing, otherwise pass null for create mode
      initialUser={userId ? userToEdit || null : null}
      onSaveSuccess={onSaveSuccess}
      onCancel={onCancel}
    />
  );
};

export default UserFormWrapper;

// ==================== APP COMPONENT ====================

// src/App.tsx
import React, { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProfile from "./components/UserProfile";
import UserFormWrapper from "./components/UserFormWrapper";
import User from "./models/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import potentially shared styles
import "./App.css"; // Assuming you have some base CSS
import { STALE_TIMES } from "./constants"; // Use constants

// --- React Query Client Setup ---
// Create a single QueryClient instance for the entire application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Sensible defaults for production
      staleTime: STALE_TIMES.DEFAULT, // Data fresh for 5 mins by default
      cacheTime: STALE_TIMES.DEFAULT * 6, // Keep inactive data for 30 mins
      retry: (failureCount, error) => {
        // Default retry: Don't retry 4xx client errors, retry others once
        if (
          error instanceof ApiError &&
          (error.statusCode || 0) >= 400 &&
          (error.statusCode || 0) < 500
        ) {
          return false;
        }
        return failureCount < 1; // Retry once for server/network errors
      },
      refetchOnWindowFocus: true, // Refetch on window focus - adjust based on app needs
      refetchOnMount: true, // Refetch potentially stale data when a component mounts
      refetchOnReconnect: true, // Refetch on network reconnect
    },
    mutations: {
      // Default mutation options (can be overridden in hooks)
      onError: (error) => {
        // Generic fallback error notification for mutations
        if (error instanceof AppError) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    },
  },
});

// --- Main Application Component ---
const App: React.FC = () => {
  // --- State Management ---
  // Simple state for managing the current view (viewing profile vs. editing/creating)
  // For larger apps, consider routing (React Router) or a state management library.
  const [currentView, setCurrentView] = useState<"list" | "profile" | "form">(
    "list",
  ); // Start with a list/empty view
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // --- Event Handlers (Callbacks) ---
  const handleViewProfile = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setCurrentView("profile");
  }, []);

  const handleEditUser = useCallback((userId: string) => {
    setSelectedUserId(userId);
    setCurrentView("form");
  }, []);

  const handleCreateNewUser = useCallback(() => {
    setSelectedUserId(null); // No selected ID means 'create' mode for the form
    setCurrentView("form");
  }, []);

  const handleSaveSuccess = useCallback(
    (savedUser: User) => {
      toast.success(
        `User "${savedUser.fullName}" ${selectedUserId ? "updated" : "created"} successfully!`,
      );
      // After save, view the profile of the saved user
      setSelectedUserId(savedUser.id);
      setCurrentView("profile");
    },
    [selectedUserId],
  ); // Dependency needed to correctly formulate the toast message

  const handleCancelForm = useCallback(() => {
    // If we were editing, go back to the profile view of that user.
    // If we were creating (selectedUserId was null), go back to the list/initial view.
    setCurrentView(selectedUserId ? "profile" : "list");
    // Keep selectedUserId as is if going back to profile, clear if going back to list?
    // For simplicity, let's just go back to the 'list' view on cancel.
    // setCurrentView('list');
    // setSelectedUserId(null);
    // OR: More complex logic based on previous state needed for better UX
    if (selectedUserId) {
      setCurrentView("profile"); // Go back to viewing the profile we were editing
    } else {
      setCurrentView("list"); // Go back to the initial/list state
    }
  }, [selectedUserId]);

  // --- Render Logic ---
  const renderCurrentView = () => {
    switch (currentView) {
      case "form":
        return (
          <section className="form-section" aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">
              {selectedUserId ? "Edit User Form" : "Create User Form"}
            </h2>
            <UserFormWrapper
              userId={selectedUserId}
              onSaveSuccess={handleSaveSuccess}
              onCancel={handleCancelForm}
            />
          </section>
        );
      case "profile":
        // Ensure selectedUserId is not null before rendering profile
        if (!selectedUserId) {
          // Fallback if state is inconsistent
          setCurrentView("list");
          return <p>Error: No user selected for profile view.</p>;
        }
        return (
          <section
            className="profile-section"
            aria-labelledby="profile-heading"
          >
            <h2 id="profile-heading" className="sr-only">
              User Profile View
            </h2>
            <UserProfile userId={selectedUserId} />
            <div className="profile-actions button-group">
              <button
                onClick={() => handleEditUser(selectedUserId)}
                className="btn btn-secondary"
              >
                Edit User
              </button>
              <button
                onClick={() => {
                  setCurrentView("list");
                  setSelectedUserId(null);
                }} // Go back to list
                className="btn btn-outline"
              >
                Back to List / Close
              </button>
              {/* Add Delete Button Here later */}
            </div>
          </section>
        );
      case "list":
      default:
        // Placeholder for a User List component
        // This component would use the `useUsers` hook.
        return (
          <section className="user-list-section" aria-labelledby="list-heading">
            <h2 id="list-heading">User List (Placeholder)</h2>
            <p>This is where a list of users would appear.</p>
            <p>
              You would typically fetch users using `useUsers` here and allow
              selection.
            </p>
            {/* Example of selecting a user - replace with actual list interaction */}
            <div className="button-group">
              <button
                onClick={() => handleViewProfile("user-123")}
                className="btn btn-link"
              >
                View User 123 (Example)
              </button>
              <button
                onClick={() => handleViewProfile("user-456")}
                className="btn btn-link"
              >
                View User 456 (Example)
              </button>
            </div>
            <hr />
            <button onClick={handleCreateNewUser} className="btn btn-primary">
              Create New User
            </button>
          </section>
        );
    }
  };

  return (
    // Provide the QueryClient to the application
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header className="app-header">
          <h1>Production Ready User Management</h1>
          {/* Add navigation or global actions here if needed */}
        </header>

        <main className="app-content">{renderCurrentView()}</main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Your Company</p>
        </footer>
      </div>

      {/* Toast notifications container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Use colored theme for better error/success distinction
      />
      {/* React Query DevTools for debugging cache and queries (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;

// Remember to add CSS for:
// .app-container, .app-header, .app-content, .app-footer
// .loading-container, .spinner, .spinner-small, .spinner-medium, .spinner-large
// .error-container, .error-wrapper
// .user-profile, .profile-field dt, dd, .status-badge, .status-active, .status-inactive
// .user-form, .form-group, label, input, input[type=checkbox], .input-error, .field-error, .form-actions
// .button-group, .btn, .btn-primary, .btn-secondary, .btn-outline, .btn-link
// .sr-only (screen reader only text)
// Basic responsive design
