import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

describe("Button", () => {
  it("renders without crashing", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
  });

  it("renders its `children` prop as text", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Default</Button>);
    expect(getByText("Default")).toBeInTheDocument();
  });

  it("renders a default button style", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Default</Button>);
    expect(getByText("Default")).toHaveClass("button");
  });

  it("renders a confirm button", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick} confirm>Confirm</Button>);
    expect(getByText("Confirm")).toHaveClass("button--confirm");
  });

  it("renders a danger button", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick} danger>Danger</Button>);
    expect(getByText("Danger")).toHaveClass("button--danger");
  });

  it("renders a clickable button", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Clickable</Button>
    );

    const button = getByText("Clickable");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a disabled button", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = getByText("Disabled");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
