/** Future Spring Boot adapter boundary. Endpoints and authentication must follow the backend contract. */
export interface HttpClient { request<T>(path: string, options?: RequestInit): Promise<T> }
