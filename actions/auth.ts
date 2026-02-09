"use server";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: ICreateUser) {
  try {
    console.log("Create User", data);
    const response = await fetch("http://localhost:1337/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
