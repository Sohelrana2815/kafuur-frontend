"use server";

// Login Server Action

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerAction = async (_currentState: any, formData: FormData) => {
  try {
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/register`,
      {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Register failed");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log("Register error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
};
