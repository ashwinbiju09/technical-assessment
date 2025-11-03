/* eslint-env jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "../components/AuthForm";
import "@testing-library/jest-dom";

describe("AuthForm component", () => {
  test("renders login form initially", () => {
    render(<AuthForm />);
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();
  });

  test("switches to signup form when toggle clicked", async () => {
    render(<AuthForm />);
    const toggleButton = screen.getByRole("button", { name: /Sign up/i });
    await userEvent.click(toggleButton);

    expect(
      await screen.findByText(/Create a new account/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("signup validation shows errors for invalid email and short password", async () => {
    render(<AuthForm />);

    const toggleButton = screen.getByRole("button", { name: /Sign up/i });
    await userEvent.click(toggleButton);

    await userEvent.type(screen.getByLabelText(/Email/i), "ashwin@gmailcom");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "123");
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), "123");

    await userEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(
      await screen.findByText("Please enter a valid email")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  test("signup validation shows error if passwords do not match", async () => {
    render(<AuthForm />);

    await userEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    await userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "123456");
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), "654321");

    await userEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    expect(
      await screen.findByText("Passwords do not match")
    ).toBeInTheDocument();
  });

  test("login shows generic error for wrong credentials", async () => {
    render(<AuthForm />);

    await userEvent.type(screen.getByLabelText(/Email/i), "wrong@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "wrongpassword");

    await userEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    expect(
      await screen.findByText("Please check your credentials")
    ).toBeInTheDocument();
  });
});
