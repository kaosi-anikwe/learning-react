import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders Hello World to the screeen", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World!");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders 'nice to see you' if button NOT clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...nothing

    // Assert
    const outputEl = screen.getByText("nice to see you", { exact: false });
    expect(outputEl).toBeInTheDocument();
  });

  test("renders 'Changed' when button clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const btnEl = screen.getByRole("button");
    userEvent.click(btnEl);

    // Assert
    const outputEl = screen.getByText("Changed!");
    expect(outputEl).toBeInTheDocument();
  });

  test("does not render 'nice to see you' after button clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const btnEl = screen.getByRole("button");
    userEvent.click(btnEl);

    // Assert
    const outputEl = screen.queryByText("nice to see you", { exact: false });
    expect(outputEl).toBeNull();
  });
});
