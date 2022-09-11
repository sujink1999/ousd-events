import { render, screen } from "@testing-library/react";
import LogCard from "../components/LogCard";
import { LogData } from "../containers/Home";
import sampleDataJSON from "./sampleData.json";

const SECONDS = 1000;
jest.setTimeout(20 * SECONDS);

const log: unknown = sampleDataJSON;

test("RENDERS UNSELECTED CARD", async () => {
    render(<LogCard logData={log as LogData} isSelected={false} />);
    expect(screen.getByText(/15501377/i)).toBeInTheDocument();
    expect(screen.getByText(/- YieldDistribution/i)).toBeInTheDocument();
    expect(screen.queryByText(/_to:/i)).toBeNull();
});

test("RENDERS SELECTED CARD", async () => {
    render(<LogCard logData={log as LogData} isSelected={true} />);
    expect(screen.getByText(/15501377/i)).toBeInTheDocument();
    expect(screen.getByText(/_to:/i)).toBeInTheDocument();
    expect(screen.getByText(/_yield:/i)).toBeInTheDocument();
    expect(screen.getByText(/_fee:/i)).toBeInTheDocument();
});
