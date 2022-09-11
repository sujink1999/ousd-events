import { render, screen } from "@testing-library/react";
import PageSwitcher from "../components/PageSwitcher";

test("CHECKS IF CURRENT PAGE IS HIGHLIGHTED", async () => {
    render(
        <PageSwitcher
            numberOfPages={10}
            currentPage={1}
            changePage={(_) => {}}
        />
    );
    const pageIcon = screen.getByText(/1/i);
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(pageIcon).toHaveClass("bg-primary");
});

test("RENDERS FOR TWO PAGES", async () => {
    render(
        <PageSwitcher
            numberOfPages={2}
            currentPage={1}
            changePage={(_) => {}}
        />
    );
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.queryByText(/3/i)).toBeNull();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
});
