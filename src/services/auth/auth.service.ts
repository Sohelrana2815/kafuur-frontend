"use server";

// Login Server Action

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginAction = async (_currentState: any, formData: FormData) => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log("Login error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
};
